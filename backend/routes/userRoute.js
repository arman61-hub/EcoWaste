import express from "express";
import multer from "multer";
import { loginUser, registerUser, reportWaste, getAllReports } from "../controllers/userControllers.js";

const userRouter = express.Router();
const storage = multer.diskStorage({});
const upload = multer({ storage });

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/report", upload.single("image"), reportWaste);
userRouter.get("/reports", getAllReports);  

export default userRouter;
