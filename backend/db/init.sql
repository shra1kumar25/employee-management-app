CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    department VARCHAR(100) NOT NULL
);

INSERT INTO employees (name, email, department)
VALUES
    ('John', 'john@example.com', 'IT'),
    ('Sarah', 'sarah@example.com', 'HR')
ON CONFLICT (email) DO NOTHING;
