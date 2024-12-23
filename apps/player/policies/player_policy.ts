import { AuthorizationResponse, BasePolicy } from '@adonisjs/bouncer'
import { JWTPayload } from '#apps/authentication/contracts/jwt'
import { inject } from '@adonisjs/core'
import RoleService from '#apps/shared/services/role_service'
import PlayerService from '#apps/player/services/player_service'

@inject()
export default class PlayerPolicy extends BasePolicy {
  constructor(
    protected roleService: RoleService,
    protected playerService: PlayerService
  ) {
    super()
  }

  async view(payload: JWTPayload, playerId?: string) {
    if (this.roleService.hasRole(payload, 'view-player')) {
      return AuthorizationResponse.allow()
    }

    if (playerId) {
      const player = await this.playerService.findByOidcId(payload.sub).catch(() => {
        return null
      })

      if (player && player.id === playerId) {
        return AuthorizationResponse.allow()
      }
    }

    return AuthorizationResponse.deny('You are not allowed to view a player')
  }

  async create(payload: JWTPayload) {
    if (this.roleService.hasRole(payload, 'create-player')) {
      return AuthorizationResponse.allow()
    }

    return AuthorizationResponse.deny('You are not allowed to create a player')
  }

  async update(payload: JWTPayload) {
    if (this.roleService.hasRole(payload, 'update-player')) {
      return AuthorizationResponse.allow()
    }

    return AuthorizationResponse.deny('You are not allowed to update a player')
  }
}
