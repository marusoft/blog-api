import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import categoryRoute from "./routes/categories.js";

// this will help us reach the environment variables in .env
dotenv.config();

// Creates an Express application
const app = express();
app.use(express.json());

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to database!!!");
  } catch (error) {
    console.log(error);
  }
};
connection();

// create image storage function
// cb take cares of errors
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, "icon.png"); // doing it manually
    // cb(null, req.body.name);
  },
});

// Upload function

const upload = multer({ storage: storage });

// route to upload

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen("5000", () => console.log("It all start from localhost"));
