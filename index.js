const express = require("express");
const app = express();
require("dotenv").config();

const connectDb = require("./db/connect");
const authRoute = require("./routes/auth.js");
const movieRoute = require("./routes/movie");

const port = process.env.PORT || 3001;
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handle");
const authentication = require("./middleware/auth");

const cors = require("cors");
const rateLimiter = require("express-rate-limit");
const xss = require("xss-clean");
const helmet = require("helmet");

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.set("trust proxy", 1);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/movie", authentication, movieRoute);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, (req, res) => {
      console.log("Your app is listening on port " + port);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
