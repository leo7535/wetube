import express from "express";
import routes from "../routes";
import {
  users,
  userDetail,
  editProfile,
  changePassword
} from "../controllers/userController";
export const userRouter = express.Router();

userRouter.get("/", users);
userRouter.get(routes.editProfile, editProfile); //순서 중요
userRouter.get(routes.changePassword, changePassword); //순서 중요
userRouter.get(routes.userDetail, userDetail); //순서 중요

export default userRouter;
