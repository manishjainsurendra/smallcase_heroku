if (process.env.NODE_ENV !== "production") require("dotenv").config();
const config = require("config");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// custome middleware
const serverResponse = require("./middlewares/serverResponse");

// routes
const routes = require("./routes/");

// express app config
const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_CONNECTION_STRING = config.get("db").get("connection-string");
if (!MONGODB_CONNECTION_STRING)
  throw new Error("mongodb connection url not found!");

// middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(serverResponse());

// routes
app.use("/api", routes);

// starting server
mongoose
  .connect(MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => app.listen(PORT, () => console.log("server started on ", PORT)))
  .catch(err => console.log(err));
