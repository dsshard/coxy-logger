import { toArray, uuid } from '@coxy/utils'

interface LoggerConstructorParams {
  name: string[] | string
  uuid?: number
  isEnabled?: boolean
}
type Args = any
type Middleware = (...args: Args[]) => void

export class Logger {
  protected readonly prefixes: string[] = []
  private uuid: string = null
  private isEnabled: boolean
  private isTime: boolean
  private lastTime: number
  private middlewares = []
  private options: LoggerConstructorParams

  constructor (params?: LoggerConstructorParams) {
    this.options = params
    this.isEnabled = params.isEnabled !== false

    if (params.uuid) {
      this.uuid = uuid(params.uuid || 5)
    }
    if (params?.name) {
      this.prefixes.push(...toArray(params?.name))
    }
  }

  public use (middleware: Middleware) {
    this.middlewares.push(middleware)
  }

  public setEnableStatus (flag: boolean): void {
    this.isEnabled = flag
  }

  public setEnableTime (isEnabled: boolean): void {
    if (isEnabled) {
      this.lastTime = Date.now()
    }
    this.isTime = isEnabled
  }

  public resetId (): void {
    this.uuid = uuid(this.options.uuid || 5)
  }

  private message (type: keyof Console, ...args: Args[]): void {
    // eslint-disable-next-line no-console
    const fn: any = console[type]
    if (this.isTime) {
      args.unshift(`[time: ${Date.now() - this.lastTime}ms]`)
      this.lastTime = Date.now()
    }
    if (this.uuid) args.unshift(`[${this.uuid}]`)

    if (this.prefixes.length) {
      [...this.prefixes].reverse().forEach((prefix) => {
        args.unshift(`[${prefix}]`)
      })
    }

    if (this.middlewares.length > 0) {
      this.middlewares.forEach((md) => {
        md(type, ...args)
      })
    }

    if (!this.isEnabled) return
    fn(...args)
  }

  public fork (params?: LoggerConstructorParams): Logger {
    let name = this.prefixes
    if (params.name) {
      name = [...this.prefixes].concat(...toArray(params.name))
    }
    const logger = new Logger({ ...params, name, isEnabled: this.isEnabled })
    if (this.middlewares.length) {
      this.middlewares.forEach((md) => {
        logger.use(md)
      })
    }
    return logger
  }

  public log (...args: Args[]): void {
    this.message('log', ...args)
  }

  public warn (...args: Args[]): void {
    this.message('warn', ...args)
  }

  public error (...args: Args[]): void {
    this.message('error', ...args)
  }

  public info (...args: Args[]): void {
    this.message('info', ...args)
  }
}
