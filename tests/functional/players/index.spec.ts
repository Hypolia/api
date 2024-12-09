import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'

test.group('Players index', () => {
  test('should return 401 if the user was not connected', async ({ assert, client }) => {
    const response = await client.get('/v1/players')

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

    const response = await client.get('/v1/players').loginAs(user, [])

    response.assertStatus(403)
    assert.properties(response.body(), ['code', 'status', 'message'])
    assert.equal(response.body().code, 'E_AUTHORIZATION_FAILURE')
    assert.equal(response.body().status, 403)
  })

  test('should return 200 if the user was connected and authorized', async ({ assert, client }) => {
    const user = await UserFactory.make()

    const response = await client.get('/v1/players').loginAs(user, ['view-player'])

    response.assertStatus(200)
    assert.properties(response.body(), ['data', 'meta'])
    assert.isArray(response.body().data)
  })
})
