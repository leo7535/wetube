import express from "express";
import routes from "../routes";
import {
  users,
  userDetail,
  editProfile,
  changePassword
} from "../controllers/userController"; //pug랑 rendering 시켜주는 함수들
export const userRouter = express.Router();

userRouter.get(routes.users, users);
userRouter.get(routes.editProfile, editProfile); //순서 중요
userRouter.get(routes.changePassword, changePassword); //순서 중요
userRouter.get(routes.userDetail, userDetail); //순서 중요

export default userRouter;
