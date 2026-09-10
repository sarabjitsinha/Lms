import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import confetti from "canvas-confetti";

const API_BASE = "http://localhost:2700/api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Default logged in user matching reference design (Bill Evans)
  const [user, setUser] = useState({
    id: "user-student-1",
    name: "Bill Evans",
    email: "bill@example.com",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    subscription: {
      plan: "Pro Annual Plan",
      active: true,
      expiresAt: "25 February 2027"
    },
    stats: {
      coursesEnrolled: 4,
      coursesCompleted: 2,
      certificatesEarned: 2,
      quizzesCompleted: 3,
      averageScore: "8.6",
      studyHours: 24.5
    }
  });

  const [token, setToken] = useState(localStorage.getItem("lms_token") || "demo_token");
  const [courses, setCourses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [badges, setBadges] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [forumPosts, setForumPosts] = useState([]);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Sarah Jenkins replied to your Angular Signals question", time: "10m ago", read: false },
    { id: 2, text: "You earned the Star Achiever badge! 🌟", time: "1h ago", read: false },
    { id: 3, text: "New Quiz available: Directives & Routing", time: "1d ago", read: true }
  ]);
  const [unreadCount, setUnreadCount] = useState(2);
  const [messages, setMessages] = useState([
    { id: 1, sender: "Adrian Demian", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", message: "Great job on your CSS Grid project!", time: "2h ago" },
    { id: 2, sender: "Sarah Jenkins", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80", message: "Feel free to check out Module 2 on Angular Router.", time: "1d ago" }
  ]);
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("lms_notes")) || {};
    } catch {
      return {};
    }
  });

  // Fetch initial data from backend API
  const fetchDashboardData = async () => {
    try {
      const res = await axios.get(`${API_BASE}/dashboard/overview`);
      if (res.data && res.data.success) {
        const { courses, quizzes, badges, certificates, forumActivity } = res.data.data;
        setCourses(courses || []);
        setQuizzes(quizzes || []);
        setBadges(badges || []);
        setCertificates(certificates || []);
        setForumPosts(forumActivity || []);
      }
    } catch (err) {
      console.warn("Backend fetch failed, using stored state", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Save notes locally
  const saveLessonNote = (lessonId, noteText) => {
    const updated = { ...notes, [lessonId]: noteText };
    setNotes(updated);
    localStorage.setItem("lms_notes", JSON.stringify(updated));
  };

  // Toggle lesson complete
  const toggleLesson = async (courseId, lessonId) => {
    // Optimistic frontend update
    let justCompletedAll = false;
    let targetCourse = null;

    setCourses(prevCourses =>
      prevCourses.map(c => {
        if (c.id === courseId) {
          let total = 0;
          let completed = 0;
          const newModules = c.modules.map(mod => {
            const newLessons = mod.lessons.map(l => {
              total++;
              if (l.id === lessonId) {
                const nextState = !l.completed;
                if (nextState) completed++;
                return { ...l, completed: nextState };
              }
              if (l.completed) completed++;
              return l;
            });
            return { ...mod, lessons: newLessons };
          });

          const newProgress = Math.round((completed / (total || 1)) * 100);
          if (newProgress === 100 && c.progress < 100) {
            justCompletedAll = true;
          }

          targetCourse = { ...c, modules: newModules, progress: newProgress };
          return targetCourse;
        }
        return c;
      })
    );

    // If 100% completed, trigger confetti & auto create certificate
    if (justCompletedAll) {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });

      const newCert = {
        id: "cert-" + Date.now(),
        certificateCode: `LMS-${courseId.toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`,
        courseId: courseId,
        courseTitle: targetCourse?.title || "Course Completion",
        recipientName: user.name,
        recipientEmail: user.email,
        instructorName: targetCourse?.instructor?.name || "Adrian Demian",
        issueDate: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        grade: "100% Mastery",
        pdfUrl: "#"
      };

      setCertificates(prev => [newCert, ...prev]);
      setActiveCertificate(newCert);

      // Add achievement notification
      setNotifications(prev => [
        {
          id: Date.now(),
          text: `🎉 Congratulations! You completed ${targetCourse?.title} and earned a verified Certificate!`,
          time: "Just now",
          read: false
        },
        ...prev
      ]);
      setUnreadCount(c => c + 1);
    }

    // Call backend API
    try {
      await axios.patch(`${API_BASE}/courses/${courseId}/lessons/${lessonId}/toggle`);
    } catch (e) {
      console.warn("Backend toggle sync error", e);
    }
  };

  // Submit quiz
  const submitQuizAnswers = async (quizId, answers) => {
    try {
      const res = await axios.post(`${API_BASE}/quizzes/${quizId}/submit`, { answers });
      if (res.data?.success) {
        const result = res.data.result;
        // Update local quiz
        setQuizzes(prev =>
          prev.map(q => {
            if (q.id === quizId) {
              return {
                ...q,
                lastScore: result.scoreOutOfTen,
                gradeLabel: result.gradeLabel,
                gradeColor:
                  result.scoreOutOfTen >= 8.5
                    ? "text-green-600 dark:text-green-400"
                    : result.scoreOutOfTen >= 5.0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400"
              };
            }
            return q;
          })
        );

        if (result.scoreOutOfTen >= 8.0) {
          confetti({ particleCount: 70, spread: 60 });
        }

        return result;
      }
    } catch (e) {
      console.error("Quiz submit error", e);
    }
    return null;
  };

  // Create course (for instructor mode)
  const createNewCourse = async courseData => {
    try {
      const res = await axios.post(`${API_BASE}/courses`, courseData);
      if (res.data?.success) {
        setCourses(prev => [res.data.data, ...prev]);
        return res.data.data;
      }
    } catch (e) {
      console.error("Course create error", e);
    }
  };

  // Create forum post
  const createForumPost = async (title, topic, content) => {
    try {
      const res = await axios.post(`${API_BASE}/forum/posts`, {
        title,
        topic,
        content,
        author: user.name
      });
      if (res.data?.success) {
        setForumPosts(prev => [res.data.data, ...prev]);
        return res.data.data;
      }
    } catch (e) {
      console.error("Forum post create error", e);
    }
  };

  // Reply to forum post
  const replyToForumPost = async (postId, replyContent) => {
    try {
      const res = await axios.post(`${API_BASE}/forum/posts/${postId}/reply`, {
        content: replyContent,
        author: user.name
      });
      if (res.data?.success) {
        setForumPosts(prev =>
          prev.map(p => (p.id === postId ? res.data.data : p))
        );
      }
    } catch (e) {
      console.error("Forum reply error", e);
    }
  };

  // Upvote forum post
  const upvotePost = async postId => {
    setForumPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, upvotes: (p.upvotes || 0) + 1 } : p))
    );
    try {
      await axios.post(`${API_BASE}/forum/posts/${postId}/upvote`);
    } catch (e) {
      // ignore
    }
  };

  // Switch role helper (Student <-> Instructor)
  const switchRole = role => {
    if (role === "instructor") {
      setUser({
        id: "user-instructor-1",
        name: "Adrian Demian",
        email: "adrian@example.com",
        role: "instructor",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        title: "Senior Curriculum Architect",
        subscription: { plan: "Instructor Enterprise", active: true, expiresAt: "Lifetime" },
        stats: { coursesCreated: 3, totalStudents: 1420, totalReviews: 685, avgRating: 4.88 }
      });
    } else {
      setUser({
        id: "user-student-1",
        name: "Bill Evans",
        email: "bill@example.com",
        role: "student",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        subscription: { plan: "Pro Annual Plan", active: true, expiresAt: "25 February 2027" },
        stats: {
          coursesEnrolled: courses.length,
          coursesCompleted: certificates.length,
          certificatesEarned: certificates.length,
          quizzesCompleted: 3,
          averageScore: "8.6",
          studyHours: 24.5
        }
      });
    }
  };

  const loginUser = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("lms_token", authToken);
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("lms_token");
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        role: user?.role || "student",
        courses,
        setCourses,
        quizzes,
        badges,
        certificates,
        activeCertificate,
        setActiveCertificate,
        forumPosts,
        notifications,
        unreadCount,
        messages,
        notes,
        loading,
        saveLessonNote,
        toggleLesson,
        submitQuizAnswers,
        createNewCourse,
        createForumPost,
        replyToForumPost,
        upvotePost,
        switchRole,
        loginUser,
        logoutUser,
        markNotificationsAsRead,
        refreshData: fetchDashboardData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
