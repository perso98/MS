import { Router } from "express";
import postController from "../controllers/postController.js";
const router = Router();
router.post("/create-post", postController.createPost);
router.get("/find-all-user-posts", postController.findAllUserPosts);
export default router;
