import express, { urlencoded } from "express";
const app = express();
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4002;

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello from the backend server!");
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
