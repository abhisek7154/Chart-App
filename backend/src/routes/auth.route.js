import expess from "express";
import { login, logout, signup } from "../controllers/auth.controllers.js";



const router = expess.Router();

router.post("/Signup", signup);

router.post("/login", login);

router.post("/logout" , logout);

export default router;