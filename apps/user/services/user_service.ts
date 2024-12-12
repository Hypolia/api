import User from '#models/user'

export default class UserService {
  async findById(id: string) {
    return User.query().where('id', id).firstOrFail()
  }
}
