const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || "employee_user",
    password: process.env.DB_PASSWORD || "employee_password",
    database: process.env.DB_NAME || "employee_db"
});

module.exports = pool;
