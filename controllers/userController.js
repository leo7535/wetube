// 여러가지 로직이 있는 함수들의 기능들을 정의하고 선언
import routes from "../routes";
import User from "../models/User";
import passport from "passport";
//--- 회원가입 ---
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
//--- 일반 로그인 ---
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });
//authenticate는 사용자의 username(여기선 email), password를 찾아보도록 되있고, 찾은 다음에는 req.user라는 오브젝트로 만들어준다.
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login, //로그인에 실패하면
  successRedirect: routes.home, //로그인에 성공하면
  //failureFlash: true,
  //successFlash: true,
});
//--- 깃허브 인증 방식 로그인 ---
export const githubLogin = passport.authenticate("github");
export const githubLoginCallback = async (_, __, profile, cb) => {
  //깃허브에서 사용자에게 깃허브의 정보를 넘겨줄 때 실행되는 함수
  const {
    _json: { id, avatar_url: avatarUrl, name, email }, //깃허브에서 가져온 정보들
  } = profile;
  try {
    const user = await User.findOne({ email }); //사용자의 email과 깃허브로부터 온 email이 동일한 사용자를 찾음
    if (user) {
      user.githubId = id; // 깃허브에서 가져온 id로 할당해준다.
      user.save();
      return cb(null, user); // 매개변수 1은 에러없음, 2는 user를 찾았습니다 의 내용
    } else {
      //깃허브의 이메일과 동일한 사용자가 없다면 ? => 새로 만들어줘서 신규가입 시켜준다.
      const newUser = await User.create({
        email,
        name,
        githubId: id,
        avatarUrl,
      });
      return cb(null, newUser);
    }
  } catch (error) {
    return cb(error);
  }
}; //github에 갔다가 다시 돌아오는 과정의 함수
export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};
//--- 로그아웃 ---
export const logout = (req, res) => {
  //To Do: Process Log Out
  req.logout(); // 편리한 기능인 passport가 쿠키등을 다 알아서 처리해준다.
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });
}; //여기서 req.user는 현재 로그인 된 사용자라는 것을 기억해라!!

//--- 그 외 나머지 기능들 ---
export const users = (req, res) => res.render("users", { pageTitle: "Users" });
export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
