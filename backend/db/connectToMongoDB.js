import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToMongoDB = async () => {
    try {
        console.log("MongoDB URI:", process.env.MONGO_DB_URI); // Uncomment for debugging
        await mongoose.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message, error.stack);
        process.exit(1); // Exit the process with failure code
    }
};

export default connectToMongoDB;