import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import { PlayerFactory } from '#database/factories/player_factory'

test.group('Players update', () => {
  test('should return 401 if the user was not connected', async ({ assert, client }) => {
    const response = await client.put('/v1/players/1')

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
    const player = await PlayerFactory.make()

    const response = await client.put(`/v1/players/${player.id}`).loginAs(user, [])

    response.assertStatus(403)
    assert.properties(response.body(), ['code', 'status', 'message'])
    assert.equal(response.body().code, 'E_AUTHORIZATION_FAILURE')
    assert.equal(response.body().status, 403)
  })

  test('should return 404 if the player was not found', async ({ assert, client }) => {
    const user = await UserFactory.make()

    const response = await client.put(`/v1/players/1`).loginAs(user, ['update-player'])

    assert.properties(response.body(), ['code', 'status', 'message'])
    assert.equal(response.body().code, 'E_ROW_NOT_FOUND')
    assert.equal(response.body().status, 404)

    response.assertStatus(404)
  })

  test('should return 200 if the user was connected and authorized', async ({ assert, client }) => {
    const user = await UserFactory.make()
    const player = await PlayerFactory.make()

    const response = await client
      .put(`/v1/players/${player.id}`)
      .json({
        level: 2,
        coins: 1000,
      })
      .loginAs(user, ['update-player'])

    response.assertStatus(200)

    assert.properties(response.body(), ['id', 'coins', 'level', 'playerUuid'])
    assert.equal(response.body().level, 2)
    assert.equal(response.body().coins, 1000)
  })
})
