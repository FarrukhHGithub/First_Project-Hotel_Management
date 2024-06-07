import mongoose from "mongoose";
const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,

    },
    photos: {
      type: String,
      default: ""

    },
    price: {
      type: Number,

    },
    bed: {
      type: Number
    },
    maxPeople: {
      type: Number,

    },
    status: {
      type: Boolean
    },
    desc: {
      type: String,

    },
    unavailableDates:
      [
        {
          fromDate: Date,
          toDate: Date
        }
      ]
    ,
    // roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  { timestamps: true }
);

export default mongoose.model("Room", RoomSchema);