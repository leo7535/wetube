import express from "express";
import routes from "../routes";
import passport from "passport";
import { home, search } from "../controllers/videoController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  githubLogin,
  githubLoginCallback,
  postGithubLogin,
  getMe,
} from "../controllers/userController";
import { onlyPublic } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.home, home); //경로, 함수
globalRouter.get(routes.search, search);

globalRouter.get(routes.join, onlyPublic, getJoin);
// postJoin을 미들웨어 역할을 하게하고 next에 postLogin이 온다
// 왜냐하면 회원가입을 완료하면 자동으로 로그인이 되도록 설정하고 싶어서
// 즉, 회원가입 창에서 email과 password를 넣으면 postLogin애개 정보를 준다. 마치 form을 통해 전달하듯이
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);
globalRouter.get(routes.logout, logout);

//누군가 /auth/github로 들어간다면 githubLogin을 써서 인증한다.
globalRouter.get(routes.github, githubLogin); // auth/github 주소로 들어가는데 우리를 깃허브에 인증받도록 웹사이트로 보내준다.
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", {
    failureRedirect: "/login",
  }),
  postGithubLogin
); // auth/github/callback

globalRouter.get(routes.me, getMe);

export default globalRouter;
