import Flight from "../models/flight.js";
import Shipments from "../models/shipment.js";

export const createShipment = async (req, res) => {
    const { origin, destination, shipment_number } = req.body;
    
    if(!origin || !destination || !shipment_number){
        return res.status(404).json({
            success: false,
            message: "required fields missing"
        })
    }

    const hops = [ origin, destination ];

    const isExist = await Shipments.findOne({shipment_number});

    if(isExist){
        return res.status(400).json({
            success: false,
            message: "Shipment number exist"
        })
    }

    const createdShipment = await Shipments.create({
        shipment_number,
        hops
    })

    return res.status(201).json({
        success: true,
        message: "Shipment created successfully",
        data: createdShipment
    })
}

export const addHop = async (req, res) => {
    const { previous_hop, next_hop, new_hop} = req.body;
    const { shipment_number } = req.params;

    const shipment = await Shipments.findOne({shipment_number});

    if(!shipment){
        return res.status(404).json({
            success: false,
            message: "Shipment with ID not found"
        })
    }

    const newHops = [ previous_hop, new_hop, next_hop];

    const updatedShipment = await Shipments.findOneAndUpdate(
        {shipment_number: shipment_number},
        {hops: newHops},
        {new: true}
    )

    return res.status(201).json({
        success: true,
        message: "Hop added successfully.",
        data: updatedShipment
    })


}

export const getHops = async (req, res) => {
    const {shipment_number} = req.params;

    const isExist = await Shipments.findOne({shipment_number});

    if(!isExist){
        return res.status(404).json({
            success: false,
            message: `Shipment with ID ${shipment_number} not found`
        })
    } 

    return res.status(200).json({
        success: true,
        message: "Hops retrieved successfully.",
        data: isExist
    })
}

export const trackShipment = async (req, res) => {
    const {shipment_number} = req.params;

    const shipment = await Shipments.findOne({shipment_number}).populate('flights');

    if(!shipment){
        return res.status(404).json({
            success: false,
            message: "Shipment not found"
        })
    }

    if(shipment.flights.length === 0){
        return res.status(400).json({
            success: false,
            message: "No Flight found"
        })
    }

    const totalFlights = shipment.hops.length-1;
    const numberOfFlight = shipment.flights.length;
    let landedFlights = 0;
    const flightArray = shipment.flights;
    console.log(flightArray);
    let progress = 0;

    for(let i=0; i<numberOfFlight; i++){
        const flight = flightArray[i];

        if(flight.status === 'landed') landedFlights++;


        progress = (landedFlights/totalFlights)*100;

        if(progress === 100) {
            flight.status = "completed";
        }
    }


    return res.status(200).json({
        success: true,
        message: "Shipment tracking details retrieved.",
        data:{
            shipment_number,
            "current_location": flightArray[numberOfFlight-1].to,
            "progress_percentage": progress,
            status: flightArray[numberOfFlight-1].status
        }
    })
}