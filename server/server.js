import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config({ 
  path: process.env.NODE_ENV === 'test' ? '../.env.test' : '../.env' 
});

const app = express();
const FRONTEND_PORT = process.env.FRONTEND_PORT || 3000;
const PORT = process.env.PORT || 5001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mongoose
if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB at:", mongoose.connection.name))
    .catch((err) => console.error("Could not connect to MongoDB:", err));

  mongoose.set("debug", true);
}
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: `http://localhost:${FRONTEND_PORT}`,
    credentials: true,
  }),
);

app.use("/api", routes);

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from the back-end!" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export { app };
