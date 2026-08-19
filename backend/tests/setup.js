const pool = require("../db");

beforeAll(async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS employees (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(150) UNIQUE NOT NULL,
            department VARCHAR(100) NOT NULL
        )
    `);

    await pool.query("TRUNCATE TABLE employees RESTART IDENTITY");

    await pool.query(`
        INSERT INTO employees (name, email, department)
        VALUES
            ('John', 'john@example.com', 'IT'),
            ('Sarah', 'sarah@example.com', 'HR')
    `);
});

afterAll(async () => {
    await pool.end();
});
