import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import PlayerService from '#apps/player/services/player_service'
import logger from '@adonisjs/core/services/logger'
import PlayerPolicy from '#apps/player/policies/player_policy'
import {
  createPlayerValidator,
  getPlayersValidator,
  updatePlayerValidator,
} from '#apps/player/validators/player'

@inject()
export default class PlayersController {
  constructor(private playerService: PlayerService) {}

  /**
   * @index
   * @responseBody 200 - <Player[]>
   * @responseHeader 200 - @use(paginated)
   * @param request
   * @param bouncer
   */
  async index({ request, bouncer }: HttpContext) {
    await bouncer.with(PlayerPolicy).authorize('view')
    const data = await request.validateUsing(getPlayersValidator)

    return this.playerService.findAll(data)
  }

  async show({ params, bouncer }: HttpContext) {
    await bouncer.with(PlayerPolicy).authorize('view', params.id)
    return this.playerService.findById(params.id)
  }

  async store({ bouncer, request, response }: HttpContext) {
    await bouncer.with(PlayerPolicy).authorize('create' as never)
    const data = await request.validateUsing(createPlayerValidator)
    logger.info('Creating a new player')
    const player = await this.playerService.create(data)

    return response.created(player)
  }

  async update({ request, bouncer, params }: HttpContext) {
    await bouncer.with(PlayerPolicy).authorize('update')
    const data = await request.validateUsing(updatePlayerValidator)

    return this.playerService.updateById(params.id, data)
  }
}
