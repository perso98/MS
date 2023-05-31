import { Router } from "express";
import commentController from "../controllers/commentController.js";
const router = Router();
router.get("/:id/:limit/:jump", commentController.getComments);
router.post("/", commentController.createComment);
export default router;
