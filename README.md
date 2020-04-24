[![Build & Test][build-badge]][build-link]
[![GitHub license][license-image]][repo-link]
[![Version][version-image]][repo-version-link]

# NEO4J-Service

Small service implementation based on [koa] framework and [jeffijoe] boilerplate.

## Motivation

Expose a tiny api to manage queries to [Neo4j] Server.

### Published endpoints

- `api/login`: POST request that gets connection uri, user and pass from reuqest body. With this credentials we will store a [Neo4j] driver in service store and return it's identifier
- `api/logout`: GET request that receives a driver identificator and remove it from the store
- `api/query`: GET request that receives a driver identificator and a query to execute against [Neo4j] server

# Implementation

## `npm run` scripts

There are a few defined run scripts, here's a list of them with a description of what they do. To run them, simply execute `npm run <script name>` - e.g. `npm run dev`

- `start`: Used by the production environment to start the app. This will run a compiled version, so you need to execute `build` first.
- `build`: Runs the `babel` CLI to compile the app. Files are emitted to `dist/`.
- `dev`: Runs the app in development mode - uses `babel-node` to compile on-the-fly. Also uses `nodemon` to automatically restart when stuff changes.
- `test`: Runs tests.
- `cover`: Runs tests and collects coverage.
- `lint`: Lints + formats the code.

**Tip**: to pass additional arguments to the actual CLI's being called, do it like in this example:

**For npm:**

```bash
# Note the `--` before the actual arguments.
npm run test -- --debug
```

**For yarn:**

```bash
# Yarn does not need the `--` before the actual arguments.
yarn test --debug
```

## `docker-compose up` scripts

**For running dev:**

```bash
# Note: use --build only when you want to build. Usually when you change packages.json
docker-compose up --build
```

**For running test:**

```bash
docker-compose -f docker-compose.test.yml up
```

## Environment variables

The environment variables can be reached by importing `lib/env`.

```
import { env } from '../lib/env'
```

Additionally, all environment variables you'd usually find on `process.env` will be available on this object.

When attempting to access a key (`env.PORT` for example), if the key does not exist an error is thrown and the process terminated.

In the repository root, you will find a `env.yaml`, which is where you can set up environment variables so you won't have to do it from your shell. This also makes it more platform-agnostic.

The top-level nodes in the YAML-file contain a set of environment variables.
`yenv` will load the set that matches whatever `NODE_ENV` says.

I've set it up so anything in `tests` will override anything in `development` when running tests.

_Actual environment variables will take precedence over the `env.yaml` file!_

See the [`yenv` docs](https://github.com/jeffijoe/yenv) for more info.

## API endpoints

Each file in `/routes` exports a "controller" that `awilix-koa` will use for routing. Please see [`awilix-koa`](https://github.com/jeffijoe/awilix-koa#awesome-usage) docs for more information.

## Dependency injection

This boilerplate uses the [`Awilix`](https://github.com/jeffijoe/awilix) container for managing dependencies - please check out the Awilix documentation
for details. The container is configured in `lib/container.js`.

## Middleware

Middleware is located in the `middleware` folder and is _not_ automatically loaded - they should be installed in `lib/server`.

# Author

- Adrián Insua Yañez - [@AdrianInsua](https://github.com/AdrianInsua)

# License

MIT.

[koa]: https://koajs.com/
[Neo4j]: https://neo4j.com/
[jeffijoe]: https://github.com/jeffijoe/koa-es7-boilerplate/blob/master/src/lib/server.js

[build-badge]: https://github.com/AdrianInsua/neo4j-service/workflows/Build%20&%20Test/badge.svg
[build-link]: https://github.com/AdrianInsua/neo4j-service/actions?query=workflow%3A"Build+%26+Test"
[license-image]: https://badgen.net/github/license/AdrianInsua/neo4j-service
[version-image]: https://badgen.net/github/release/AdrianInsua/neo4j-service/stable
[repo-link]: https://github.com/AdrianInsua/neo4j-service
[repo-version-link]: https://github.com/AdrianInsua/neo4j-service/releases
