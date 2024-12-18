import { Client } from "pg";
import sanitizedConfig from "./config";

const client = new Client({
    connectionString: sanitizedConfig.POSTGRES_LOCAL_URI,
})

async function createUsersTable(){
    await client.connect();
    const createUserTableQuery = `
    CREATE TABLE users3 (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `;
    const result = await client.query(createUserTableQuery);
    console.log(result)
}

async function createAdressTable(){
    await client.connect();
    const createUserTableQuery = `
    CREATE TABLE adresses2 (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        city VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        street VARCHAR(255) NOT NULL,
        pincode VARCHAR(20),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users3(id) ON DELETE RESTRICT
        );
    `;
    const result = await client.query(createUserTableQuery);
    console.log(result)
}


async function insertAdressData(user_id: string, city: string, country: string, street: string, pincode: string){
    await client.connect();
    const insertUserAdressQuery = `
    INSERT INTO adresses2 (user_id, city, country, street, pincode)
    VALUES ($1, $2, $3, $4, $5)   
    `;
    const result = await client.query(insertUserAdressQuery, [user_id, city, country, street, pincode]);
    console.log(result);
}


async function insertUserData(username: string, password: string, email: string){
    await client.connect();
    const insertUserDataQuery = `
    INSERT INTO users3 (username, password, email)
    VALUES ($1, $2, $3)   
    `;
    const result = await client.query(insertUserDataQuery, [username, password, email]);
    console.log(result);
}

async function prototypingTransactions(username: string, password: string, email: string, city: string, country: string, street: string, pincode: string){
    try{
        await client.connect();
        await client.query('BEGIN');
        const insertUserDataQuery = `
        INSERT INTO users3 (username, password, email)
        VALUES ($1, $2, $3)
        RETURNING id;
        `;
        const userRes = await client.query(insertUserDataQuery, [username, password, email]);
        const userId = userRes.rows[0].id;

        const insertUserAdressQuery = `
        INSERT INTO adresses2 (user_id, city, country, street, pincode)
        VALUES ($1, $2, $3, $4, $5)   
        `;
        await client.query(insertUserAdressQuery, [userId, city, country, street, pincode]);
        await client.query('COMMIT');
        console.log("Transactoin is complete")
    } catch(err){
        await client.query('ROLLBACK');
        console.log('Error during transaction, transaction rolled back.\n', err);
        throw err;
    }finally{
        await client.end(); // close the connection
    }

}

async function joinQueries(){
    await client.connect();
    const joingQueryString = `
    SELECT u.id, u.email, u.username, a.city, a.country, a.street, a.street, a.pincode
    FROM users3 u
    JOIN adresses2 a ON u.id = a.user_id
    WHERE u.id = '3'
    `;
    const result = await client.query(joingQueryString);
    console.log(result);
}

// createUsersTable();
// insertUserData("rgssfdd", "sescvesgr", "ownwgssujug@gmail.com");
// createAdressTable()
// insertAdressData('3', 'narnaul', 'India', '45', '129401')
// prototypingTransactions("sfdsewo", "iuhficeb", "solnaoeif@gmail.com", "luhcgh", "soidobw", "454342", "243543");
joinQueries();