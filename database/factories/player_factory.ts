import factory from '@adonisjs/lucid/factories'
import Player from '#models/player'
import { UserFactory } from '#database/factories/user_factory'

export const PlayerFactory = factory
  .define(Player, async ({ faker }) => {
    const user = await UserFactory.make()
    return Player.create({
      userId: user.id,
      coins: 0,
      level: 1,
      playerUuid: faker.string.uuid(),
    })
  })
  .build()

export const PlayerFactoryWithUser = (userId: string) =>
  factory
    .define(Player, async ({ faker }) => {
      return Player.create({
        userId: userId,
        coins: 0,
        level: 1,
        playerUuid: faker.string.uuid(),
      })
    })
    .build()
