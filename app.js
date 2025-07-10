import express from "express";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

app.use(express.json());
app.use("/", taskRoutes);

export default app;
