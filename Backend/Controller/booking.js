import Booking from "../Model/booking.js";
import Room from "../Model/roomModel.js";

export const createBooking = async (req, res, next) => {
    try {
        const { hotelId, roomId } = req.params;
        const { name, contact, fromDate, toDate } = req.body;
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({
                status: false,
                message: `Room with ID ${roomId} not found`,
            });
        }

        const existingBookings = await Booking.find({
            hotelId,
            roomId,
            $or: [
                {
                    fromDate: { $gte: fromDate, $lt: toDate },
                    toDate: { $gt: fromDate, $lte: toDate },
                },
                {
                    fromDate: { $lte: fromDate },
                    toDate: { $gte: toDate },
                },
            ],
        });


        if (existingBookings.length > 0) {
            return res.status(200).json({
                status: false,
                message: `Room is not available for the selected dates`,
            });
        }

        const newBooking = new Booking({
            hotelId,
            roomId,
            name,
            contact,
            fromDate,
            toDate,
        });
        await Room.findByIdAndUpdate(
            roomId,
            { $set: { ...room, unavailableDates: [fromDate, toDate] } },
            { new: true }
        );
        await newBooking.save();

        res.status(201).json({
            status: true,
            message: `Booking created successfully`,
            data: newBooking,
        });
    } catch (err) {
        next(err);
    }
};

// Get a list of all bookings
export const bookingList = async (req, res, next) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (err) {
        next(err);
    }
};