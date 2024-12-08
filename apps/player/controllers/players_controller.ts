import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import PlayerService from '#apps/player/services/player_service'
import logger from '@adonisjs/core/services/logger'
import PlayerPolicy from '#apps/player/policies/player_policy'
import { createPlayerValidator } from '#apps/player/validators/player'

@inject()
export default class PlayersController {
  constructor(private playerService: PlayerService) {}

  async show({ params }: HttpContext) {
    return this.playerService.findById(params.id)
  }

  async store({ bouncer, request, response }: HttpContext) {
    await bouncer.with(PlayerPolicy).authorize('create' as never)
    const data = await request.validateUsing(createPlayerValidator)
    logger.info('Creating a new player')
    const player = await this.playerService.create(data)

    return response.created(player)
  }
}
