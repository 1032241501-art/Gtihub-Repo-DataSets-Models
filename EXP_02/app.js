// npm init -y
// npm install express
// node app.js

const express = require("express");
const app = express();
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));
app.get("/hello", (req, res) => res.send("HTTP GET request successful!"));
app.listen(3002, () => console.log("http://localhost:3002"));