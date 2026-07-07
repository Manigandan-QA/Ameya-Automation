export class WaitHelper {
  static async waitForCondition(
    condition: () => Promise<boolean>,
    timeoutMs = 10000,
    intervalMs = 500,
    message = 'Condition not met within timeout'
  ): Promise<void> {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      if (await condition()) return;
      await this.sleep(intervalMs);
    }
    throw new Error(`Timeout (${timeoutMs}ms): ${message}`);
  }

  static sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
