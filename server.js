const mongoose = require("mongoose");
const app = require("./app");

// const { route } = require('./routes/api/contacts')

const DB_HOST =
  "mongodb+srv://Mango:Mango1@cluster0.uipvxuo.mongodb.net/contacts_reader?retryWrites=true&w=majority";
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful")
    app.listen(3000); 
  }) // запустили веб сервер наш
  .catch((er) => {
    console.log(er.message);
    process.exit(1);
  });





