import { Client } from 'pg';
import sanitizedConfig from './config';

export async function getClientDepreciated() {
    const client = new Client(sanitizedConfig.PSQL_URI);
    await client.connect();
    return client;
}