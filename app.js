const express = require("express");
const noteRoutes = require("./routes/notes.routes");
const app = express();
// const mongodb = require("./mongodb/mongodb.connect");

// mongodb.connect();

app.use(express.json());

app.use("/note", noteRoutes);

app.use((error, req, res, next) =>
{
    res.status(500).json({ message: error.message });
});

app.get("/", (req, res) =>
{
    res.json("Hello world!");
});

module.exports = app;