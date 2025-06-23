import jwt from "jsonwebtoken";
import videoModel from "../models/videoModel.js";
import funFactModel from "../models/funFactModel.js";
import tipModel from "../models/tipModel.js";
import userModel from "../models/userModel.js";  
import reportModel from "../models/reportModel.js";
import contactModel from "../models/contactModel.js";


// API for Admin Login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API for Adding Videos
const addVideo = async (req, res) => {
    try {
        const { title, url } = req.body;

        if (!title || !url) {
            return res.json({ success: false, message: "Missing Details" });
        }

        const newVideo = new videoModel({ title, url, date: Date.now() });
        await newVideo.save();

        res.json({ success: true, message: "Video Added Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to Fetch All Videos
const getVideos = async (req, res) => {
    try {
        const videos = await videoModel.find({}).sort({ date: -1 });
        res.json({ success: true, videos }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch videos" });
    }
};


// API for Adding FunFact
const addFunFact = async (req, res) => {
    try {
        const { fact } = req.body;

        if (!fact) {
            return res.json({ success: false, message: "Missing Details" });
        }

        const newFunFact = new funFactModel({ fact });
        await newFunFact.save();

        res.json({ success: true, message: "FunFact Added Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to Fetch All FunFacts
const getFunFacts = async (req, res) => {
    try {
        const funFacts = await funFactModel.find({}).sort({ date: -1 });
        res.json({ success: true, funFacts }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch fun facts" });
    }
};

// API for Adding Tips
const addTip = async (req, res) => {
    try {
        const { tip } = req.body;

        if (!tip) {
            return res.json({ success: false, message: "Missing Details" });
        }

        const newTip = new tipModel({ tip });
        await newTip.save();

        res.json({ success: true, message: "Tip Added Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to Fetch All Tips
const getTips = async (req, res) => {
    try {
        const tips = await tipModel.find({}).sort({ date: -1 });
        res.json({ success: true, tips }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to fetch tips" });
    }
};


// API to get admin dashboard overview
const getAdminOverview = async (req, res) => {
    try {
        const totalUsers = await userModel.countDocuments();
        const totalReports = await reportModel.countDocuments();
        const totalContacts = await contactModel.countDocuments();

        res.json({ success: true, overview: { totalUsers, totalReports, totalContacts } });
    } catch (error) {
        console.error("Error fetching admin overview:", error);
        res.json({ success: false, message: error.message });
    }
};

export { loginAdmin, addVideo, getVideos , addFunFact, getFunFacts , addTip , getTips , getAdminOverview};
