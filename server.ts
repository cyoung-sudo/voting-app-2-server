import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectToDatabase } from "./db/connection.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Connect to DB
connectToDatabase()
.then(() => {
  // Start server
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
})