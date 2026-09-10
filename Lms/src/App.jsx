import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./utils/AuthContext";
import Sidebar from "./component/Sidebar";
import Header from "./component/Header";
import "./App.css";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50/30 to-indigo-50/40 text-slate-800 flex flex-col justify-center">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-row">
      {/* Left Sidebar matching choose-student-app.png */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen lg:pl-64 transition-all duration-300">
        {/* Top Navbar */}
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Dynamic Route View */}
        <main className="flex-1 bg-[#f8fafc] pb-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
}