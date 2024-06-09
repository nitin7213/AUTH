import express from "express";
import router from "./routes/user.routes.js";
import handleCon from "./connect.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create app
const app = express();

// Connect to MongoDB
handleCon(process.env.MONGO_URI);

// Middlewares
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
