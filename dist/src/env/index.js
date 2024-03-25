"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('production'),
    PORT: zod_1.z.string().transform((port) => parseInt(port)),
    HOST: zod_1.z.enum(['localhost', '127.0.0.1']).default('localhost'),
    DATABASE_URL: zod_1.z.string(),
    DATABASE_CLIENT: zod_1.z.enum(['sqlite3']).default('sqlite3'),
    MIGRATION_URL: zod_1.z.string(),
    MIGRATION_EXT: zod_1.z.enum(['ts', 'js']).default('ts'),
});
const _env = envSchema.safeParse(process.env);
if (_env.success === false) {
    console.log('Some enviroment variables is not found: ', _env.error.format());
    throw new Error('Some enviroment variables is not found. Please check the above stack-trace ');
}
exports.env = _env.data;
