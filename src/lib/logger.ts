import { env } from './env';
import * as winston from 'winston';
import * as chalk from 'chalk';

const ERROR = 'error';
const WARN = 'warn';
const INFO = 'info';
const VERBOSE = 'verbose';
const DEBUG = 'debug';
const SILLY = 'silly';

const colors =
    chalk.level < 2
        ? {
            [ERROR]: chalk.red,
            [WARN]: chalk.yellow,
            [INFO]: chalk.green,
            [VERBOSE]: chalk.cyan,
            [DEBUG]: chalk.blue,
            [SILLY]: chalk.magenta,

            timestamp: chalk.gray,
            package: chalk.white,
            tags: chalk.gray
        }
        : {
            // https://www.w3.org/wiki/CSS/Properties/color/keywords
            [ERROR]: chalk.keyword('red'),
            [WARN]: chalk.keyword('orangered'),
            [INFO]: chalk.keyword('limegreen'),
            [VERBOSE]: chalk.keyword('orange'),
            [DEBUG]: chalk.keyword('skyblue'),
            [SILLY]: chalk.keyword('mediumorchid'),

            timestamp: chalk.keyword('gray'),
            package: chalk.keyword('teal'),
            tags: chalk.keyword('gray')
        };

const tagsString = tags => {
    const str = Object.entries(tags)
        .map(([ k, v ]) => `${k}: ${v}`)
        .join(', ');
    return str ? `{ ${str} }` : '';
};

const colorPrintfBuilder = (pkg, formatStr) => ({
    timestamp,
    level,
    message,
    tags = {}
}) =>
    formatStr
        .replace('%date', colors.timestamp(timestamp))
        .replace('%logger', colors.package(pkg))
        .replace('%message', message)
        .replace('%level', colors[level](level))
        .replace('%-level', colors[level](level.padEnd(7, ' ')))
        .replace('%tags', colors.tags(tagsString(tags)));

const monochromePrintfBuilder = (pkg, formatStr) => ({
    timestamp,
    level,
    message,
    tags = {}
}) =>
    formatStr
        .replace('%date', timestamp)
        .replace('%logger', pkg)
        .replace('%message', message)
        .replace('%level', level)
        .replace('%-level', level.padEnd(7, ' '))
        .replace('%tags', tagsString(tags));

const winstonFormatter = (printf, timestamper?) =>
    winston.format.combine(
        winston.format.timestamp({ format: timestamper }),
        winston.format.printf(printf)
    );

const config = {
    enabled: true,
    format: '%date  %-level  %logger  %message',
    color: true
};

export const getLogger = from =>
    winston.createLogger({
        level: env.LOG_LEVEL,
        transports: [
            new winston.transports.Console({
                format: winstonFormatter(
                    (config.color && chalk.supportsColor
                        ? colorPrintfBuilder
                        : monochromePrintfBuilder)(from, config.format)
                )
            })
        ]
    });
