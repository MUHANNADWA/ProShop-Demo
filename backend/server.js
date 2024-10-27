import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js';
import productsRouter from './routers/productsRouter.js'

dotenv.config();
connectDB();

const port = process.env.PORT;
const app = express();

app.use(cors({ origin: process.env.FRONTEND_URI }));
app.use(express.json());

app.use("/products", productsRouter);

app.get("/", (req, res) => {
    res.send("Running, Enter to <a href=http://localhost:5000/products>http://localhost:5000/products</a>");
})

app.listen(port, () => console.log(`server is running on port ${port}`))