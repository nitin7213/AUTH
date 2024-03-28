import express from "express";
import router from "./routes/Users.js";
import handleCon from "./connect.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

//Create app
const app = express();

//Mongo Connection
handleCon("mongodb://127.0.0.1:27017/auth");

//middlewares
app.use(express.json());
app.use(cors());
app.use("/auth", router);

app.listen(process.env.PORT, () => {
  console.log("http://localhost:" + process.env.PORT);
});
