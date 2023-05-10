import { Router } from "express";
import userController from "../controllers/userController.js";
const router = Router();

//auth routers
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

router.post("/follow", userController.follow);
router.get("/get-user/:id", userController.getUser);
router.get("/auth", userController.auth);
router.get("/:search/:skip", userController.findUser);
router.get(
  "/get-followers-or-follows/:type/:id/:skip",
  userController.getFollowsOrFollowers
);
export default router;
