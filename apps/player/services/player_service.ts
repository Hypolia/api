import Player from '#models/player'
import {
  CreatePlayerSchema,
  GetPlayersSchema,
  UpdatePlayerSchema,
} from '#apps/player/validators/player'

export default class PlayerService {
  async findAll(payload: GetPlayersSchema) {
    return Player.query().paginate(payload.page ?? 1, payload.limit ?? 10)
  }

  async findById(id: string) {
    return Player.query().where('id', id).firstOrFail()
  }

  async findByUserId(userId: string) {
    return Player.query().where('user_id', userId).firstOrFail()
  }

  async findByOidcId(oidcId: string) {
    return Player.query()
      .whereHas('user', (query) => {
        query.where('oidc_id', oidcId)
      })
      .firstOrFail()
  }

  async create(payload: CreatePlayerSchema) {
    return Player.create({
      ...payload,
      coins: payload.coins ?? 0,
      level: payload.level ?? 1,
    })
  }

  async updateById(playerId: string, payload: UpdatePlayerSchema) {
    const player = await this.findById(playerId)

    return player.merge(payload).save()
  }
}
