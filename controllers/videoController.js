import Video from "../models/Video";
import routes from "../routes";

export const home = async (req, res) => {
  //try catch 구문으로 하지 않으면 에러가 생기면 에러가 생긴채로 끝난뒤 render를 실행하기 때문에
  try {
    const movies = await Video.find({});
    res.render("home", { pageTitle: "Home", movies });
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
  const newVideo = await Video.create({ fileUrl: path, title, description });

  console.log(newVideo);

  res.redirect(routes.videoDetail(newVideo.id));
};
export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });
export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
