import { Driver } from 'neo4j-driver';

/**
 * In-memory todos store.
 * For demo purposes, gets the logger injected.
 */
export default function createNeoStore(logger): NeoStore {
    let _drivers: NeoDriver[] = [];

    return {
        async all() {
            logger.debug('Finding drivers');
            return [ ..._drivers ];
        },

        async get(id) {
            logger.debug(`Finding drivers with id ${id}`);
            const found = _drivers.find(x => x.id === id);
            if (!found) {
                return null;
            }
            return found;
        },

        async create(driver, id) {
            const drv = {
                driver,
                id
            };
            _drivers.push(drv);
            logger.debug('Created new driver', drv);
            return drv;
        },

        async update(id, driver) {
            const drv = _drivers.find(x => x.id === id.toString());
            Object.assign(drv, driver);
            logger.debug(`Updated driver ${id}`, drv);
            return drv;
        },

        async remove(id) {
            _drivers = _drivers.filter(x => x.id !== id.toString());
            logger.debug(`Removed driver ${id}`);
        }
    };
}

export interface NeoDriver {
    driver: Driver
    id: string
}

export interface NeoStore {
    all: () => Promise<NeoDriver[]>
    get: (id: string) => Promise<NeoDriver>
    create: (driver: Driver, id: string) => Promise<NeoDriver>
    update: (id: string, driver: Driver) => Promise<NeoDriver>
    remove: (id: string) => void
}
