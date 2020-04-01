import passport from "passport";
import User from "./models/User";

//원래는 복잡한 코드를 한줄로 끝냄
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser()); //쿠키에 정보를 넘길 것 : id
passport.deserializeUser(User.deserializeUser()); //그 id를 보고 어떻게 사용자를 찾을것인가
