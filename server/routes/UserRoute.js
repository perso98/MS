import { Router } from "express";
import authController from "../controllers/authController.js";
const router = Router();

//auth controller
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/auth", authController.auth);
export default router;
