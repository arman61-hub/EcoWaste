import contactModel from "../models/contactModel.js";

// API for contact
const contact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const newContact = new contactModel({ name, email, subject, message });
        await newContact.save();

        res.status(201).json({ success: true, message: "Message sent successfully." });
    } catch (error) {
        console.error("Error saving message:", error);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};

// Fetch all contact messages
const getContacts = async (req, res) => {
    try {
        const contacts = await contactModel.find();
        res.status(200).json({ success: true, contacts });
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }
};

export { contact , getContacts};
