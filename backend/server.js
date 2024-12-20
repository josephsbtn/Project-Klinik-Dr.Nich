import express from "express";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import layananRoutes from "./routes/admin/layananRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dbConfig from "./config/db.js";

const app = express();
dotenv.config();
dbConfig();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/layanan", layananRoutes);
app.use("/api/users", userRoutes);
app.get("/", (req, res) => res.send("Server is ready"));
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
