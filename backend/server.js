import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import productsRoutes from './routes/productsRoutes.js'
import usersRoutes from './routes/usersRoutes.js'
import ordersRoutes from './routes/ordersRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { ORDERS_URL, PAYPAL_URL, PRODUCTS_URL, USERS_URL } from '../frontend/src/constants.js';

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

app.get(PAYPAL_URL, (req, res) =>
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

app.get("/", (req, res) => {
    res.send("Running, Enter to <a href=http://localhost:5000/products>http://localhost:5000/products</a>");
})

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => console.log(`Backend server is running on port ${port}`))