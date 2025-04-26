const s4 = (): string =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)

export function uuid(len = 100): string {
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`.slice(0, len)
}

export function toArray<T>(any: T | T[]): T[] {
  return Array.isArray(any) ? any : [any]
}

interface LoggerConstructorParams {
  name: string[] | string
  uuidLen?: number
  isTime?: boolean
  isEnabled?: boolean
}
type Args = unknown
type Middleware = (...args: Args[]) => void

export class Logger {
  protected readonly prefixes: string[] = []
  private uuid: string = null
  private isEnabled: boolean
  private isTime: boolean
  private lastTime: number
  private middlewares = []
  private options: LoggerConstructorParams

  constructor(params?: LoggerConstructorParams) {
    this.options = params
    this.isEnabled = params.isEnabled !== false
    this.isTime = params.isTime === true

    if (params.uuidLen) {
      this.uuid = uuid(params.uuidLen || 5)
    }
    if (params?.name) {
      this.prefixes.push(...toArray(params?.name))
    }
  }

  public use(middleware: Middleware) {
    this.middlewares.push(middleware)
  }

  public setEnableStatus(flag: boolean): void {
    this.isEnabled = flag
  }

  public setEnableTime(isEnabled: boolean): void {
    if (isEnabled) {
      this.lastTime = Date.now()
    }
    this.isTime = isEnabled
  }

  public resetId(): void {
    this.uuid = uuid(this.options.uuidLen || 5)
  }

  private message(type: keyof Console, ...args: Args[]): void {
    // eslint-disable-next-line no-console
    const fn = console[type] as typeof console.log
    if (this.isTime) {
      args.unshift(`[time: ${Date.now() - this.lastTime}ms]`)
      this.lastTime = Date.now()
    }
    if (this.uuid) args.unshift(`[${this.uuid}]`)

    if (this.prefixes.length) {
      for (const prefix of [...this.prefixes].reverse()) {
        args.unshift(`[${prefix}]`)
      }
    }

    if (this.middlewares.length > 0) {
      for (const md of this.middlewares) {
        md(type, ...args)
      }
    }

    if (!this.isEnabled) return
    fn(...args)
  }

  public fork(params?: LoggerConstructorParams): Logger {
    let name = this.prefixes
    if (params.name) {
      name = [...this.prefixes].concat(...toArray(params.name))
    }
    const logger = new Logger({ ...params, name, isEnabled: this.isEnabled })
    if (this.middlewares.length) {
      for (const md of this.middlewares) {
        logger.use(md)
      }
    }
    return logger
  }

  public log(...args: Args[]): void {
    this.message('log', ...args)
  }

  public warn(...args: Args[]): void {
    this.message('warn', ...args)
  }

  public error(...args: Args[]): void {
    this.message('error', ...args)
  }

  public info(...args: Args[]): void {
    this.message('info', ...args)
  }
}
