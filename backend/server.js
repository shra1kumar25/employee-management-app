const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("Employee Management API");
});

// Health Check
app.get("/health", async (req, res) => {
    try {
        await pool.query("SELECT 1");

        res.status(200).json({
            status: "UP",
            database: "connected"
        });
    } catch (error) {
        console.error("Health check failed:", error);

        res.status(503).json({
            status: "DOWN",
            database: "disconnected"
        });
    }
});

// Get All Employees
app.get("/employees", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM employees ORDER BY id"
        );

        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching employees:", error);

        res.status(500).json({
            message: "Failed to fetch employees"
        });
    }
});

// Get Employee By ID
app.get("/employees/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: "Invalid employee ID"
            });
        }

        const result = await pool.query(
            "SELECT * FROM employees WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error fetching employee:", error);

        res.status(500).json({
            message: "Failed to fetch employee"
        });
    }
});

// Create Employee
app.post("/employees", async (req, res) => {
    try {
        const { name, email, department } = req.body;

        if (!name || !email || !department) {
            return res.status(400).json({
                message: "Name, email and department are required"
            });
        }

        const result = await pool.query(
            `INSERT INTO employees (name, email, department)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [name, email, department]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error creating employee:", error);

        if (error.code === "23505") {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        res.status(500).json({
            message: "Failed to create employee"
        });
    }
});

// Update Employee
app.put("/employees/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const { name, email, department } = req.body;

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: "Invalid employee ID"
            });
        }

        if (!name || !email || !department) {
            return res.status(400).json({
                message: "Name, email and department are required"
            });
        }

        const result = await pool.query(
            `UPDATE employees
             SET name = $1,
                 email = $2,
                 department = $3
             WHERE id = $4
             RETURNING *`,
            [name, email, department, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error("Error updating employee:", error);

        if (error.code === "23505") {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        res.status(500).json({
            message: "Failed to update employee"
        });
    }
});

// Delete Employee
app.delete("/employees/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);

        if (Number.isNaN(id)) {
            return res.status(400).json({
                message: "Invalid employee ID"
            });
        }

        const result = await pool.query(
            "DELETE FROM employees WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json({
            message: "Employee deleted successfully",
            employee: result.rows[0]
        });
    } catch (error) {
        console.error("Error deleting employee:", error);

        res.status(500).json({
            message: "Failed to delete employee"
        });
    }
});

// Start server only when running directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Export app for testing
module.exports = app;
