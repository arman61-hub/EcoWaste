import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    category: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image : { type: String, required: true },
})

const reportModel = mongoose.models.report || mongoose.model('report', reportSchema)

export default reportModel; 