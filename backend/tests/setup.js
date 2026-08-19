const pool = require("../db");

beforeAll(async () => {
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
