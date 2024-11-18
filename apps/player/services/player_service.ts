import Player from '#apps/player/models/player'

export default class PlayerService {
  async findById(id: string) {
    return Player.query()
      .where('id', id)
      .firstOrFail()
  }
}
