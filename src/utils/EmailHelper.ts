import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';
import { WaitHelper } from './WaitHelper';
import { logger } from './Logger';

const POLL_INTERVAL_MS = 3000;

function buildClient(): ImapFlow {
  return new ImapFlow({
    host: process.env.IMAP_HOST ?? 'imap.gmail.com',
    port: parseInt(process.env.IMAP_PORT ?? '993', 10),
    secure: true,
    auth: {
      user: process.env.IMAP_USER!,
      pass: process.env.IMAP_PASSWORD!,
    },
    logger: false,
  });
}

// Connects to the inbox, finds the most recent OTP email sent after `sentAfter`,
// extracts and returns the first 4–6 digit code found in the email text.
async function tryFetchOtp(sentAfter: Date): Promise<string | null> {
  const client = buildClient();
  await client.connect();

  try {
    const lock = await client.getMailboxLock('INBOX');
    try {
      const fromAddress = process.env.IMAP_OTP_FROM ?? 'noreply@ameyahealth.com';
      const uids = await client.search(
        { since: sentAfter, from: fromAddress },
        { uid: true }
      ) as number[];

      if (uids.length === 0) {
        logger.debug('EmailHelper: no OTP email found yet, will retry');
        return null;
      }

      const latestUid = Math.max(...uids);
      const msg = await client.fetchOne(
        String(latestUid),
        { source: true },
        { uid: true }
      );

      const parsed = await simpleParser(msg.source);
      const text = parsed.text ?? '';

      // Match the first standalone 4–6 digit number in the email text
      const match = text.match(/\b(\d{4,6})\b/);
      if (match) {
        logger.info(`EmailHelper: OTP found — ${match[1]}`);
        return match[1];
      }

      logger.warn('EmailHelper: email received but no OTP code found in body');
      return null;
    } finally {
      lock.release();
    }
  } finally {
    await client.logout();
  }
}

export class EmailHelper {
  /**
   * Polls the inbox until an OTP email from Ameya Health arrives,
   * then returns the numeric code. Throws if timeout is exceeded.
   */
  static async waitForOtp(timeoutMs?: number): Promise<string> {
    const timeout = timeoutMs ?? parseInt(process.env.IMAP_OTP_TIMEOUT_MS ?? '30000', 10);
    const sentAfter = new Date(Date.now() - 60_000); // look back 60 s to catch fast delivery
    const deadline = Date.now() + timeout;

    logger.info(`EmailHelper: waiting up to ${timeout / 1000}s for OTP email…`);

    while (Date.now() < deadline) {
      const otp = await tryFetchOtp(sentAfter);
      if (otp) return otp;
      await WaitHelper.sleep(POLL_INTERVAL_MS);
    }

    throw new Error(
      `OTP not received within ${timeout / 1000}s — ` +
      `check that ${process.env.IMAP_USER} is receiving email from ${process.env.IMAP_OTP_FROM}`
    );
  }
}
