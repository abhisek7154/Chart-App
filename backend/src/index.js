import express from "express";

import dotenv from "dotenv"

import {connectDB} from "./lib/db.js";
import authRouts from "./routes/auth.route.js"


dotenv.config();
const app = express();

const PORT = process.env.PORT

app.use(express.json()); // allow you to extract the json data ..


app.use("/api/auth" , authRouts);

app.listen(PORT , () => {
    console.log("Server is live on PORT: " + PORT);
    connectDB()
})