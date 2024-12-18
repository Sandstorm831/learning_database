import dotenv from 'dotenv';
dotenv.config();

interface ENV{
    AIVEN_CA:string | undefined;
    AIVEN_DB: string | undefined;
    AIVEN_HOST: string | undefined;
    AIVEN_PASSWORD: string | undefined;
    AIVEN_USER: string | undefined;
    AIVEN_PORT: number | undefined;
    PSQL_URI: string | undefined;
    POSTGRES_LOCAL_URI: string | undefined;
}

interface Config{
    AIVEN_CA:string;
    AIVEN_DB: string;
    AIVEN_HOST: string;
    AIVEN_PASSWORD: string;
    AIVEN_USER: string;
    AIVEN_PORT: number;
    PSQL_URI: string;
    POSTGRES_LOCAL_URI: string;
}

// Loading process.env variables as ENV 
const getConfig = ():ENV => {
    return{
        AIVEN_CA: process.env.AIVEN_CA,
        AIVEN_DB: process.env.AIVEN_DB,
        AIVEN_HOST: process.env.AIVEN_HOST,
        AIVEN_PASSWORD: process.env.AIVEN_PASSWORD,
        AIVEN_USER: process.env.AIVEN_USER,
        AIVEN_PORT: process.env.AIVEN_PORT ? Number(process.env.AIVEN_PORT) : undefined,
        PSQL_URI: process.env.PSQL_URI,
        POSTGRES_LOCAL_URI: process.env.POSTGRES_LOCAL_URI,
    }
}   

// Throwing an error if any of the value is undefined. If all godd, return it as config which just removes undefined from type definition

const getSanitizedConfig = (config: ENV) : Config => {
    for (const [key, value] of Object.entries(config)){
        if(value === undefined){
            throw new Error(`Missing key ${key} in .env`);
        }
    }
    return config as Config;
}

const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);
export default sanitizedConfig;