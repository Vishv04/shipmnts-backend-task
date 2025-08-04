import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnect } from "./config/mongodb.js";

import sampleRoute from "./routes/sampleRoute.js";

// Configure env
dotenv.config();

const app = express();

// Database connection
dbConnect();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", sampleRoute);

app.get("/", (req, res) => {
  return res.json({
      success: true,
      message: "server is running"
  })
})

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});

export default app;
