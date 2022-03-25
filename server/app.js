const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const coockeParser = require("cookie-parser");
let RedisStore = require("connect-redis")(session);
require("express-async-errors");

const errorHandler = require("./middlewares/errorHandler");

const userRouter = require("./routes/user.router");
const todoRouter = require("./routes/todo.router");
const statusRouter = require("./routes/status.router");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3002"],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE"],
    credentials: true,
  })
);

const { createClient } = require("redis");
let redisClient = createClient({
  url: process.env.REDIS_HOST,
  legacyMode: true,
});
redisClient.connect().catch(console.error);

app.use(coockeParser());
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "it is a secret...",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 30,
    },
  })
);

app.use(express.json());
app.use(morgan("dev"));

app.use("/users", userRouter);
app.use("/todos", todoRouter);
app.use("/statuses", statusRouter);

app.use(errorHandler);

const port = process.env.PORT;
const appListen = app.listen(port, () => {
  console.log(`To Do server running on port: ${port} `);
});

module.exports = { app: appListen, redisClient };
