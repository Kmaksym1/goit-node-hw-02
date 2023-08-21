const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const router = require("./routes/api/contacts");

const app = express(); // app - web server

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.set('view engine', 'ejs');
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); // для методу POST перевіряє чи є тілоб якщо є тіло -
// перетворює строку на об'єкт

app.use("/api/contacts", router);


app.use((req, res) => {
  res.status(404).json({ message: "Not found!" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
