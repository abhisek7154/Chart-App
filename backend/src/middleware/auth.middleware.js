import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req , res , next) => {
    try{

        // User auth

        const token = req.cookies.jwt;

        if (!token){
            return res.status(401).json({message:"unauthorized - No token provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({message:"unauthorized - Invalid Token"})
        }

        const user = await User.findById(decoded.userID).select("-password");
        
        if(!user){
            return res.status(401).json({message: "User not found"})
        }

        req.user = user

        next()


    } catch (error){

        console.log("Error in protectRoute moiddleware: " , error.message);
        res.status(500).json({message: "Internal error"});
    }
}