import { toArray, uuid } from '@coxy/utils'

interface LoggerConstructorParams {
  name: string[] | string
  uuid?: number
  isEnabled?: boolean
}

type Args = any

export class Logger {
  protected readonly prefixes: string[] = []
  private uuid: string = null
  private isEnabled: boolean
  private isTime: boolean
  private lastTime: number
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

  public disableLogger (flag: boolean): void {
    this.isEnabled = flag
  }

  public enableTime (isEnabled: boolean): void {
    if (isEnabled) {
      this.lastTime = Date.now()
    }
    this.isTime = isEnabled
  }

  public resetId (): void {
    this.uuid = uuid(this.options.uuid || 5)
  }

  private message (type: keyof Console, ...args: Args[]): void {
    if (process.env.NODE_ENV === 'test') return
    if (!this.isEnabled) return

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

    fn(...args)
  }

  public fork (params?: LoggerConstructorParams): Logger {
    let name = this.prefixes
    if (params.name) {
      name = [...this.prefixes].concat(...toArray(params.name))
    }
    return new Logger({ ...params, name })
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
