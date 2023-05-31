import { Router } from "express";
import commentController from "../controllers/commentController.js";
const router = Router();
router.get("/:id/:limit/:jump", commentController.getComments);
router.delete("/:postId/:commentId", commentController.deleteComment);
router.post("/", commentController.createComment);
router.put("/:id", commentController.like);
export default router;
