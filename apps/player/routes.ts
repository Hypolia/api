import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const PlayersController = () => import('#apps/player/controllers/players_controller')
router
  .group(() => {
    router
      .group(() => {
        router.get('/', [PlayersController, 'index'])
        router.get('/:id', [PlayersController, 'show'])
        router.post('/', [PlayersController, 'store'])
        router.put('/:id', [PlayersController, 'update'])
      })
      .prefix('/players')
  })
  .prefix('/v1')
  .use(middleware.auth())
