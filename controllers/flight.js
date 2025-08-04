import Flight from "../models/flight.js";
import Shipments from "../models/shipment.js";

export const addFlightInfo = async (req, res) => {
    const {carrier, from, to, flight_number, departure, arrival} = req.body;
    const {shipment_number} = req.params;

    const isExistShipment = await Shipments.findOne({shipment_number});

    if(!isExistShipment){
        return res.status(404).json({
            success: false,
            message: "Shipment not found"
        })
    }

    const len = isExistShipment.hops.length;
    let match = "not";

    for( let i=0; i<len-1; i++){
        if((isExistShipment.hops[i] === from && isExistShipment.hops[i+1] === to)){
            match = "found";
            break;
        }
    }

    if(match !== "found"){
        return res.status(400).json({
            success: false,
            message: "Unable to add a flight. The 'from' and 'to' locations are not consecutive hops for this shipment."
        })
    }

    const flight = await Flight.create({
        carrier,
        flight_number,
        from,
        to,
        departure,
        arrival,
        status: "in-transit"
    })

    await isExistShipment.flights.push(flight._id);
    isExistShipment.save();

    return res.status(200).json({
        success: true,
        message: "Flight information added successfully.",
        data:{
            shipment_number,
            flight
        }
    })

}

export const changeStatus = async (req, res) => {
    const {flight_number} = req.params;
    const {status} = req.body;

    const isFlight = await Flight.findOne({flight_number});

    if(!isFlight){
        return res.status(404).json({
            success: false,
            message: "Flight not found"
        })
    }

    const updatedFLight = await Flight.findOneAndUpdate(
        {flight_number},
        {status},
        {new: true}
    )

    return res.status(200).json({
        success: true,
        message: "Flight status updated successfully.",
        data: updatedFLight
    })
}

export const getFlight = async (req, res) => {
    const {carrier, start_date, end_date} = req.query;

    if(!carrier || !start_date || !end_date ){
        return res.status(400).json(
            {
                "success": false,
                "message": "Required query parameters 'carrier', 'start_date', and 'end_date' must be provided."
            }
              
        )
    }

    
}