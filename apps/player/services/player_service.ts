import Player from '#apps/player/models/player'
import { CreatePlayerSchema, GetPlayersSchema } from '#apps/player/validators/player'

export default class PlayerService {
  async findAll(payload: GetPlayersSchema) {
    return Player.query().paginate(payload.page ?? 1, payload.limit ?? 10)
  }

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
