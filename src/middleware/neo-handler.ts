import { driver, auth, Driver, Session } from 'neo4j-driver';
import { getLogger } from '../lib/logger';

const logger = getLogger('neo-handler');

export const createDriver = async (ctx, next) => {
    logger.debug('creating driver');

    ctx.state.driver = driver(
        ctx.request.body.uri,
        auth.basic(ctx.request.body.user, ctx.request.body.password)
    );

    return next;
};

export const createSession = async (ctx, next) => {
    logger.debug('creating session');

    ctx.state.session = (<Driver>ctx.state.driver).session();

    return next;
};

export const closeSession = async (ctx, next) => {
    logger.debug('closing session')

    ;(<Session>ctx.state.session).close();

    return next;
};
