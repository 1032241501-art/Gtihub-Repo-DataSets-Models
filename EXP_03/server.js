
const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.json());
app.use(express.static("public"));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "AcGore1995@2020",
    database: "wad_lab"
});

db.query(`
    CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50),
        email VARCHAR(100)
    )
`);

app.get("/students", (req, res) => {
    db.query("SELECT * FROM students", (e, r) => {
        res.json(r);
    });
});

app.post("/students", (req, res) => {
    db.query(
        "INSERT INTO students(name, email) VALUES(?, ?)",
        [req.body.name, req.body.email],
        e => res.send(e ? "Error" : "Student added")
    );
});

app.put("/students/:id", (req, res) => {
    db.query(
        "UPDATE students SET name=?, email=? WHERE id=?",
        [req.body.name, req.body.email, req.params.id],
        e => res.send(e ? "Error" : "Student updated")
    );
});

app.delete("/students/:id", (req, res) => {
    db.query(
        "DELETE FROM students WHERE id=?",
        [req.params.id],
        e => res.send(e ? "Error" : "Student deleted")
    );
});

app.listen(3003, () => {
    console.log("http://localhost:3003");
});
