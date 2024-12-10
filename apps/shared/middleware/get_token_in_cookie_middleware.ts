import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'

export default class GetTokenInCookieMiddleware {
  async handle({ request }: HttpContext, next: NextFn) {
    const token = request.plainCookie('token', {
      encoded: false,
    })

    if (token) {
      request.headers().authorization = `Bearer ${token}`
    }

    return next()
  }
}
