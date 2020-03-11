import routes from "./routes";
import multer from "multer";

//입력한 파일,데이터가 uploads/videos 디렉토리에 들어간다
const multerVideo = multer({ dest: "uploads/videos/" });

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1
  };
  next(); //middelWare가 connection과 route 사이에 있으므로
};

//upload.pug의 form파일에서 name="videoFile"인 파일을 하나 받겠다는 뜻
//videoRouter에서 import 해서 사용
export const uploadVideo = multerVideo.single("videoFile");
