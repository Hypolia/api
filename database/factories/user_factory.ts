import factory from '@adonisjs/lucid/factories'
import User from '#models/user'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return User.create({
      email: faker.internet.email(),
      oidcId: faker.string.uuid(),
      username: faker.internet.username(),
    })
  })
  .build()
