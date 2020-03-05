import Video from "../models/Video";
import Comment from "../models/Comment";
import routes from "../routes";

//async는 javascript의 비동기 방식 처리를 동기 방식 처리로 바꿔준다.
//즉, 실행순서를 기다려주게 함
export const home = async (req, res) => {
  //try catch 구문으로 하지 않으면 에러가 생기면 에러가 생긴채로 끝난뒤 render를 실행하기 때문에
  try {
    const videos = await Video.find({}); // 비디오를 전부 찾을때 까지 기다린다
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};
export const search = (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;

  res.render("search", { pageTitle: "Search", searchingBy, videos });
}; //video search

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const postUpload = async (req, res) => {
  //Upload Video and Save
  const {
    body: { title, description },
    file: { path }
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    path: path.replace(/\\/g, "/")
  });
  console.log(path);
  console.log(newVideo);

  res.redirect(routes.videoDetail(newVideo.id));
};
export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });
export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
