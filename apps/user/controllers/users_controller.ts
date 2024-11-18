import { inject } from '@adonisjs/core'
import UserService from '#apps/user/services/user_service'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class UsersController {
  constructor(private userService: UserService) {}

  async show({ params }: HttpContext) {
    return this.userService.findById(params.id)
  }
}
