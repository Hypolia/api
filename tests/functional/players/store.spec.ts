import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import { randomUUID } from 'node:crypto'

test.group('Players store', () => {
  test('should return 401 if the user was not connected', async ({ assert, client }) => {
    const response = await client.post('/v1/players')

    response.assertStatus(401)
    assert.properties(response.body(), ['code', 'status', 'message'])
    assert.equal(response.body().code, 'E_UNAUTHORIZED_ACCESS')
    assert.equal(response.body().status, 401)
  })

  test('should return 403 if the user was connected but not authorized', async ({
    assert,
    client,
  }) => {
    const user = await UserFactory.make()

    const response = await client.post('/v1/players').loginAs(user, [])

    response.assertStatus(403)
    assert.properties(response.body(), ['code', 'status', 'message'])
    assert.equal(response.body().code, 'E_AUTHORIZATION_FAILURE')
    assert.equal(response.body().status, 403)
  })

  test('should return 201 if the user was connected and authorized', async ({ assert, client }) => {
    const user = await UserFactory.make()

    const response = await client
      .post('/v1/players')
      .json({
        playerUuid: randomUUID(),
        level: 1,
        coins: 500,
      })
      .loginAs(user, ['create-player'])

    response.assertStatus(201)
    assert.properties(response.body(), ['id', 'playerUuid', 'coins', 'level'])
  })

  test('should return 422 if the playerUuid is missing', async ({ assert, client }) => {
    const user = await UserFactory.make()

    const response = await client
      .post('/v1/players')
      .json({
        level: 1,
        coins: 500,
      })
      .loginAs(user, ['create-player'])

    response.assertStatus(422)

    assert.properties(response.body(), ['errors'])
    assert.equal(response.body().errors[0].field, 'playerUuid')
  })
})
