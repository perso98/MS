import { Router } from "express";
import notificationController from "../controllers/notificationController.js";
const router = Router();
router.get("/", notificationController.newNotifications);
router.get("/full/notifications", notificationController.notifications);
export default router;
