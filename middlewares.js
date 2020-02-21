import routes from "./routes";

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  next(); //middelWare가 connection과 route 사이에 있으므로
};
