import pg from 'pg';

const { Pool } = pg;

interface DBlocal {
    user?: string;
    password?: string;
    port?: number;
    host?: string;
    database?: string;
    connectionString?: string;
    ssl?: object;
}

let databaseConfig: DBlocal = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
};

if (process.env.NODE_ENV === 'production') {
    databaseConfig = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    };
}

const connection = new Pool(databaseConfig);

export {
    connection,
};
