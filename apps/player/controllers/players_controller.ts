import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import PlayerService from '#apps/player/services/player_service'

@inject()
export default class PlayersController {
  constructor(private playerService: PlayerService) {}

  async show({ params }: HttpContext) {
    return this.playerService.findById(params.id)
  }
}
