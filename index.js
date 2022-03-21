const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const app = express();

let port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`Running in PORT: ${port}, go to http://localhost:${port}`);
});
