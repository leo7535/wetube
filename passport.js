import passport from "passport";
import User from "./models/User";
import githubStrategy from "passport-github";
import { githubLoginCallback } from "./controllers/userController";

//원래는 복잡한 코드를 한줄로 끝냄
passport.use(User.createStrategy());

passport.use(
  new githubStrategy({
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: "http://localhost:3000/auth/github/callback",
  }),
  githubLoginCallback
);

passport.serializeUser(User.serializeUser()); //쿠키에 정보를 넘길 것 : id
passport.deserializeUser(User.deserializeUser()); //그 id를 보고 어떻게 사용자를 찾을것인가
