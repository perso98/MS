import { Router } from "express";
import postController from "../controllers/postController.js";
const router = Router();

router
  .route("/")
  .post(postController.createPost)
  .put(postController.updatePost);

router.route("/like").post(postController.like);

router.route("/:search/:limit/:jump").get(postController.findPost);

router.route("/:id").get(postController.post).delete(postController.deletePost);

router.route("/posts/:id/:limit/:jump").get(postController.userPosts);

router.route("/follows/posts/:limit/:jump").get(postController.followsPosts);

export default router;
