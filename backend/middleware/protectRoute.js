import jwt from "jsonwebtoken";
import Student from "../models/student.model.js";
import MessAuthority from "../models/messAuthority.model.js";

const protectRoute = async (req, res, next) => {
    try {
        // Check for JWT in cookies
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        // First, check in the Student collection
        let user = await Student.findById(decoded.userId).select("-password");

        // If not found, check in the MessAuthority collection
        if (!user) {
            user = await MessAuthority.findById(decoded.userId).select("-password");
        }

        // If the user is not found in either collection
        if (!user) {
            return res.status(400).json({ error: "User not found in any system" });
        }

        // Ensure that the role is present in the user object
        if (!user.role) {
            return res.status(400).json({ error: "Role not found for this user" });
        }

        // Attach the user and role to the request object
        req.user = user;

        // Proceed to the next middleware
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ error: "Internal Server Error at protectRoute" });
    }
};

export default protectRoute;
