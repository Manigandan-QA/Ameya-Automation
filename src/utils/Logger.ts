type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';

class Logger {
  private log(level: LogLevel, message: string, meta?: unknown): void {
    const ts = new Date().toISOString();
    const line = `[${ts}] [${level}] ${message}`;
    meta !== undefined ? console.log(line, meta) : console.log(line);
  }

  info(message: string, meta?: unknown): void {
    this.log('INFO', message, meta);
  }

  warn(message: string, meta?: unknown): void {
    this.log('WARN', message, meta);
  }

  error(message: string, meta?: unknown): void {
    this.log('ERROR', message, meta);
  }

  debug(message: string, meta?: unknown): void {
    if (process.env.DEBUG === 'true') {
      this.log('DEBUG', message, meta);
    }
  }
}

export const logger = new Logger();
