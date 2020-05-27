import routes from "./routes";
import multer from "multer";

//입력한 파일,데이터(업로드한 비디오)가 uploads/videos 디렉토리에 들어간다
const multerVideo = multer({ dest: "uploads/videos/" });

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null; //user가 존재하지않으면 빈 object를 준다.
  console.log(req.user); //로그인을 하고난 뒤에야 req.user 오브젝트로 만들어주는것이다.
  next(); //middelWare가 connection과 route 사이에 있으므로
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    //req.user가 존재하면(사용자가 로그인상태라면) join화면에 들어가려고 해도 다시 home으로 돌려보냄
    res.redirect(routes.home);
  } else {
    //req.user가 존재하지 않으면
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};
//upload.pug의 form파일에서 name="videoFile"인 파일을 하나 받겠다는 뜻
//videoRouter에서 import 해서 사용
export const uploadVideo = multerVideo.single("videoFile");
