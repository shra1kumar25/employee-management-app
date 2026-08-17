const request = require("supertest");
const app = require("../server");

describe("Employee API", () => {

    test("GET /employees should return all employees", async () => {
        const response = await request(app).get("/employees");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test("GET /employees/1 should return employee", async () => {
        const response = await request(app).get("/employees/1");

        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(1);
    });

    test("POST /employees should create employee", async () => {
        const response = await request(app)
            .post("/employees")
            .send({
                name: "David",
                email: "david@example.com",
                department: "Finance"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe("David");
    });

    test("PUT /employees/1 should update employee", async () => {
        const response = await request(app)
            .put("/employees/1")
            .send({
                name: "John Updated",
                email: "john@example.com",
                department: "IT"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe("John Updated");
    });

    test("DELETE /employees/1 should delete employee", async () => {
        const response = await request(app)
            .delete("/employees/1");

        expect(response.statusCode).toBe(200);
        expect(response.body.message)
            .toBe("Employee deleted successfully");
    });

});