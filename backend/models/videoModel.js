import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
});

const videoModel = mongoose.models.video || mongoose.model("video", videoSchema);

export default videoModel;
