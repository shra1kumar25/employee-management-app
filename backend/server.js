const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory employee data
let employees = [
    {
        id: 1,
        name: "John",
        email: "john@example.com",
        department: "IT"
    },
    {
        id: 2,
        name: "Sarah",
        email: "sarah@example.com",
        department: "HR"
    }
];

// Home Route
app.get("/", (req, res) => {
    res.send("Employee Management API");
});

// Get All Employees
app.get("/employees", (req, res) => {
    res.json(employees);
});

// Get Employee By ID
app.get("/employees/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const employee = employees.find(
        (employee) => employee.id === id
    );

    if (!employee) {
        return res.status(404).json({
            message: "Employee not found"
        });
    }

    res.json(employee);
});

// Create Employee
app.post("/employees", (req, res) => {
    const newEmployee = {
        id: employees.length + 1,
        name: req.body.name,
        email: req.body.email,
        department: req.body.department
    };

    employees.push(newEmployee);

    res.status(201).json(newEmployee);
});

// Update Employee
app.put("/employees/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const employee = employees.find(
        (employee) => employee.id === id
    );

    if (!employee) {
        return res.status(404).json({
            message: "Employee not found"
        });
    }

    employee.name = req.body.name;
    employee.email = req.body.email;
    employee.department = req.body.department;

    res.json(employee);
});

// Delete Employee
app.delete("/employees/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const employeeIndex = employees.findIndex(
        (employee) => employee.id === id
    );

    if (employeeIndex === -1) {
        return res.status(404).json({
            message: "Employee not found"
        });
    }

    const deletedEmployee = employees.splice(employeeIndex, 1);

    res.json({
        message: "Employee deleted successfully",
        employee: deletedEmployee[0]
    });
});

// Start server only when running directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Export app for testing
module.exports = app;