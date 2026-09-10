export const initialCourses = [
  {
    id: "course-1",
    title: "Basics of HTML & Modern CSS3",
    slug: "basics-of-html",
    category: "Web Development",
    level: "Beginner",
    rating: 4.9,
    reviewsCount: 342,
    duration: "6 hours",
    instructor: {
      name: "Adrian Demian",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      role: "Senior Frontend Architect"
    },
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    description: "Master the fundamental building blocks of the web. Learn semantic HTML5, CSS layout systems including Flexbox and Grid, modern animations, and responsive design techniques for all screen sizes.",
    lessonsCount: 12,
    progress: 75,
    modules: [
      {
        id: "mod-1",
        title: "Module 1: Semantic HTML5 Structure",
        lessons: [
          {
            id: "l-101",
            title: "Introduction to HTML5 & Document Structure",
            duration: "15 min",
            videoUrl: "https://www.youtube-nocookie.com/embed/pQN-pnXPaVg",
            content: "HTML5 provides semantic elements like `<header>`, `<nav>`, `<main>`, `<article>`, and `<footer>` that give meaningful structure to web pages and optimize for accessibility and SEO.",
            completed: true
          },
          {
            id: "l-102",
            title: "Semantic Tags, Meta Tags & SEO Fundamentals",
            duration: "25 min",
            videoUrl: "https://www.youtube-nocookie.com/embed/kUMe1FH4CHE",
            content: "Learn how search engine crawlers and screen readers parse your document metadata, OpenGraph tags, and semantic hierarchy.",
            completed: true
          },
          {
            id: "l-103",
            title: "Accessible Forms, Validations & Input Types",
            duration: "20 min",
            videoUrl: "https://www.youtube-nocookie.com/embed/fNcJuPIZ2WE",
            content: "Build accessible web forms using native HTML validation attributes, `<label>` associations, and appropriate input types (`email`, `tel`, `date`, `number`).",
            completed: true
          }
        ]
      },
      {
        id: "mod-2",
        title: "Module 2: Modern CSS Layouts (Flexbox & Grid)",
        lessons: [
          {
            id: "l-104",
            title: "CSS Box Model & Modern Reset Techniques",
            duration: "22 min",
            videoUrl: "https://www.youtube-nocookie.com/embed/rIO5326FgPE",
            content: "Understand padding, margin, border, `box-sizing: border-box`, and establishing consistent layout baselines.",
            completed: true
          },
          {
            id: "l-105",
            title: "Mastering CSS Flexbox for Component Alignment",
            duration: "30 min",
            videoUrl: "https://www.youtube-nocookie.com/embed/JJSoEo8JSnc",
            content: "Explore flex direction, justify-content, align-items, flex-grow, flex-shrink, and building responsive navbar and card patterns.",
            completed: true
          },
          {
            id: "l-106",
            title: "CSS Grid Architecture for Complex UI Layouts",
            duration: "35 min",
            videoUrl: "https://www.youtube-nocookie.com/embed/rg7Fvvl3taU",
            content: "Harness CSS Grid with `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`, named grid areas, and fractional units.",
            completed: true
          },
          {
            id: "l-107",
            title: "CSS Custom Properties & Design Tokens",
            duration: "20 min",
            videoUrl: "https://www.youtube-nocookie.com/embed/1Rs2ND1ryYc",
            content: "Create dynamic themes with CSS variables (`--color-primary`, `--radius-md`) and media query overrides.",
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: "course-2",
    title: "Angular in Steps: From Zero to Hero",
    slug: "angular-in-steps",
    category: "Web Development",
    level: "Intermediate",
    rating: 4.8,
    reviewsCount: 198,
    duration: "10 hours",
    instructor: {
      name: "Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      role: "Google Developer Expert"
    },
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    description: "Complete guide to Angular modern architecture. Learn Signals, Standalone Components, Reactive Forms, Dependency Injection, RxJS observables, and modular routing.",
    lessonsCount: 16,
    progress: 90,
    modules: [
      {
        id: "mod-201",
        title: "Module 1: Angular Standalone & Components",
        lessons: [
          {
            id: "l-201",
            title: "Angular Architecture & CLI Setup",
            duration: "20 min",
            videoUrl: "https://www.youtube-nocookie.com/embed/3dHNOWTI7H8",
            content: "Introduction to Angular workspace, standalone bootstrapping, and template syntax bindings.",
            completed: true
          },
          {
            id: "l-202",
            title: "Directives, Pipes & Control Flow (@if, @for)",
            duration: "28 min",
            videoUrl: "https://www.youtube-nocookie.com/embed/3qBXWUpoPHo",
            content: "Deep dive into new built-in control flow (@if, @for, @switch) and custom reusable pipes.",
            completed: true
          }
        ]
      },
      {
        id: "mod-202",
        title: "Module 2: Directives & Advanced Routing",
        lessons: [
          {
            id: "l-203",
            title: "Angular Router, Child Routes & Route Guards",
            duration: "35 min",
            videoUrl: "https://www.youtube-nocookie.com/embed/k5E2AV3-10Q",
            content: "Implementing lazy loading, route parameters, CanActivate guards, and resolver services.",
            completed: true
          },
          {
            id: "l-204",
            title: "Angular Signals & State Management",
            duration: "30 min",
            videoUrl: "https://www.youtube-nocookie.com/embed/4yZpQ1oQ53A",
            content: "Manage reactive application state cleanly with `signal()`, `computed()`, and `effect()`.",
            completed: true
          }
        ]
      }
    ]
  },
  {
    id: "course-3",
    title: "Bootstrap & Tailwind Foundations",
    slug: "bootstrap-foundations",
    category: "Design & CSS",
    level: "Beginner",
    rating: 4.7,
    reviewsCount: 145,
    duration: "5 hours",
    instructor: {
      name: "Marcus Vance",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      role: "Lead UI/UX Engineer"
    },
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
    description: "Explore the two leading CSS styling paradigms: component-first styling with Bootstrap 5 and utility-first styling with Tailwind CSS v4.",
    lessonsCount: 8,
    progress: 35,
    modules: [
      {
        id: "mod-301",
        title: "Module 1: Responsive Grid & Typography",
        lessons: [
          {
            id: "l-301",
            title: "Breakpoints, Containers & Grid Systems",
            duration: "18 min",
            videoUrl: "https://www.youtube-nocookie.com/embed/eOW872o811w",
            content: "Mastering mobile-first responsive breakpoints, fluid containers, and nested columns.",
            completed: true
          },
          {
            id: "l-302",
            title: "Responsive & Retina UI Design Patterns",
            duration: "25 min",
            videoUrl: "https://www.youtube-nocookie.com/embed/l1m5UhyVv9U",
            content: "Designing high-DPI retina ready assets, vector SVGs, and responsive media wrappers.",
            completed: false
          }
        ]
      }
    ]
  },
  {
    id: "course-4",
    title: "Full-Stack React 19 & Node.js Mastery",
    slug: "react-nodejs-mastery",
    category: "Full Stack",
    level: "Advanced",
    rating: 4.95,
    reviewsCount: 512,
    duration: "14 hours",
    instructor: {
      name: "Elena Rostova",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      role: "Principal Full Stack Engineer"
    },
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80",
    description: "Build scalable full-stack web applications with React 19, Server Actions, Node.js, Express, MongoDB, JWT auth, and clean RESTful architecture.",
    lessonsCount: 24,
    progress: 10,
    modules: [
      {
        id: "mod-401",
        title: "Module 1: React 19 Server Hooks & Context",
        lessons: [
          {
            id: "l-401",
            title: "React 19 Actions, useOptimistic & useActionState",
            duration: "30 min",
            videoUrl: "https://www.youtube-nocookie.com/embed/SqcY0GlETPk",
            content: "Deep dive into new React 19 hooks and streamlined async form handlers without boilerplate.",
            completed: true
          }
        ]
      }
    ]
  }
];

export const initialQuizzes = [
  {
    id: "quiz-1",
    courseId: "course-1",
    courseTitle: "Basics of HTML",
    title: "Title of quiz goes here?",
    subtitle: "HTML5 Semantic Elements & Structure",
    lastScore: 5.8,
    gradeLabel: "Good",
    gradeColor: "text-emerald-600 dark:text-emerald-400",
    questionsCount: 5,
    timeLimitMinutes: 10,
    questions: [
      {
        id: "q1",
        question: "Which HTML5 element represents the primary navigation links of a website?",
        options: ["<header>", "<nav>", "<section>", "<aside>"],
        correctIndex: 1,
        explanation: "The `<nav>` element is intended only for major blocks of navigation links."
      },
      {
        id: "q2",
        question: "What is the correct CSS property to enable Flexbox layout?",
        options: ["display: flex", "position: flex", "flex-layout: true", "float: flex"],
        correctIndex: 0,
        explanation: "`display: flex` turns the selected container into a flex container."
      },
      {
        id: "q3",
        question: "Which attribute in `<input>` helps improve accessibility by specifying the expected type?",
        options: ["role", "type", "name", "kind"],
        correctIndex: 1,
        explanation: "The `type` attribute (e.g. email, number) specifies input semantics."
      },
      {
        id: "q4",
        question: "What does the HTML `alt` attribute on an `<img>` tag provide?",
        options: ["Image caption", "Alternative text for screen readers and broken images", "Tooltip on hover", "Filter effect"],
        correctIndex: 1,
        explanation: "The `alt` text describes the image for screen readers and appears if the image fails to load."
      },
      {
        id: "q5",
        question: "Which CSS unit is relative to the root element's font size?",
        options: ["em", "rem", "vh", "%"],
        correctIndex: 1,
        explanation: "`rem` (root em) is always relative to the font-size of the `<html>` root."
      }
    ]
  },
  {
    id: "quiz-2",
    courseId: "course-2",
    courseTitle: "Angular in Steps",
    title: "Directives & Routing",
    subtitle: "Angular Architecture & Guards",
    lastScore: 9.8,
    gradeLabel: "Great",
    gradeColor: "text-green-600 dark:text-green-400",
    questionsCount: 5,
    timeLimitMinutes: 12,
    questions: [
      {
        id: "q21",
        question: "In Angular modern syntax, how do you render conditional blocks?",
        options: ["*ngIf", "@if (condition) { ... }", "<ng-conditional>", "v-if"],
        correctIndex: 1,
        explanation: "Angular's new control flow syntax uses `@if` directly inside templates."
      },
      {
        id: "q22",
        question: "Which hook or function is used to create reactive reactive state in Angular Signals?",
        options: ["signal()", "useState()", "ref()", "observable()"],
        correctIndex: 0,
        explanation: "The `signal(initialValue)` function creates a writable reactive signal."
      },
      {
        id: "q23",
        question: "What route guard interface is commonly used to protect authenticated routes?",
        options: ["CanActivate", "CanDestroy", "CanMount", "CanRender"],
        correctIndex: 0,
        explanation: "`CanActivate` checks whether a user has permission to navigate to a route."
      },
      {
        id: "q24",
        question: "What decorator or property defines a component that does not require an NgModule?",
        options: ["standalone: true", "modular: false", "isolated: true", "root: true"],
        correctIndex: 0,
        explanation: "Setting `standalone: true` makes an Angular component self-contained."
      },
      {
        id: "q25",
        question: "Which rxjs operator transforms the emitted values of an observable stream?",
        options: ["map()", "filter()", "tap()", "catchError()"],
        correctIndex: 0,
        explanation: "`map()` applies a projection function to each item in the observable stream."
      }
    ]
  },
  {
    id: "quiz-3",
    courseId: "course-3",
    courseTitle: "Bootstrap Foundations",
    title: "Responsive & Retina",
    subtitle: "CSS Breakpoints & Asset Density",
    lastScore: 3.4,
    gradeLabel: "Failed",
    gradeColor: "text-rose-600 dark:text-rose-400",
    questionsCount: 4,
    timeLimitMinutes: 8,
    questions: [
      {
        id: "q31",
        question: "What is the standard base viewport width for the 'md' breakpoint in Bootstrap?",
        options: ["576px", "768px", "992px", "1200px"],
        correctIndex: 1,
        explanation: "Bootstrap's medium breakpoint `md` starts at 768px."
      },
      {
        id: "q32",
        question: "How do you provide 2x pixel density images for retina displays in HTML?",
        options: ["srcset attribute", "retina=true attribute", "pixel-ratio tag", "zoom=200%"],
        correctIndex: 0,
        explanation: "`<img srcset='hero.png 1x, hero@2x.png 2x'>` informs high-DPI screens."
      },
      {
        id: "q33",
        question: "Which Tailwind CSS class applies horizontal auto margins to center an element?",
        options: ["mx-auto", "my-auto", "align-center", "m-center"],
        correctIndex: 0,
        explanation: "`mx-auto` sets `margin-left: auto; margin-right: auto;`."
      },
      {
        id: "q34",
        question: "Which HTML meta tag is essential for responsive mobile viewport scaling?",
        options: ["<meta name='viewport' content='width=device-width, initial-scale=1.0'>", "<meta name='mobile' content='true'>", "<meta name='screen' content='responsive'>", "<meta name='scale' content='100%'>"],
        correctIndex: 0,
        explanation: "The viewport meta tag establishes the virtual canvas width equal to the device screen."
      }
    ]
  }
];

export const initialBadges = [
  {
    id: "badge-1",
    name: "Star Achiever",
    icon: "star",
    color: "bg-purple-600 text-white",
    description: "Completed first lesson with flying colors",
    earnedAt: "2026-02-10"
  },
  {
    id: "badge-2",
    name: "Top Performer",
    icon: "trophy",
    color: "bg-blue-600 text-white",
    description: "Scored over 9.5 in Angular Directives & Routing Quiz",
    earnedAt: "2026-02-14"
  },
  {
    id: "badge-3",
    name: "Graduate Scholar",
    icon: "graduation",
    color: "bg-emerald-600 text-white",
    description: "Finished 2 full learning curriculum modules",
    earnedAt: "2026-02-20"
  },
  {
    id: "badge-4",
    name: "Code Contributor",
    icon: "fork",
    color: "bg-amber-500 text-white",
    description: "Contributed 5+ helpful solutions in community forum",
    earnedAt: "2026-02-22"
  },
  {
    id: "badge-5",
    name: "Diamond Member",
    icon: "diamond",
    color: "bg-rose-500 text-white",
    description: "Maintained a 7-day study streak",
    earnedAt: "2026-02-28"
  }
];

export const initialCertificates = [
  {
    id: "cert-1",
    certificateCode: "LMS-ANGULAR-98214",
    courseId: "course-2",
    courseTitle: "Angular in Steps: From Zero to Hero",
    recipientName: "Bill Evans",
    recipientEmail: "bill@example.com",
    instructorName: "Sarah Jenkins",
    issueDate: "February 22, 2026",
    grade: "98% Distinction",
    pdfUrl: "#"
  },
  {
    id: "cert-2",
    certificateCode: "LMS-HTML-73912",
    courseId: "course-1",
    courseTitle: "Basics of HTML & Modern CSS3",
    recipientName: "Bill Evans",
    recipientEmail: "bill@example.com",
    instructorName: "Adrian Demian",
    issueDate: "January 15, 2026",
    grade: "92% Honors",
    pdfUrl: "#"
  }
];

export const initialForumPosts = [
  {
    id: "post-1",
    title: "Can someone help me with Angular Signals vs RxJS Observables?",
    topic: "Angular.JS",
    author: "Adrian Demian",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    content: "When should I prefer Angular Signals over RxJS BehaviorSubjects in modern Angular 18/19 applications?",
    timeAgo: "1 hr ago",
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    upvotes: 14,
    replies: [
      {
        id: "rep-1",
        author: "Sarah Jenkins",
        authorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        content: "Signals are ideal for synchronous UI state and fine-grained change detection. Use RxJS when dealing with asynchronous events, websockets, debounceTime, or complex stream combination!",
        timeAgo: "45 min ago"
      }
    ]
  },
  {
    id: "post-2",
    title: "Best approach for CSS Grid auto-fill vs auto-fit responsive cards?",
    topic: "Basics of HTML & CSS",
    author: "Elena Rostova",
    authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    content: "I want cards to stretch and fill the whole row when there are only 2 items on screen. What formula should I use?",
    timeAgo: "2 hrs ago",
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    upvotes: 9,
    replies: [
      {
        id: "rep-2",
        author: "Adrian Demian",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        content: "Use `repeat(auto-fit, minmax(280px, 1fr))`! `auto-fit` collapses empty tracks and expands items to fill remaining horizontal room.",
        timeAgo: "1 hr ago"
      }
    ]
  },
  {
    id: "post-3",
    title: "How to properly structure JWT authentication in Express & React 19?",
    topic: "Full Stack Development",
    author: "Bill Evans",
    authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    content: "Should auth tokens be stored in memory or HttpOnly cookies? Let's discuss security best practices.",
    timeAgo: "3 hrs ago",
    createdAt: new Date(Date.now() - 10800000).toISOString(),
    upvotes: 21,
    replies: [
      {
        id: "rep-3",
        author: "Marcus Vance",
        authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
        content: "HttpOnly cookies mitigate XSS token theft! Pair with CSRF tokens or SameSite=Strict for complete security.",
        timeAgo: "2 hrs ago"
      }
    ]
  }
];

export const defaultStudentUser = {
  id: "user-student-1",
  name: "Bill Evans",
  email: "bill@example.com",
  role: "student",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
  subscription: {
    plan: "Pro Annual Membership",
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
};

export const defaultInstructorUser = {
  id: "user-instructor-1",
  name: "Adrian Demian",
  email: "adrian@example.com",
  role: "instructor",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  title: "Lead Curriculum Architect",
  stats: {
    coursesCreated: 3,
    totalStudents: 1420,
    totalReviews: 685,
    avgRating: 4.88
  }
};
