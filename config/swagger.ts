import path from 'node:path'
import url from 'node:url'

export default {
  path: path.dirname(url.fileURLToPath(import.meta.url)) + '/../',
  title: 'Foo', // use info instead
  version: '1.0.0', // use info instead
  description: '', // use info instead
  tagIndex: 2,
  info: {
    title: 'title',
    version: '1.0.0',
    description: '',
  },
  snakeCase: true,

  debug: false, // set to true, to get some useful debug output
  ignore: [
    '/swagger',
    '/docs',
    '/api-docs/openapi.json',
    '/live',
    '/ready',
    '/startup',
    '/__transmit/events',
    '/__transmit/subscribe',
    '/__transmit/unsubscribe',
  ],
  preferredPutPatch: 'PUT', // if PUT/PATCH are provided for the same route, prefer PUT
  common: {
    parameters: {}, // OpenAPI conform parameters that are commonly used
    headers: {}, // OpenAPI conform headers that are commonly used
  },
  securitySchemes: {}, // optional
  authMiddlewares: ['auth', 'auth:api'], // optional
  defaultSecurityScheme: 'BearerAuth', // optional
  persistAuthorization: true, // persist authorization between reloads on the swagger page
  showFullPath: false, // the path displayed after endpoint summary:
}