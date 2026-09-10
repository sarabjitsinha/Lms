import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import {
  register,
  login,
  getDashboardOverview,
  getCourses,
  getCourseById,
  toggleLessonComplete,
  createCourse,
  getQuizzes,
  submitQuiz,
  getForumPosts,
  createForumPost,
  addForumReply,
  upvoteForumPost,
  getCertificates,
  getBadges
} from "./Controller/controller.js";

const app = express();
const PORT = process.env.PORT || 2700;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// Optional MongoDB Connection with auto-fallback
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/LMS";
mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 2000
}).then(() => {
  console.log("Connected to MongoDB successfully");
}).catch((err) => {
  console.log("MongoDB connection optional notice: running in resilient in-memory & persistence mode.");
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Authentication Routes
app.post("/register", register);
app.post("/api/auth/register", register);
app.post("/login", login);
app.post("/api/auth/login", login);

// Dashboard Overview Route
app.get("/api/dashboard/overview", getDashboardOverview);

// Course Routes
app.get("/api/courses", getCourses);
app.get("/api/courses/:id", getCourseById);
app.post("/api/courses", createCourse);
app.patch("/api/courses/:courseId/lessons/:lessonId/toggle", toggleLessonComplete);

// Quiz Routes
app.get("/api/quizzes", getQuizzes);
app.post("/api/quizzes/:id/submit", submitQuiz);

// Forum Routes
app.get("/api/forum/posts", getForumPosts);
app.post("/api/forum/posts", createForumPost);
app.post("/api/forum/posts/:id/reply", addForumReply);
app.post("/api/forum/posts/:id/upvote", upvoteForumPost);

// Certificates & Badges Routes
app.get("/api/certificates", getCertificates);
app.get("/api/badges", getBadges);

app.listen(PORT, () => {
  console.log(`LMS Server running on http://localhost:${PORT}`);
});