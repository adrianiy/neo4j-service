import { env } from './env';
import { createContainer, Lifetime, InjectionMode, asValue } from 'awilix';
import { getLogger } from './logger';

const logger = getLogger('container');

/**
 * Using Awilix, the following files and folders (glob patterns)
 * will be loaded.
 */
const modulesToLoad: any= [
    // Services should be scoped to the request.
    // This means that each request gets a separate instance
    // of a service.
    [ `services/*.${env.EXT}`, Lifetime.SCOPED ],
    // Stores will be singleton (1 instance per process).
    // This is just for demo purposes, you can do whatever you want.
    [ `stores/*.${env.EXT}`, Lifetime.SINGLETON ]
];

/**
 * Configures a new container.
 *
 * @return {Object} The container.
 */
export function configureContainer() {
    const opts = {
        // Classic means Awilix will look at function parameter
        // names rather than passing a Proxy.
        injectionMode: InjectionMode.CLASSIC
    };
    return createContainer(opts)
        .loadModules(modulesToLoad, {
            // `modulesToLoad` paths should be relative
            // to this file's parent directory.
            cwd: `${__dirname}/..`,
            // Example: registers `services/todo-service.js` as `todoService`
            formatName: 'camelCase'
        })
        .register({
            // Our logger is already constructed,
            // so provide it as-is to anyone who wants it.
            logger: asValue(logger)
        });
}
