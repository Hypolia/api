import { AuthorizationResponse, BasePolicy } from '@adonisjs/bouncer'
import { JWTPayload } from '#apps/authentication/contracts/jwt'
import { inject } from '@adonisjs/core'
import RoleService from '#apps/shared/services/role_service'

@inject()
export default class PlayerPolicy extends BasePolicy {
  constructor(protected roleService: RoleService) {
    super()
  }

  async view(payload: JWTPayload) {
    if (this.roleService.hasRole(payload, 'view-player')) {
      return AuthorizationResponse.allow()
    }

    return AuthorizationResponse.deny('You are not allowed to view a player')
  }

  async create(payload: JWTPayload) {
    if (this.roleService.hasRole(payload, 'create-player')) {
      return AuthorizationResponse.allow()
    }

    return AuthorizationResponse.deny('You are not allowed to create a player')
  }
}
