const express = require("express");
const { DatabaseSync } = require("node:sqlite");
const app = express();
app.use(express.urlencoded({ extended: false }));
const db = new DatabaseSync("blog.db");
db.exec(`
    CREATE TABLE IF NOT EXISTS blogs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT
    )
`);
app.get("/", (req, res) => {
    res.send(`
        <h1>Blog Application</h1>
        <form action="/add" method="POST">
            <input
                type="text"
                name="title"
                placeholder="Enter blog title"
                required
            >
            <br><br>
            <textarea
                name="content"
                placeholder="Enter blog content"
                required
            ></textarea>
            <br><br>
            <button type="submit">Post</button>
        </form>
        <br>
        <a href="/blogs">View Blogs</a>
    `);
});
app.post("/add", (req, res) => {
    db.prepare(
        "INSERT INTO blogs(title, content) VALUES(?, ?)"
    ).run(req.body.title, req.body.content);

    res.redirect("/blogs");
});
app.get("/blogs", (req, res) => {
    const blogs = db.prepare("SELECT * FROM blogs").all();
    res.send(
        blogs.map(b => `
            <h3>${b.id}. ${escapeHtml(b.title)}</h3>

            <p>${escapeHtml(b.content)}</p>

            <a href="/delete/${b.id}">Delete</a>
            <hr>
        `).join("") || "No blogs yet"
    );
});
function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[c]);
}
app.get("/delete/:id", (req, res) => {
    db.prepare("DELETE FROM blogs WHERE id = ?")
        .run(+req.params.id);

    res.redirect("/blogs");
});
app.listen(3007, () => {
    console.log("http://localhost:3007");
});
