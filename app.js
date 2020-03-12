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

const app = express();

app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
//누군가 /static으로 접근하려하면 static폴더로 가게한다.
app.use("/static", express.static("static"));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());
// /uploads로 가면 uploads라는 디렉토리 안으로 들어가게 된다.
app.use(localMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app; //누군가 app파일을 import 할 때 app object를 주겠다는 의미
