import express from "express";
import { getAllUsers, getMe, login, register } from "../controllers/UsersContainer.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/post", register);
router.post("/login", login);
router.get("/me", getMe);

export default router;