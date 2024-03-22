import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../Controller/user.js";
// import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//UPDATE
router.put("/:id", updateUser);

//DELETE
router.delete("/:id", deleteUser);

//GET
router.get("/:id",  getUser);

//GET ALL
router.get("/", getUsers);

export default router;