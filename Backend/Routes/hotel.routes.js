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
} from "../Controller/hotel.controller.js";
import { verifyAdmin } from "../Utils/verifyToken.js";
import upload from "../Utils/multer.js";

const router = express.Router();

//CREATE
router.post("/", createHotel);

//UPDATE
router.put("/:id", upload.single('photos'), updateHotel);

//DELETE
router.delete("/:id", deleteHotel);

//GET
router.get("/search/:id", getHotel);

//GET ALL
router.get("/hotels", getHotels);

// CountByCity
router.get("/countByCity", countByCity);

// CountByType
router.get("/countByType", countByType);

// GetHotelRooms
router.get("/getHotelRooms", getHotelRooms);

export default router;