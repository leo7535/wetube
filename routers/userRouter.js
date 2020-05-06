//로직이 담긴 함수들을 uri를 요청하면 호출이 될수 있게끔 라우터를 만든다.
import express from "express";
import routes from "../routes";
import {
  users,
  userDetail,
  editProfile,
  changePassword,
} from "../controllers/userController"; //pug랑 rendering 시켜주는 함수들
import { onlyPrivate } from "../middlewares";
export const userRouter = express.Router();

userRouter.get(routes.users, users);

userRouter.get(routes.editProfile, onlyPrivate, editProfile); //순서 중요
userRouter.get(routes.changePassword, onlyPrivate, changePassword); //순서 중요
userRouter.get(routes.userDetail(), userDetail); //순서 중요

export default userRouter;
