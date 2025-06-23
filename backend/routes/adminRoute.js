import express from "express";
import { addFunFact, addTip, addVideo, getFunFacts, getTips, getVideos, loginAdmin, getAdminOverview } from "../controllers/adminControllers.js";

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post("/add-video", addVideo);
adminRouter.get("/videos", getVideos);
adminRouter.post("/add-funFact", addFunFact);
adminRouter.get("/funFacts", getFunFacts);
adminRouter.post("/add-tip", addTip);
adminRouter.get("/tips", getTips);
adminRouter.get("/overview", getAdminOverview);

export default adminRouter;