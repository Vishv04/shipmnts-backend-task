import mongoose from "mongoose";

const sampleSchema = new mongoose.Schema({
    sample1: {
        type: String,
        required: true,
    }
});

const Sample = mongoose.model("Sample", sampleSchema);

export default Sample;