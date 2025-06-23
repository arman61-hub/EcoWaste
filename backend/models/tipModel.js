import mongoose from "mongoose";

const tipSchema = new mongoose.Schema({
    tip: { type: String, required: true },
});

const tipModel = mongoose.models.tip || mongoose.model("tip", tipSchema);

export default tipModel;
