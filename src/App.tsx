
import React from "react";
import Navbar from "./components/molecule/Navbar";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Checkout from "./pages/Checkout";
import PaymentGateway from "./pages/PaymentGateway";
import MyCourses from "./pages/MyCourses";
import Login from "./pages/Login";
import Registration from "@/pages/Registration";
import { AuthManager } from "./utils/auth";
import type { Course } from "./types/course";

type Page = "home" | "courses" | "course-detail" | "checkout" | "payment" | "my-courses" | "login" | "progress" | "registration";

export default function App(){
  const [page, setPage] = React.useState<Page>("home");
  const [isAuthed, setAuthed] = React.useState(AuthManager.isAuthenticated());
  const [userName, setUserName] = React.useState(AuthManager.getUser()?.name || "");
  const [activeCourse, setActiveCourse] = React.useState<Course | null>(null);
  const [activeCourseId, setActiveCourseId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const user = AuthManager.getUser();
    if (user) {
      setAuthed(true);
      setUserName(user.name);
    }
  }, []);

  const handleLogin = () => {
    const user = AuthManager.getUser();
    if (user) {
      setAuthed(true);
      setUserName(user.name);
      setPage("home");
    }
  };

  const handleLogout = () => {
    AuthManager.clearAuth();
    setAuthed(false);
    setUserName("");
    setPage("home");
  };

  const handleViewCourse = (courseId: string) => {
    setActiveCourseId(courseId);
    setPage("course-detail");
  };

  const handleCheckout = (course: Course) => {
    setActiveCourse(course);
    setPage("checkout");
  };

  const handlePayment = () => {
    if (activeCourse) {
      setPage("payment");
    }
  };

  const handlePaymentSuccess = () => {
    setActiveCourse(null);
    setActiveCourseId(null);
    setPage("home");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar 
        page={page} 
        setPage={setPage} 
        isAuthed={isAuthed} 
        onLogout={handleLogout}
        userName={userName}
      />
      {page === "home" && (
        <Home 
          onViewCourse={handleViewCourse}
          onViewAllCourses={() => setPage("courses")}
        />
      )}
      {page === "courses" && <Courses onView={handleViewCourse} />}
      {page === "course-detail" && activeCourseId && (
        <CourseDetail 
          courseId={activeCourseId} 
          onCheckout={handleCheckout} 
        />
      )}
      {page === "checkout" && activeCourse && (
        <Checkout 
          course={activeCourse} 
          onSuccess={handlePayment} 
        />
      )}
      {page === "payment" && activeCourse && (
        <PaymentGateway 
          amount={activeCourse.price} 
          onSuccess={handlePaymentSuccess} 
        />
      )}
      {page === "my-courses" && <MyCourses />}
      {page === "login" && <Login onLogin={handleLogin} />}
      {page === "registration" && <Registration onNavigateToLogin={() => setPage("login")} />}
      {page === "progress" && <div className="p-10 text-slate-300">Progress dashboard (POC placeholder).</div>}
      <footer className="mt-20 border-t border-white/10 bg-slate-900">
        <div className="mx-auto px-4 py-10 grid gap-6 md:grid-cols-3 text-slate-400">
          <div>
            <div className="font-semibold text-slate-200">VR ImmersiveTrain</div>
            <p className="mt-2">
              Transform your soft skills through immersive VR/AR training experiences.
            </p>
          </div>
          <div>
            <div className="font-semibold text-slate-200">Quick Links</div>
            <ul className="mt-2 grid gap-1">
              <li>
                  Courses
              </li>
              <li>About Us</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-slate-200">Resources</div>
            <ul className="mt-2 grid gap-1">
              <li>Help Center</li>
              <li>Documentation</li>
              <li>Community</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto  px-4 py-4 border-t border-white/10 text-sm text-slate-500">
          © 2025 ImmersiveTrain. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
