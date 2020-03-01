import { videos } from "../db";
import routes from "../routes";

export const home = (req, res) => {
  res.render("home", { pageTitle: "Home", videos });
};
export const search = (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;

  res.render("search", { pageTitle: "Search", searchingBy, videos });
}; //video search

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const postUpload = (req, res) => {
  //Upload Video and Save
  const {
    body: { file, title, description }
  } = req;

  res.redirect(routes.videoDetail(112));
};
export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });
export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
