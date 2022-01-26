import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class SuapProvider {
  constructor(protected app: ApplicationContract) {}

  public async boot() {
    const Ally = this.app.container.resolveBinding('Adonis/Addons/Ally')
    const { SuapDriver } = await import('../src/Suap')

    Ally.extend('suapdriver', (_, __, config, ctx) => {
      return new SuapDriver(ctx, config)
    })
  }
}
