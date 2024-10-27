import mongoose from "mongoose";

const connectDB = () => mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected!'))
    .catch((e) => console.log(`error occurred ${e}`));

export default connectDB;