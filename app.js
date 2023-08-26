const express = require("express");
const logger = require("morgan");
const cors = require("cors");

// const passport = require('passport');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');

const userRouter = require("./routes/api/user");
const contactsRouter = require("./routes/api/contacts");
const { renderMainPage, renderRegisterPage, registerController, renderLoginPage } = require("./controllers/auth");

const app = express(); // app - web server

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.set('view engine', 'ejs');
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); // для методу POST перевіряє чи є тілоб якщо є тіло -
// перетворює строку на об'єкт
app.use(express.urlencoded({ extended: true }));
app.get('/', renderMainPage);
app.get('/register', renderRegisterPage);
app.post('/register', registerController);

// app.use(session({
//   secret: SECRET,
//   cookie: {
//       path: '/',
//       httpOnly: true,
//       maxAge: 20000
//       // maxAge: 7200000 // 2h
//   },
//   resave: false,
//   saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());

app.get('/login', renderLoginPage);

// app.get('/logout', logoutController);
app.use("/api/user", userRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found!" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
