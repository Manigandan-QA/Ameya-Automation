import { Config } from '../config/ConfigLoader';

export function buildBrowserStackCdpUrl(capabilities: Record<string, unknown>): string {
  const caps = {
    ...capabilities,
    'browserstack.username': Config.browserstack.username,
    'browserstack.accessKey': Config.browserstack.accessKey,
  };
  return `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`;
}

export function getBrowserStackAuthOptions(): Record<string, string> {
  return {
    userName: Config.browserstack.username,
    accessKey: Config.browserstack.accessKey,
  };
}
