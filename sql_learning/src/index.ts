import sanitizedConfig from "./config";

const fs = require('fs');
const pg = require('pg');
const url = require('url');

const config = {
    user: sanitizedConfig.AIVEN_USER,
    password: sanitizedConfig.AIVEN_PASSWORD,
    host: sanitizedConfig.AIVEN_HOST,
    port: sanitizedConfig.AIVEN_PORT,
    database: sanitizedConfig.AIVEN_DB,
    ssl: {
        rejectUnauthorized: true,
        ca: sanitizedConfig.AIVEN_CA,
    },
};

export async function getClient(){
    const client = new pg.Client(config);
    client.connect(function (err: any) {
        if (err)
            throw err;
        client.query("SELECT VERSION()", [], function (err: any, result: any) {
            if (err)
                throw err;
    
            console.log(result.rows[0].version);
            // The following code closes the connection after running one client.query(), comment out it if you want to run more than one.
            // client.end(function (err: any) {
            //     if (err)
            //         throw err;
            // });
        });
    });
    return client   
}