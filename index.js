import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import LetterTypeRoute from "./routes/LetterTypeRoute.js";
import LetterRequestRoute from "./routes/LetterRequestRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
// import db from "./config/Database.js";
dotenv.config();

// (async () => {
//   await db.sync();
// })();

const app = express();
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: "auto",
    },
  })
);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(UserRoute);
app.use(LetterTypeRoute);
app.use(LetterRequestRoute);
app.use(AuthRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running ...");
});
