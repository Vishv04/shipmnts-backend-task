import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema({
    shipment_number: {
        type: String,
        required: true,
        unique: true
    },
    hops: {
        type: [String]
    },
    flights: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Flight',
        default: []
    }
});

const Shipments = mongoose.model("Shipments", shipmentSchema);

export default Shipments;