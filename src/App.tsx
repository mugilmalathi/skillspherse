
import React from "react";
import Navbar from "./components/molecule/Navbar";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Checkout from "./pages/Checkout";
import MyCourses from "./pages/MyCourses";
import Login from "./pages/Login";
import Registration from "@/pages/Registration";

type Page = "home" | "courses" | "course-detail" | "checkout" | "my-courses" | "login" | "progress"   | "registration";

export default function App(){
  const [page, setPage] = React.useState<Page>("home");
  const [isAuthed, setAuthed] = React.useState(false);
  const [owned, setOwned] = React.useState<number[]>([]);
  const [activeCourse, setActiveCourse] = React.useState<number | null>(1);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar page={page} setPage={setPage} isAuthed={isAuthed} onLogout={()=>setAuthed(false)} />
      {page === "home" && <Home onViewCourse={(id)=>{ setActiveCourse(id); setPage("course-detail"); }} />}
      {page === "courses" && <Courses onView={(id)=>{ setActiveCourse(id); setPage("course-detail"); }} />}
      {page === "course-detail" && activeCourse!=null && <CourseDetail id={activeCourse} onCheckout={(id)=>{ setActiveCourse(id); setPage("checkout"); }} />}
      {page === "checkout" && activeCourse!=null && <Checkout id={activeCourse} onSuccess={()=>{ setOwned(v=>Array.from(new Set(v.concat(activeCourse)))); setPage("my-courses"); }} />}
      {page === "my-courses" && <MyCourses owned={owned} />}
      {page === "login" && <Login onLogin={()=>{ setAuthed(true); setPage("home"); }} />}
      {page === "registration" && <Registration />}
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
