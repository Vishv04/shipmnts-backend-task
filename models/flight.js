import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
    flight_number: {
        type: String,
        unique: true,
        required: true
    },
    carrier: {
        type: String
    },
    from: {
        type: String
    },
    to: {
        type: String
    },
    departure: {
        type: Date,
        default: Date.now()
    },
    arrival: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        enum: ["in-transit", "landed", "completed"],
        default : "in-transit"
    }
});

const Flight = mongoose.model("Flight", flightSchema);

export default Flight;