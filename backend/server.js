import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js";
import contactRouter from "./routes/contactRoute.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api", contactRouter);

app.get("/", (req, res) => {
    res.send("API WORKING");
});

app.listen(port, () => console.log("Server Started", port));
