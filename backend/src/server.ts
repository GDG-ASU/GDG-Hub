// src/server.ts
import express from 'express';
import sequelize from "./database/db";
import postRoutes from "./routes/postRoutes";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();

declare global {
  namespace Express {
    interface Request {
      userId: number
    }
  }
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

// Sync the database and start the server
const startServer = async () => {
  try {
    await sequelize.sync();
    console.log("Database synced successfully");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

startServer();
