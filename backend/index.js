import express from "express";
import router from "./routes/Users.js";
import handleCon from "./connect.js";
import cors from "cors";
import cookieParser from "cookie-parser";

//Usually loaded at starting
import dotenv from "dotenv";
dotenv.config();

//Create app
const app = express();

// Connect to MongoDB
handleCon("mongodb://127.0.0.1:27017/auth");

//Middlewares

app.use(express.json()); // Body Parsing Middleware

app.use(cookieParser()); // Cookie Parsing Middleware

// CORS Middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use("/auth", router); // Router Middleware

app.listen(process.env.PORT, () => {
  console.log("http://localhost:" + process.env.PORT);
});
