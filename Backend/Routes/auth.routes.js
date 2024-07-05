import express from "express";
import { login, register } from "../Controller/auth.controller.js";
import upload from "../Utils/multer.js";

const router = express.Router();

router.post("/register", upload.single('file'), register);
router.post("/login", login);

export default router;
