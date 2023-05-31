const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
    connectionString: process.env.pg_url,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;
