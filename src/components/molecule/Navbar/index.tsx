import React from "react";
import { LogOut, Menu } from "lucide-react";

type Props = {
  page: string;
  setPage: (p: string) => void;
  isAuthed: boolean;
  onLogout: () => void;
};

const link = (label: string, to: string, active: boolean, onClick: (p: string) => void) => (
    <button
        className={`px-3 py-2 text-sm rounded-xl transition ${
            active ? "bg-white/10" : "hover:bg-white/5"
        }`}
        onClick={() => onClick(to)}
    >
      {label}
    </button>
);

export default function Navbar({ page, setPage, isAuthed, onLogout }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
      <div className={`sticky top-0 z-50 bg-slate-900/60 backdrop-blur text-slate-100`}>
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-fuchsia-500 grid place-items-center font-bold">
              VR
            </div>
            <div className="font-semibold">ImmersiveTrain</div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-1">
            {link("Home", "home", page === "home", setPage)}
            {link("Courses", "courses", page === "courses", setPage)}
            {isAuthed && link("My Courses", "my-courses", page === "my-courses", setPage)}
            {link("Progress", "progress", page === "progress", setPage)}

            <div className="mx-3 h-6 w-px bg-white/10" />

            {!isAuthed ? (
                <div className="flex items-center gap-2">
                  <button
                      className="rounded-xl px-3 py-2 hover:bg-white/5"
                      onClick={() => setPage("login")}
                  >
                    Login
                  </button>
                  <button
                      className="rounded-xl px-3 py-2 bg-gradient-to-r from-indigo-500 to-fuchsia-500"
                      onClick={() => setPage("registration")}
                  >
                    Sign Up
                  </button>
                </div>
            ) : (
                <button
                    className="rounded-xl px-3 py-2 bg-white/10 hover:bg-white/15"
                    onClick={onLogout}
                >
              <span className="inline-flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </span>
                </button>
            )}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <button
                className="rounded-xl p-2 hover:bg-white/5"
                onClick={() => setOpen(!open)}
            >
              <Menu className="h-5 w-5" />
            </button>
            {open && (
                <div
                    className={`absolute right-3 mt-3 p-2 bg-slate-900/70 border border-white/10 rounded-2xl shadow-xl w-48`}
                >
                  <div className="grid gap-1 text-left">
                    {link("Home", "home", page === "home", (p) => {
                      setPage(p);
                      setOpen(false);
                    })}
                    {link("Courses", "courses", page === "courses", (p) => {
                      setPage(p);
                      setOpen(false);
                    })}
                    {isAuthed &&
                        link("My Courses", "my-courses", page === "my-courses", (p) => {
                          setPage(p);
                          setOpen(false);
                        })}
                    {link("Progress", "progress", page === "progress", (p) => {
                      setPage(p);
                      setOpen(false);
                    })}

                    {!isAuthed ? (
                        <>
                          {link("Login", "login", page === "login", (p) => {
                            setPage(p);
                            setOpen(false);
                          })}
                          <button
                              className="rounded-xl px-3 py-2 bg-gradient-to-r from-indigo-500 to-fuchsia-500"
                              onClick={() => {
                                setPage("registration");
                                setOpen(false);
                              }}
                          >
                            Sign Up
                          </button>
                        </>
                    ) : (
                        <button
                            className="rounded-xl px-3 py-2 bg-white/10 hover:bg-white/15"
                            onClick={onLogout}
                        >
                    <span className="inline-flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      Logout
                    </span>
                        </button>
                    )}
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
  );
}
