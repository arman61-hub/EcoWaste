import mongoose from "mongoose";

const funFactSchema = new mongoose.Schema({
    fact: { type: String, required: true },
});

const funFactModel = mongoose.models.funFact || mongoose.model("funFact", funFactSchema);

export default funFactModel;
