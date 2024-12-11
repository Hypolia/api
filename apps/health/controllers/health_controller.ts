import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { healthChecks } from '#start/health'
import app from '@adonisjs/core/services/app'

@inject()
export default class HealthController {
  async index({ response }: HttpContext) {
    return response.ok({ status: 'alive' })
  }

  async ready({ response }: HttpContext) {
    const report = await healthChecks.run()

    if (report.isHealthy) {
      return response.ok(report)
    }

    return response.serviceUnavailable(report)
  }

  async startup({ response }: HttpContext) {
    const booted = app.isBooted

    if (booted) {
      return response.ok({ status: 'booted' })
    }

    return response.status(503).send({ status: 'not booted' })
  }
}
