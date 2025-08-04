import express from 'express';
import { changeStatus } from '../controllers/flight.js';

const router = express.Router();

router.post("/:flight_number/status", changeStatus);

export default router;
