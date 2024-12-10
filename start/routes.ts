/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import transmit from '@adonisjs/transmit/services/main'

router.post('/', () => {
  transmit.broadcast('test', { message: 'world' })
  return { hello: 'world' }
})

transmit.registerRoutes()
