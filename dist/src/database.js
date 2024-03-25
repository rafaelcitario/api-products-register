"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.knex = exports.config = void 0;
const env_1 = require("./env");
const knex_1 = require("knex");
const { DATABASE_URL, DATABASE_CLIENT, MIGRATION_URL, MIGRATION_EXT } = env_1.env;
exports.config = {
    client: DATABASE_CLIENT,
    connection: {
        filename: DATABASE_URL,
    },
    migrations: {
        directory: MIGRATION_URL,
        extension: MIGRATION_EXT,
    },
    useNullAsDefault: true,
};
exports.knex = (0, knex_1.knex)(exports.config);
