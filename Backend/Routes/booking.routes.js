import express from "express";
import {
  createBooking,
  bookingList,
  // bookingSearch,
  // checkOut,
} from "../Controller/booking.js";
// import { verifyUser } from "../utils/verifyToken.js";
const router = express.Router();
//Check In
router.post("/:hotelId/:roomId", createBooking);
//Booking List
router.get("/list", bookingList);
//Search Booking By Id
// router.get("/search/:id", bookingSearch);
// //Check Out
// router.delete("/checkout/:id", checkOut);

export default router;
