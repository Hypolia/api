import Player from '#apps/player/models/player'
import { CreatePlayerSchema } from '#apps/player/validators/player'

export default class PlayerService {
  async findById(id: string) {
    return Player.query().where('id', id).firstOrFail()
  }

  async create(payload: CreatePlayerSchema) {
    return Player.create({
      ...payload,
      coins: payload.coins ?? 0,
      level: payload.level ?? 1,
    })
  }
}
