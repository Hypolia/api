import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { healthChecks } from '#start/health'
import app from '@adonisjs/core/services/app'

@inject()
export default class HealthController {
  async index({ response }: HttpContext) {
    return response.ok({ status: 'alive' })
  }

  async ready({}: HttpContext) {
    return healthChecks.run()
  }

  async startup({ response }: HttpContext) {
    const booted = app.isBooted

    if (booted) {
      return response.ok({ status: 'booted' })
    }

    return response.status(503).send({ status: 'not booted' })
  }
}
