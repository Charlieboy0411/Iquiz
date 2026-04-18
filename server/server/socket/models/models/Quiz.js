import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: String,
  questions: Array,
  createdBy: String,
});

export default mongoose.model("Quiz", schema);
