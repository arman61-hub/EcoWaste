import express from "express";
import { contact, getContacts } from "../controllers/contactControllers.js";

const contactRouter = express.Router();

contactRouter.post("/contact", contact);
contactRouter.get("/contacts", getContacts); 

export default contactRouter;