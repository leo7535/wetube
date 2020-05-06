import Video from "../models/Video";
import Comment from "../models/Comment";
import routes from "../routes";
import { compileClientWithDependenciesTracked } from "pug";

//async는 javascript의 비동기 방식 처리를 동기 방식 처리로 바꿔준다.
//즉, 실행순서를 기다려주게 함
export const home = async (req, res) => {
  //try catch 구문으로 하지 않으면 에러가 생기면 에러가 생긴채로 끝난뒤 render를 실행하기 때문에
  try {
    // 비디오를 전부 찾을때 까지 기다린다
    // _id:-1로 하는 이유는 위아래 순서를 바꿔서 sort정렬하겠다는 것이다
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};
export const search = async (req, res) => {
  //const searchingBy = req.query.term;
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      // i는 insensitive , 대소문자 구분을 하지 않을 정도의 덜 민감함
      title: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
}; //video search

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const postUpload = async (req, res) => {
  //Upload Video and Save
  //const title, description = req.body;
  //const path = req.file
  const {
    body: { title, description },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    path: path.replace(/\\/g, "/"),
  });
  console.log(path);
  console.log(newVideo);

  res.redirect(routes.videoDetail(newVideo.id));
};

// Video Detail
export const videoDetail = async (req, res) => {
  //const id = req.params
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("videoDetail", { pageTitle: video.title, video: video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

// Edit Video
export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const video = await Video.findById(id);
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video: video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;

  //findOneAndUpdate({id},{title,description}) 이라고 하면 수정되지 않음 이유는 몰라
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

// Delete Video
export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;

  // _id:id 로 해주는 이유는 mongoDB 내장 객체에 _id라는 key 값이 저장되있어서 그곳으로 저장
  try {
    await Video.findByIdAndRemove({ _id: id });
    console.log(`Video ID : ${id} is Deleted.`);
  } catch (error) {}
  res.redirect(routes.home);

  res.render("deleteVideo", { pageTitle: "Delete Video" });
};
