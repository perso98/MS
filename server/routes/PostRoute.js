import { Router } from "express";
import postController from "../controllers/postController.js";
const router = Router();
router.post("/", postController.createPost);
router.get("/:skip", postController.findAllUserPosts);
router.get("/search/:search", postController.posts);
export default router;
