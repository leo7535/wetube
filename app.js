import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { localMiddleware } from "./middlewares";
import userRouter from "./routers/userRouter"; //default로 export하지 않았을 때에는 이렇게
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import passport from "passport";
import session from "express-session";

import "./passport";

const app = express();

console.log(process.env.COOKIE_SECRET);

app.use(helmet());
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
//누군가 /static으로 접근하려하면 static폴더로 가게한다.
app.use("/static", express.static("static"));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    //초기화 되지 않은 정보 저장
    saveUninitialized: false
  })
);
app.use(passport.initialize()); //passport 초기화
app.use(passport.session()); //session을 저장시켜준다, 쿠키를 사용하기위해 필요하다.

// /uploads로 가면 uploads라는 디렉토리 안으로 들어가게 된다.
app.use(localMiddleware);

//Router
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app; //누군가 app파일을 import 할 때 app object를 주겠다는 의미
