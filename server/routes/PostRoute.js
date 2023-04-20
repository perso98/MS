import { Router } from "express";
import postController from "../controllers/postController.js";
const router = Router();
router.post("/", postController.createPost);
router.get("/:search/:skip", postController.findPost);
router.get("/posts/:id/:skip", postController.posts);

export default router;
