
import bcrypt from "bcryptjs"
import User from "../models/user.model.js";
import { generateToken } from "../lib/utlis.js";
import { response } from "express";

export const signup = async (req, res) => {
    const {fullName , password , email} =  req.body
    try{

        if (!fullName || !email || !password){
            return res.status(400).json({message: "All feilds are required"})
        }

        if (password.length < 6) {
            return res.status(400).json({message: "password must be 6 characters"});

        }

        const user = await User.findOne({ email })

        if (user) return res.status(400).json({message: "Email alrady exits"})
        
        // Hash password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User ({
            fullName,
            email,
            password:hashedPassword
        })

        if(newUser){

            // generate jwt here

            generateToken(newUser._id, res)
            await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic: newUser.profilePic,
            });


        } else {
            res.status(400).json({ message: "Invalid user data"});
        }

    } catch (error){
        console.log("Error in signup controller" , error.message);
        res.status(500).json({message: "Internal server Error"});
    }
}

export const login = async (req, res) => {

    const { email , password } = req.body
    try{

        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message:"invalid credintials"})
        }

        const isPsaawordCorrect = await bcrypt.compare(password , user.password)
        if(!isPsaawordCorrect){
            return res.status(400).json({message:"invalid password"});
        }

        generateToken(user._id,res)

        res.status(200).json({
            _id:User._id,
            fullName:User.fullName,
            email:User.email,
            profilePic: User.profilePic,
        });
    } catch (error){

        console.log("Error in login controller" , )
    }



}

export const logout = (req, res) => {
    res.send("logout route");
}
