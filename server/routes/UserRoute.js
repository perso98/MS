import { Router } from "express";
import userController from "../controllers/userController.js";
const router = Router();

//auth routers
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/auth", userController.auth);
router.get("/:search/:skip", userController.findUser);
export default router;
