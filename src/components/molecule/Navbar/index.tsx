import React from "react";
import { LogOut, Menu } from "lucide-react";
import Button from "../../atom/button/button";

type Props = {
    page: string;
    setPage: (p: string) => void;
    isAuthed: boolean;
    onLogout: () => void;
    userName?: string;
};

const navItem = (
    label: string,
    to: string,
    active: boolean,
    onClick: (p: string) => void
) => (
    <div
        className={`px-3 py-2 text-sm rounded-xl cursor-pointer transition ${
            active ? "bg-white/10" : "hover:bg-white/5"
        }`}
        onClick={() => onClick(to)}
    >
        {label}
    </div>
);

export default function Navbar({ page, setPage, isAuthed, onLogout, userName }: Props) {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="sticky top-0 z-50 bg-slate-900/60 backdrop-blur text-slate-100">
            <div className="mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-fuchsia-500 grid place-items-center font-bold">
                        VR
                    </div>
                    <div className="font-semibold">ImmersiveTrain</div>
                </div>

                {/* Desktop menu */}
                <div className="hidden md:flex items-center gap-1">
                    {navItem("Home", "home", page === "home", setPage)}
                    {isAuthed && navItem("Courses", "courses", page === "courses", setPage)}
                    {isAuthed && navItem("My Courses", "my-courses", page === "my-courses", setPage)}
                    {isAuthed && navItem("Progress", "progress", page === "progress", setPage)}

                    <div className="mx-3 h-6 w-px bg-white/10" />

                    {!isAuthed ? (
                        <div className="flex items-center gap-2">
                            <Button
                                variant="primary"
                                onClick={() => setPage("login")}
                            >
                                Login
                            </Button>
                            <Button
                                className="rounded-xl px-3 py-2 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white hover:from-indigo-600 hover:to-fuchsia-600 transition-colors"
                                onClick={() => setPage("registration")}
                            >
                                Sign Up
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <span className="text-white">Welcome, {userName}</span>
                            <Button
                                variant="primary"
                                onClick={onLogout}
                            >
                                <span className="inline-flex items-center gap-2">
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </span>
                            </Button>
                        </div>
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
                        <div className="absolute right-3 mt-3 p-2 bg-slate-900/70 border border-white/10 rounded-2xl shadow-xl w-48">
                            <div className="grid gap-1 text-left">
                                {navItem("Home", "home", page === "home", (p) => {
                                    setPage(p);
                                    setOpen(false);
                                })}
                                {isAuthed &&
                                    navItem("Courses", "courses", page === "courses", (p) => {
                                        setPage(p);
                                        setOpen(false);
                                    })}
                                {isAuthed &&
                                    navItem("My Courses", "my-courses", page === "my-courses", (p) => {
                                        setPage(p);
                                        setOpen(false);
                                    })}
                                {isAuthed &&
                                    navItem("Progress", "progress", page === "progress", (p) => {
                                    setPage(p);
                                    setOpen(false);
                                })}

                                {!isAuthed ? (
                                    <>
                                        <Button
                                            className="rounded-xl px-3 py-2 border border-white bg-transparent text-white hover:bg-white hover:text-white transition-colors w-full text-left"
                                            onClick={() => {
                                                setPage("login");
                                                setOpen(false);
                                            }}
                                        >
                                            Login
                                        </Button>
                                        <Button
                                            className="rounded-xl px-3 py-2 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white hover:from-indigo-600 hover:to-fuchsia-600 transition-colors w-full text-left"
                                            onClick={() => {
                                                setPage("registration");
                                                setOpen(false);
                                            }}
                                        >
                                            Sign Up
                                        </Button>
                                    </>
                                ) : (
                                    <div className="space-y-2">
                                        <div className="text-white px-3 py-2">Welcome, {userName}</div>
                                        <Button
                                            variant="primary"
                                            onClick={() => {
                                                onLogout();
                                                setOpen(false);
                                            }}
                                        >
                                            <span className="inline-flex items-center gap-2">
                                                <LogOut className="h-4 w-4" />
                                                Logout
                                            </span>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}