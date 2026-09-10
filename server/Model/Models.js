import mongoose from "mongoose";

// Student / User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "instructor", "admin"], default: "student" },
  avatar: { type: String, default: "" },
  bio: { type: String, default: "" },
  subscription: {
    plan: { type: String, default: "Pro Membership" },
    active: { type: Boolean, default: true },
    expiresAt: { type: String, default: "25 February 2027" }
  },
  createdAt: { type: Date, default: Date.now }
});

// Course Schema
const courseSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  title: { type: String, required: true },
  slug: { type: String },
  category: { type: String, required: true },
  level: { type: String, default: "Beginner" },
  rating: { type: Number, default: 4.8 },
  reviewsCount: { type: Number, default: 120 },
  duration: { type: String, default: "5 hours" },
  instructor: {
    name: { type: String, default: "Adrian Demian" },
    avatar: { type: String },
    role: { type: String, default: "Instructor" }
  },
  thumbnail: { type: String },
  description: { type: String },
  lessonsCount: { type: Number, default: 10 },
  progress: { type: Number, default: 0 },
  modules: [{
    id: String,
    title: String,
    lessons: [{
      id: String,
      title: String,
      duration: String,
      videoUrl: String,
      content: String,
      completed: { type: Boolean, default: false }
    }]
  }]
});

// Quiz Schema
const quizSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  courseId: { type: String, required: true },
  courseTitle: { type: String },
  title: { type: String, required: true },
  subtitle: { type: String },
  lastScore: { type: Number, default: 0 },
  gradeLabel: { type: String, default: "Pending" },
  gradeColor: { type: String, default: "text-slate-500" },
  questionsCount: { type: Number, default: 5 },
  timeLimitMinutes: { type: Number, default: 10 },
  questions: [{
    id: String,
    question: String,
    options: [String],
    correctIndex: Number,
    explanation: String
  }]
});

// Forum Post Schema
const forumSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  title: { type: String, required: true },
  topic: { type: String, default: "General" },
  author: { type: String, required: true },
  authorAvatar: { type: String },
  content: { type: String, required: true },
  timeAgo: { type: String, default: "Just now" },
  createdAt: { type: Date, default: Date.now },
  upvotes: { type: Number, default: 0 },
  replies: [{
    id: String,
    author: String,
    authorAvatar: String,
    content: String,
    timeAgo: String,
    createdAt: { type: Date, default: Date.now }
  }]
});

// Certificate Schema
const certificateSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  certificateCode: { type: String, required: true },
  courseId: { type: String, required: true },
  courseTitle: { type: String, required: true },
  recipientName: { type: String, required: true },
  recipientEmail: { type: String },
  instructorName: { type: String, default: "Adrian Demian" },
  issueDate: { type: String, default: () => new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) },
  grade: { type: String, default: "95% Honors" },
  pdfUrl: { type: String, default: "#" }
});

export const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
export const CourseModel = mongoose.models.Course || mongoose.model("Course", courseSchema);
export const QuizModel = mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);
export const ForumModel = mongoose.models.Forum || mongoose.model("Forum", forumSchema);
export const CertificateModel = mongoose.models.Certificate || mongoose.model("Certificate", certificateSchema);
