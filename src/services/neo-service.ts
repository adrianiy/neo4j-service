import { Driver, Session } from 'neo4j-driver';
import { NeoStore } from '../stores/neo-store';
import { getLogger } from '../lib/logger';

const logger = getLogger('neoService');

/**
 * Todo Service.
 * Gets a todo store injected.
 */
export default class NeoService {
    private _neoStore: NeoStore
    constructor(neoStore) {
        this._neoStore = neoStore;
    }

    login = async ctx => {
        if ((<Driver>ctx.state.driver).verifyConnectivity()) {
            const id = Buffer.from(
                `${ctx.request.body.uri}${ctx.request.body.user}${ctx.request.body.password}`
            ).toString('base64');
            let stored = await this._neoStore.get(id);
            if (!stored) {
                stored = await this._neoStore.create(ctx.state.driver, id);
            }
            return { id: stored.id };
        } else {
            throw new Error('connectivity is not verified');
        }
    }

    logout = async ctx => {
        try {
            this._neoStore.remove(ctx.params.id);
            return true;
        } catch (err) {
            logger.error(err.message);
            throw new Error(`Error doing logout: ${ err.message }`);
        }
    }

    getDriver = async (ctx, next) => {
        try {
            ctx.state.driver = (await this._neoStore.get(ctx.params.id)).driver;
        } catch (err) {
            logger.error(err.message);
            throw new Error(`Error getting saved driver: ${ err.message }`);
        }

        return next;
    }

    getQuery = async ctx => {
        try {
            const results = await (<Session>ctx.state.session).run(ctx.query.q);
            return results;
        } catch (err) {
            logger.error(err.message);
            throw new Error(`Error getting query: ${ err.message }`);
        }
    }
}

export interface INeoService {
    login: (ctx: any) => string
    logout: (ctx: any) => boolean
    getDriver: (ctx: any) => void
    getQuery: (ctx: any) => any
}
