import { JWTPayload } from '#apps/authentication/contracts/jwt'

export default class RoleService {
  hasRole(payload: JWTPayload, role: string): boolean {
    if (!payload.realm_access || !payload.realm_access.roles) {
      return false
    }

    return payload.realm_access.roles.includes(role)
  }
}
