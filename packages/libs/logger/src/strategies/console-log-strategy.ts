import { Logger } from "../logger.js";

// https://stackoverflow.com/a/40560590
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",

  fg: {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    gray: "\x1b[90m",
    crimson: "\x1b[38m", // Scarlet
  },
  bg: {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
    gray: "\x1b[100m",
    crimson: "\x1b[48m",
  },
};

export class ConsoleLogStrategy extends Logger.BaseLogStrategy {
  log({ messages, level, prefixes }: Logger.LogPayload): void {
    if (this.shouldLog(level)) {
      console.log(
        `${this._getTimePrefixColor()}${prefixes[0]}${this._getLevelPrefixColor(level)}${prefixes[1]}${this._getLoggerNamePrefixColor()}${prefixes[2]}${this._getMessageColor(level)}`,
        ...messages,
        colors.reset,
      );
    }
  }

  private _getLevelBasedColor(level: Logger.LogLevel): string {
    switch (level) {
      case Logger.LogLevel.DEBUG:
        return colors.fg.green;
      case Logger.LogLevel.INFO:
        return colors.fg.blue;
      case Logger.LogLevel.WARN:
        return colors.fg.yellow;
      case Logger.LogLevel.ERROR:
        return colors.fg.red;
      case Logger.LogLevel.FATAL:
        return colors.fg.magenta;
    }
  }

  private _getMessageColor(level: Logger.LogLevel): string {
    return this._getLevelBasedColor(level);
  }

  private _getLevelPrefixColor(level: Logger.LogLevel): string {
    return this._getLevelBasedColor(level);
  }

  private _getLoggerNamePrefixColor(): string {
    return colors.fg.gray;
  }

  private _getTimePrefixColor(): string {
    return colors.fg.gray;
  }
}
