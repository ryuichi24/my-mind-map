export interface ILogger {
  debug(...message: LogItem[]): void;
  info(...message: LogItem[]): void;
  warn(...message: LogItem[]): void;
  error(...message: LogItem[]): void;
  fatal(...message: LogItem[]): void;
}

type LogItem = string | number | object | null | undefined;

export class Logger implements ILogger {
  private _strategies: Logger.LogStrategy[] = [];
  private _name: string;

  constructor(props: Logger.Props) {
    this._name = props.name || "Default Logger";
  }

  public addStrategy(strategy: Logger.LogStrategy): this {
    this._strategies.push(strategy);
    return this;
  }

  public setLevel(level: Logger.LogLevel): this {
    this._strategies.forEach((strategy) => strategy.setLevel(level));
    return this;
  }

  private log(level: Logger.LogLevel, messages: LogItem[]): void {
    const now = new Date();
    const timePrefix = `[${now.toUTCString()}]`;
    const loggerNamePrefix = `[${this._name}]`;
    const levelPrefix = `[${Logger.LogLevel[level].toUpperCase()}]`;
    this._strategies.forEach((strategy) =>
      strategy.log({
        messages,
        loggerName: this._name,
        level,
        nowDate: now,
        prefixes: [timePrefix, levelPrefix, loggerNamePrefix],
        timePrefix,
        loggerNamePrefix,
        levelPrefix,
      }),
    );
  }

  public debug(...message: LogItem[]): void {
    this.log(Logger.LogLevel.DEBUG, message);
  }

  public info(...message: LogItem[]): void {
    this.log(Logger.LogLevel.INFO, message);
  }

  public warn(...message: LogItem[]): void {
    this.log(Logger.LogLevel.WARN, message);
  }

  public error(...message: LogItem[]): void {
    this.log(Logger.LogLevel.ERROR, message);
  }

  public fatal(...message: LogItem[]): void {
    this.log(Logger.LogLevel.FATAL, message);
  }
}

export namespace Logger {
  export type Props = { name?: string };
  export enum LogLevel {
    DEBUG = 1,
    INFO,
    WARN,
    ERROR,
    FATAL,
  }

  export type LogPayload = {
    messages: LogItem[];
    loggerName: string;
    loggerNamePrefix: string;
    nowDate: Date;
    timePrefix: string;
    level: Logger.LogLevel;
    levelPrefix: string;
    /**
     * [timePrefix, levelPrefix, loggerNamePrefix]
     *
     *  0 => timePrefix
     *  1 => levelPrefix
     *  2 => loggerNamePrefix
     */
    prefixes: [string, string, string];
  };

  export interface LogStrategy {
    log(payload: Logger.LogPayload): void;
    setLevel(level: LogLevel): void;
  }

  export abstract class BaseLogStrategy implements Logger.LogStrategy {
    protected currentLevel: Logger.LogLevel = Logger.LogLevel.INFO;

    setLevel(level: Logger.LogLevel): this {
      this.currentLevel = level;
      return this;
    }

    abstract log(payload: Logger.LogPayload): void;

    protected shouldLog(level: Logger.LogLevel): boolean {
      return level >= this.currentLevel;
    }
  }
}
