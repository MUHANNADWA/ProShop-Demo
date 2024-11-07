import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import connectDB from "./config/db.js";
import productsRoutes from "./routes/productsRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import {
  ORDERS_URL,
  PAYPAL_URL,
  PRODUCTS_URL,
  USERS_URL,
  UPLOAD_URL,
} from "../frontend/src/constants.js";

dotenv.config();
connectDB();

const port = process.env.PORT;
const app = express();

app.use(cors({ credentials: true, origin: process.env.FRONTEND_URI }));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

app.use(PRODUCTS_URL, productsRoutes);
app.use(USERS_URL, usersRoutes);
app.use(ORDERS_URL, ordersRoutes);
app.use(UPLOAD_URL, uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get(PAYPAL_URL, (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);
app.listen(port, () =>
  console.log(`Backend server is running on port ${port}`)
);
