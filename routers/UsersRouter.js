import express from "express";
import { getAllUsers, register } from "../controllers/UsersContainer.js";
import { getMe, login, logout } from "../controllers/AuthContainer.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/post", register);
router.post("/login", login);
router.get("/me", getMe);
router.post("/logout", logout);

export default router;