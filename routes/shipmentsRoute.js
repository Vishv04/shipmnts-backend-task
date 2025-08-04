import express from 'express';
import { createShipment, addHop, getHops, trackShipment } from '../controllers/shipment.js';
import { addFlightInfo } from '../controllers/flight.js';

const router = express.Router();

router.post("/create", createShipment);
router.post("/:shipment_number/hops/add", addHop);
router.post("/:shipment_number/flights/add", addFlightInfo);
router.get("/:shipment_number/hops", getHops);

export default router;
