import express, { urlencoded } from "express";
const app = express();
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
const PORT = process.env.PORT || 4002;

app.use(express.json());
app.use(urlencoded({ extended: true }));
connectDB();

app.get("/", (req, res) => {
  res.send("Hello from the backend server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
