import { env } from './lib/env';
import * as Koa from 'koa';
import * as cors from '@koa/cors';
import * as respond from 'koa-respond';
import * as bodyParser from 'koa-bodyparser';
import * as compress from 'koa-compress';
import { scopePerRequest, loadControllers } from 'awilix-koa';

import { getLogger } from './lib/logger';
import { configureContainer } from './lib/container';
import { notFoundHandler } from './middleware/not-found';
import { errorHandler } from './middleware/error-handler';

const logger = getLogger('server');

logger.debug('Creating server...');
const app: any = new Koa();

// Container is configured with our services and whatnot.
const container = (app.container = configureContainer());

app
    // Top middleware is the error handler.
    .use(errorHandler)
    // Compress all responses.
    .use(compress())
    // Adds ctx.ok(), ctx.notFound(), etc..
    .use(respond())
    // Handles CORS.
    .use(cors())
    // Parses request bodies.
    .use(bodyParser())
    // Creates an Awilix scope per request. Check out the awilix-koa
    // docs for details: https://github.com/jeffijoe/awilix-koa
    .use(scopePerRequest(container))
    // Load routes (API "controllers")
    .use(loadControllers('./routes/*.ts', { cwd: __dirname }))
    // Default handler when nothing stopped the chain.
    .use(notFoundHandler);

export const service = app;

export function createServer() {
    service.listen(env.PORT, () => {
        const mode = env.NODE_ENV;
        logger.debug(`Server listening on ${env.PORT} in ${mode} mode`);
    });
}

createServer();
