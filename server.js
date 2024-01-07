import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

const app = express();
const serverPort = process.env.SERVER_PORT || 5001;

// database connection
mongoose
  .connect(process.env.MONGODB_ALIAS_URI)
  .then(() => {
    console.log("Db is connected");
  })
  .catch((error) => {
    console.log("Db connection error" + error);
  });

// middlewares
app.use(express.json());
app.use(cors());

// server running
app.listen(serverPort, () => {
  console.log(`Server running at http://localhost:${serverPort}`);
});
