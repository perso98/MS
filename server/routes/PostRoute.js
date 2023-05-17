import { Router } from "express";
import postController from "../controllers/postController.js";
const router = Router();

router
  .route("/")
  .post(postController.createPost)
  .put(postController.updatePost);

router.route("/like").post(postController.like);

router.route("/:search/:limit").get(postController.findPost);

router.route("/:id").get(postController.post).delete(postController.deletePost);

router.route("/posts/:id/:skip").get(postController.userPosts);

router.route("/follows/posts/:limit").get(postController.followsPosts);

export default router;
