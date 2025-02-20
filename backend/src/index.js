import express from "express";

import dotenv from "dotenv"

import cookieparser from "cookie-parser"

import {connectDB} from "./lib/db.js";
import authRouts from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import cors from "cors" 

dotenv.config();
const app = express();

const PORT = process.env.PORT

app.use(express.json()); // allow you to extract the json data ..
app.use(cookieparser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use("/api/auth" , authRouts);
app.use("/api/message", messageRoutes);

app.listen(PORT , () => {
    console.log("Server is live on PORT: " + PORT);
    connectDB()
})