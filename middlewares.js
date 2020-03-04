import routes from "./routes";
import multer from "multer";

const multerVideo = multer({ dest: "upload/videos/" });

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1
  };
  next(); //middelWare가 connection과 route 사이에 있으므로
};

export const uploadVideo = multerVideo.single("videoFile");
