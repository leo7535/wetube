// 여러가지 로직이 있는 함수들의 기능들을 정의하고 선언
import routes from "../routes";
import User from "../models/User";
import passport from "passport";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      //Middleware.js에서 req.user
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

//authenticate는 사용자의 username(여기선 email), password를 찾아보도록 되있고, 찾은 다음에는 req.user라는 오브젝트로 만들어준다.
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login, //로그인에 실패하면
  successRedirect: routes.home, //로그인에 성공하면
  //failureFlash: true,
  //successFlash: true,
});

export const githubLogin = passport.authenticate;

export const githubLoginCallback = (accessToken, refreshToken, profile, cb) => {
  console.log(accessToken, refreshToken, profile, cb);
}; //github에 갔다가 다시 돌아오는 과정의 함수

export const logout = (req, res) => {
  //To Do: Process Log Out
  req.logout();
  res.redirect(routes.home);
};
export const users = (req, res) => res.render("users", { pageTitle: "Users" });
export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
