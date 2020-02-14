import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { userRouter } from "./router1"; //default로 export하지 않았을 때에는 이렇게

const app = express();

const serverHome = (req, res) => res.send("Hello World !");
const serverProfile = (req, res) => res.send("My Profile ");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());

app.get("/", serverHome);
app.get("/profile", serverProfile);
app.use("/user", userRouter); // user경로에 접속하면 이 router 전체를 사용하겠다는 의미

export default app; //누군가 app파일을 import 할 때 app object를 주겠다는 의미
