import { Router } from "express";
import postController from "../controllers/postController.js";
const router = Router();
router.post("/", postController.createPost);
router.post("/like", postController.like);
router.get("/:search/:skip", postController.findPost);
router.get("/:id", postController.post);
router.get("/posts/:id/:skip", postController.posts);

export default router;
