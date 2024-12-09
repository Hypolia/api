import router from '@adonisjs/core/services/router'

const HealthController = () => import('#apps/health/controllers/health_controller')

router.group(() => {
  router.get('/live', [HealthController, 'index'])
  router.get('/ready', [HealthController, 'ready'])
  router.get('startup', [HealthController, 'startup'])
})
