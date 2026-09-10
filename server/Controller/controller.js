import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  initialCourses,
  initialQuizzes,
  initialBadges,
  initialCertificates,
  initialForumPosts,
  defaultStudentUser,
  defaultInstructorUser
} from "../data/seedData.js";
import { CourseModel, QuizModel, ForumModel, CertificateModel, UserModel } from "../Model/Models.js";

const JWT_SECRET = "lms_secure_jwt_secret_2026";

// Resilient In-Memory store that stays in sync and seeds automatically
let memoryStore = {
  users: [
    { ...defaultStudentUser, passwordHash: bcrypt.hashSync("password123", 8) },
    { ...defaultInstructorUser, passwordHash: bcrypt.hashSync("instructor123", 8) }
  ],
  courses: JSON.parse(JSON.stringify(initialCourses)),
  quizzes: JSON.parse(JSON.stringify(initialQuizzes)),
  badges: JSON.parse(JSON.stringify(initialBadges)),
  certificates: JSON.parse(JSON.stringify(initialCertificates)),
  forumPosts: JSON.parse(JSON.stringify(initialForumPosts)),
  notes: {}
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role = "student" } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, email and password are required." });
    }

    // Check existing
    const existing = memoryStore.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({ success: false, message: "Email is already registered. Please log in." });
    }

    const passwordHash = await bcrypt.hash(password, 8);
    const newUser = {
      id: "user-" + Date.now(),
      name,
      email,
      role: role || "student",
      passwordHash,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      subscription: {
        plan: "Student Standard",
        active: true,
        expiresAt: "25 February 2027"
      },
      stats: {
        coursesEnrolled: 0,
        coursesCompleted: 0,
        certificatesEarned: 0,
        quizzesCompleted: 0,
        averageScore: "0",
        studyHours: 0
      }
    };

    memoryStore.users.push(newUser);

    // Save to mongo if connected
    try {
      if (UserModel.db?.readyState === 1) {
        await UserModel.create({
          name,
          email,
          password: passwordHash,
          role: newUser.role,
          avatar: newUser.avatar
        });
      }
    } catch (e) {
      // fallback
    }

    const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, JWT_SECRET, { expiresIn: "7d" });

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar,
        subscription: newUser.subscription,
        stats: newUser.stats
      }
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error during registration." });
  }
};

export const login = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const identifier = (email || name || "").trim().toLowerCase();

    if (!identifier || !password) {
      return res.status(400).json({ success: false, message: "Please provide your email/username and password." });
    }

    let foundUser = memoryStore.users.find(
      u => u.email.toLowerCase() === identifier || u.name.toLowerCase() === identifier
    );

    // If demo quick login
    if (!foundUser && (identifier === "bill" || identifier === "student")) {
      foundUser = memoryStore.users.find(u => u.role === "student");
    } else if (!foundUser && (identifier === "adrian" || identifier === "instructor")) {
      foundUser = memoryStore.users.find(u => u.role === "instructor");
    }

    if (!foundUser) {
      return res.status(404).json({ success: false, message: "User not registered. Please sign up first." });
    }

    // Match password (support raw demo password or bcrypt compare)
    const isMatch = (password === "password" || password === "password123" || password === "instructor123" || (foundUser.passwordHash && bcrypt.compareSync(password, foundUser.passwordHash)));
    
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials. Please try again." });
    }

    const token = jwt.sign({ id: foundUser.id, email: foundUser.email, role: foundUser.role }, JWT_SECRET, { expiresIn: "7d" });

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        avatar: foundUser.avatar,
        subscription: foundUser.subscription,
        stats: foundUser.stats
      }
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error during login." });
  }
};

export const getDashboardOverview = (req, res) => {
  try {
    return res.json({
      success: true,
      data: {
        subscription: defaultStudentUser.subscription,
        courses: memoryStore.courses,
        quizzes: memoryStore.quizzes,
        badges: memoryStore.badges,
        certificates: memoryStore.certificates,
        forumActivity: memoryStore.forumPosts.slice(0, 5),
        stats: defaultStudentUser.stats
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCourses = (req, res) => {
  try {
    const { category, search, level } = req.query;
    let list = [...memoryStore.courses];

    if (category && category !== "All") {
      list = list.filter(c => c.category.toLowerCase() === category.toLowerCase());
    }

    if (level && level !== "All") {
      list = list.filter(c => c.level.toLowerCase() === level.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(c => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
    }

    return res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCourseById = (req, res) => {
  try {
    const { id } = req.params;
    const course = memoryStore.courses.find(c => c.id === id || c.slug === id);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    return res.json({ success: true, data: course });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleLessonComplete = (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    const course = memoryStore.courses.find(c => c.id === courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    let totalLessons = 0;
    let completedLessons = 0;
    let targetedLesson = null;

    course.modules.forEach(mod => {
      mod.lessons.forEach(l => {
        totalLessons++;
        if (l.id === lessonId) {
          l.completed = !l.completed;
          targetedLesson = l;
        }
        if (l.completed) {
          completedLessons++;
        }
      });
    });

    course.progress = Math.round((completedLessons / (totalLessons || 1)) * 100);

    // Auto issue certificate if 100%
    let newCert = null;
    if (course.progress === 100) {
      const alreadyHas = memoryStore.certificates.find(c => c.courseId === course.id);
      if (!alreadyHas) {
        newCert = {
          id: "cert-" + Date.now(),
          certificateCode: `LMS-${course.slug.toUpperCase().slice(0, 7)}-${Math.floor(10000 + Math.random() * 90000)}`,
          courseId: course.id,
          courseTitle: course.title,
          recipientName: defaultStudentUser.name,
          recipientEmail: defaultStudentUser.email,
          instructorName: course.instructor?.name || "Adrian Demian",
          issueDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
          grade: "100% Mastery",
          pdfUrl: "#"
        };
        memoryStore.certificates.unshift(newCert);
      }
    }

    return res.json({
      success: true,
      message: targetedLesson?.completed ? "Lesson marked as completed!" : "Lesson unmarked",
      data: {
        course,
        newCertificate: newCert
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createCourse = (req, res) => {
  try {
    const { title, category, level, description, duration, thumbnail, modules, instructorName } = req.body;
    if (!title || !category) {
      return res.status(400).json({ success: false, message: "Title and category are required." });
    }

    const newCourse = {
      id: "course-" + Date.now(),
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category,
      level: level || "Beginner",
      rating: 5.0,
      reviewsCount: 1,
      duration: duration || "4 hours",
      instructor: {
        name: instructorName || defaultInstructorUser.name,
        avatar: defaultInstructorUser.avatar,
        role: "Course Instructor"
      },
      thumbnail: thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80",
      description: description || "Comprehensive interactive course curriculum.",
      lessonsCount: modules?.reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 4,
      progress: 0,
      modules: modules && modules.length > 0 ? modules : [
        {
          id: "mod-init-1",
          title: "Module 1: Introduction & Fundamentals",
          lessons: [
            {
              id: "l-init-1",
              title: "Welcome to " + title,
              duration: "10 min",
              videoUrl: "https://www.youtube-nocookie.com/embed/pQN-pnXPaVg",
              content: `Welcome to ${title}! In this course we cover key principles and practical implementations.`,
              completed: false
            }
          ]
        }
      ]
    };

    memoryStore.courses.unshift(newCourse);
    return res.status(201).json({ success: true, message: "Course created successfully!", data: newCourse });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getQuizzes = (req, res) => {
  try {
    return res.json({ success: true, count: memoryStore.quizzes.length, data: memoryStore.quizzes });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const submitQuiz = (req, res) => {
  try {
    const { id } = req.params;
    const { answers } = req.body; // { qId: selectedIndex }
    const quiz = memoryStore.quizzes.find(q => q.id === id);

    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }

    let correctCount = 0;
    const review = quiz.questions.map(q => {
      const selected = answers ? answers[q.id] : undefined;
      const isCorrect = selected === q.correctIndex;
      if (isCorrect) correctCount++;
      return {
        questionId: q.id,
        question: q.question,
        selectedOption: selected,
        correctOption: q.correctIndex,
        isCorrect,
        explanation: q.explanation
      };
    });

    const scoreOutOfTen = Number(((correctCount / quiz.questions.length) * 10).toFixed(1));
    let gradeLabel = "Failed";
    let gradeColor = "text-rose-600 dark:text-rose-400";

    if (scoreOutOfTen >= 8.5) {
      gradeLabel = "Great";
      gradeColor = "text-green-600 dark:text-green-400";
    } else if (scoreOutOfTen >= 5.0) {
      gradeLabel = "Good";
      gradeColor = "text-emerald-600 dark:text-emerald-400";
    }

    quiz.lastScore = scoreOutOfTen;
    quiz.gradeLabel = gradeLabel;
    quiz.gradeColor = gradeColor;

    return res.json({
      success: true,
      message: "Quiz submitted successfully!",
      result: {
        scoreOutOfTen,
        correctCount,
        totalQuestions: quiz.questions.length,
        gradeLabel,
        review
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getForumPosts = (req, res) => {
  try {
    const { topic, search } = req.query;
    let list = [...memoryStore.forumPosts];

    if (topic && topic !== "All") {
      list = list.filter(p => p.topic.toLowerCase().includes(topic.toLowerCase()));
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q));
    }

    return res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createForumPost = (req, res) => {
  try {
    const { title, topic, content, author = "Bill Evans" } = req.body;
    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Title and content are required." });
    }

    const newPost = {
      id: "post-" + Date.now(),
      title,
      topic: topic || "General Discussion",
      author,
      authorAvatar: defaultStudentUser.avatar,
      content,
      timeAgo: "Just now",
      createdAt: new Date().toISOString(),
      upvotes: 1,
      replies: []
    };

    memoryStore.forumPosts.unshift(newPost);
    return res.status(201).json({ success: true, message: "Post created successfully!", data: newPost });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addForumReply = (req, res) => {
  try {
    const { id } = req.params;
    const { content, author = "Bill Evans" } = req.body;

    if (!content) {
      return res.status(400).json({ success: false, message: "Reply content cannot be empty." });
    }

    const post = memoryStore.forumPosts.find(p => p.id === id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found." });
    }

    const newReply = {
      id: "rep-" + Date.now(),
      author,
      authorAvatar: defaultStudentUser.avatar,
      content,
      timeAgo: "Just now",
      createdAt: new Date().toISOString()
    };

    post.replies.push(newReply);
    return res.status(201).json({ success: true, message: "Reply posted!", data: post });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const upvoteForumPost = (req, res) => {
  try {
    const { id } = req.params;
    const post = memoryStore.forumPosts.find(p => p.id === id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found." });
    }
    post.upvotes = (post.upvotes || 0) + 1;
    return res.json({ success: true, upvotes: post.upvotes });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCertificates = (req, res) => {
  try {
    return res.json({ success: true, count: memoryStore.certificates.length, data: memoryStore.certificates });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getBadges = (req, res) => {
  try {
    return res.json({ success: true, data: memoryStore.badges });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
