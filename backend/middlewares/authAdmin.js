import jwt from "jsonwebtoken";

// Admin Authentication Middleware
const authAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.json({ success: false, message: "Not Authorized. Login Again." });
        }

        const token = authHeader.split(" ")[1]; // Extract token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!decodedToken.email || decodedToken.email !== process.env.ADMIN_EMAIL) {
            return res.json({ success: false, message: "Not Authorized. Login Again." });
        }

        next(); // Token is valid
    } catch (error) {
        console.log("Token Error:", error.message);
        res.json({ success: false, message: "Invalid Token. Please Login Again." });
    }
};

export default authAdmin;

