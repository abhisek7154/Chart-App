import expess from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";



const router = expess.Router();

router.post("/Signup", signup);

router.post("/login", login);

router.post("/logout" , logout);

router.put("/update-profile" , protectRoute , updateProfile)

router.get("/check" ,protectRoute , checkAuth )
export default router;