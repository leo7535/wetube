import passport from "passport";
import routes from "./routes";
import User from "./models/User";
import githubStrategy from "passport-github";
import { githubLoginCallback } from "./controllers/userController";

//원래는 복잡한 코드를 한줄로 끝냄
passport.use(User.createStrategy());

passport.use(
  //passport.authenticate('github')를 실행하면 여기서 strategy를 사용하게 된다.
  new githubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:3000${routes.githubCallback}`, // http://localhost:3000/auth/github/callback
    },
    githubLoginCallback
  )
  //사용자가 github를 통한 인증이 완료되면 사용자는 callbackURL로 돌아오게 된다.
  // 즉. 사용자 정보를 얻은 뒤 callbackURL로 접근한다.
);

passport.serializeUser(User.serializeUser()); //쿠키에 정보를 넘길 것 : id
passport.deserializeUser(User.deserializeUser()); //그 id를 보고 어떻게 사용자를 찾을것인가
//웹 페이지를 옮겨다닐 때마다 사용자를 식별해줌
