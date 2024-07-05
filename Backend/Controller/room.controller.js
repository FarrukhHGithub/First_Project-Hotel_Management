import Room from "../Models/room.model.js";
import Hotel from "../Models/hotel.model.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const photo = req.file
  const newRoom = new Room({ ...req.body, photos: photo.path ? photo.path : "" });
  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoom = async (req, res, next) => {
  const { id, hotelId } = req.params
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      { $set: req.file ? { ...req.body, photos: req.file.path } : req.body },
      { new: true }
    );
    const rooms = await Room.find();
    await Hotel.findByIdAndUpdate(hotelId,
      { $set: { rooms: rooms } },
      { new: true }
    )
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates,
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  const { id, hotelid } = req.params;

  try {
    // Check if the room exists
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found." });
    }

    // Remove the room from the hotel
    await Hotel.findByIdAndUpdate(hotelid, {
      '$pull': { rooms: room },
    });

    // Delete the room
    await Room.findByIdAndDelete(id);

    res.status(200).json({ message: "Room has been deleted." });
  } catch (err) {
    next(err);
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};