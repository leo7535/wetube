import mongoose from "mongoose";

const CommentShema = new mongoose.Schema({
  text: {
    type: String,
    required: "Text is Required"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

  // Comment에 Video의 id를 집어넣는 방식
  //   video:{
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref:"Video"
  //   }
});

const model = mongoose.model("Comment", CommentShema);
export default model;
