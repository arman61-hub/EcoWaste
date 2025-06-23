import validator from "validator";
import bcryptjs from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import reportModel from "../models/reportModel.js";

// API to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 5) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword,
        };

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to report waste
const reportWaste = async (req, res) => {
    try {
        const { category, location, description } = req.body;
        const imageFile = req.file;

        if (!category || !location || !description || !imageFile) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const reportData = {
            category,
            location,
            description,
            image: imageUrl,
        };

        const newReport = new reportModel(reportData);
        await newReport.save();

        res.json({ success: true, message: "Waste Report Submitted Successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// API to fetch all waste reports
const getAllReports = async (req, res) => {
    try {
        const reports = await reportModel.find();
        res.json({ success: true, reports });
    } catch (error) {
        console.error("Error fetching reports:", error);
        res.json({ success: false, message: error.message });
    }
};

export { registerUser, loginUser, reportWaste, getAllReports }; 
