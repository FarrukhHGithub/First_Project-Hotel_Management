import express from "express";
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
  countByCity,
  countByType,
  getHotelRooms,
} from "../Controller/Hotels.js";
import upload from "../Utils/multer.js";

// import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", createHotel);

//UPDATE
router.put("/:id", upload.single('photos'), updateHotel);
//DELETE
router.delete("/:id", deleteHotel);
//GET

router.get("/find/:id", getHotel);
//GET ALL

router.get("/hotels", getHotels);

// Count By City
router.get("/countByCity", countByCity);

//Count by Types Of Hotel
router.get("/countByType", countByType);

// Get All Hotel rooms
router.get("/room/:id", getHotelRooms);

export default router;
