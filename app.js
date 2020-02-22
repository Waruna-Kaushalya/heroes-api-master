const express = require("express");
const mongoose = require("mongoose")
const authentication = require("./middleware/authenticator");
const emailjob = require("./middleware/emailsender");
const cors = require("cors");

const heroes = require("./routes/heroes");
const home = require("./routes/home");

const app = express();
app.use(cors());
mongoose.connect("mongodb://localhost/herodb",{
useNewUrlParser: true});

app.use(express.json());
app.use(emailjob);
app.use(authentication);
app.use("/", home);
app.use("/api/heroes", heroes); // custom middleware

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`);
});
