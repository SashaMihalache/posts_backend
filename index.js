const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const session = require("express-session");
const redis = require("redis");
let RedisStore = require("connect-redis")(session);
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");

async function init() {
  let redisClient = redis.createClient({
    url: `redis://${REDIS_URL}:${REDIS_PORT}`,
    legacyMode: true,
  });

  try {
    await redisClient.connect();
    console.log("======Redis connected======");
  } catch (error) {
    console.log("Redis error:", e);
  }

  const app = express();

  const postRouter = require("./routes/postRoutes");
  const userRouter = require("./routes/userRoutes");

  const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

  const connectWithRetry = () => {
    mongoose
      .connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("=======Successfully connected to the Database.=======");
      })
      .catch((e) => {
        console.log(e);
        setTimeout(connectWithRetry, 5000);
      });
  };

  connectWithRetry();

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: SESSION_SECRET,
      cookie: {
        secure: false,
        resave: false,
        saveUnititialized: false,
        httpOnly: true,
        maxAge: 60_000,
      },
    })
  );

  app.use(express.json());
  app.use(morgan("tiny"));

  app.get("/", (req, res) => {
    res.send("<h2>Hello World</h2>");
  });

  app.use("/api/v1/posts", postRouter);
  app.use("/api/v1/users", userRouter);

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`=======Server is running on port ${port}========`);
  });
}

init();
