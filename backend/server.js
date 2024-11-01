import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import productsRouter from './routers/productsRouter.js'
import usersRouter from './routers/usersRouter.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();

const port = process.env.PORT;
const app = express();

app.use(cors({ origin: process.env.FRONTEND_URI }));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

app.use("/products", productsRouter);
app.use("/users", usersRouter);

app.get("/", (req, res) => {
    res.send("Running, Enter to <a href=http://localhost:5000/products>http://localhost:5000/products</a>");
})

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Backend server is running on port ${port}`))