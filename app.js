require("dotenv").config();
const http = require("http");
const app = require("./index");
const db = require("./db");
const normalizePort = require("normalize-port");

db.connect();

const PORT = normalizePort(process.env.PORT || "3000");

http.createServer(app).listen(PORT, () => {
  console.log(`Server started at port : ${PORT}`);
});