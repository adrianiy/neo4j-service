import { sendData } from './../middleware/framework';
import { INeoService } from './../services/neo-service';
import { createController } from 'awilix-koa';
import { pipe } from '../middleware/framework';
import {
    createDriver,
    createSession
} from './../middleware/neo-handler';

// This is our API controller.
const api = (neoService: INeoService) => ({
    login: pipe(createDriver, sendData(neoService.login)),
    logout: sendData(neoService.logout),
    query: pipe(
        neoService.getDriver,
        createSession,
        sendData(neoService.getQuery)
    ),
    health: async ctx => ctx.ok('it\'s alive!')
});

// Maps routes to method calls on the `api` controller.
// See the `awilix-router-core` docs for info:
// https://github.com/jeffijoe/awilix-router-core
export default createController(api)
    .prefix('/api')
    .post('/login', 'login')
    .get('/logout/:id', 'logout')
    .get('/query/:id', 'query')
    .get('/health', 'health');
