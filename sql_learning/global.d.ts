namespace NodeJS{
    interface ProcessEnv{
        AIVEN_CA: string;
        AIVEN_DB: string;
        AIVEN_HOST: string;
        AIVEN_PASSWORD: string;
        AIVEN_USER: string;
        AIVEN_PORT: number;
        PSQL_URI: string;

    }
} 
// edit the tsconfig file to add the path of this file in "typeRoots" variable along side "./node_modules/@types"