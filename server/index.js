import express from "express";
import dotenv from "dotenv/config";
import mongoDBConnect from "./mongoDB/connection.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";
// dotenv.config({ path: "./.env" });
const app = express();
const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsConfig));
app.use("/", userRoutes);
app.use("/api/chat/", chatRoutes);
mongoose.set("strictQuery", false);
mongoDBConnect();
app.listen(process.env.PORT, () => {
  console.log(`Server Listening at PORT - ${process.env.PORT}`);
});
