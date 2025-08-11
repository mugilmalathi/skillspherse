import Button from "../../components/atom/button/button";
import { COURSES } from "../../data";
import { CheckCircle2, GraduationCap, BookOpenText, PlayCircle } from "lucide-react";

export default function Home({ onViewCourse }: { onViewCourse: (id: number) => void }) {
    return (
        <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 overflow-x-hidden">
            {/* HERO */}
            <div className="mx-auto px-4 py-20 md:py-28 relative overflow-hidden">
                <h1 className="text-3xl md:text-6xl font-bold tracking-tight">
                    Master Soft Skills with VR Training
                </h1>

                <p className="mt-4 max-w-2xl text-slate-300">
                    Practice communication, teamwork, and professional skills in realistic VR simulations.
                    Get AI-powered feedback to improve your effectiveness.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                    <Button variant="primary">
                        Explore Courses
                    </Button>

                    <Button variant="outline">
                        <span className="inline-flex items-center gap-2">
                            <PlayCircle className="h-4 w-4" /> Start Free Trial
                        </span>
                    </Button>
                </div>

                {/* Decorative blob – anchored so it never creates horizontal scroll */}
                <div
                    className="
                        pointer-events-none absolute top-0 right-[-8rem]
                        h-[28rem] w-[28rem]
                        -translate-y-1/4
                        blur-3xl opacity-30
                        bg-gradient-to-tr from-indigo-500 via-violet-500 to-fuchsia-500
                        rounded-full
                    "
                />
            </div>

            {/* FEATURES */}
            <div className="mx-auto px-4 py-12 grid min-w-0 gap-6 md:grid-cols-3">
                {[
                    { icon: <GraduationCap className="h-5 w-5" />, title: "Realistic VR Sims", text: "Practice in lifelike scenarios with adaptive AI." },
                    { icon: <BookOpenText className="h-5 w-5" />, title: "Structured Curricula", text: "Beginner-friendly paths with measurable outcomes." },
                    { icon: <CheckCircle2 className="h-5 w-5" />, title: "AI Feedback", text: "Personalized notes on tone, pace, confidence, and clarity." },
                ].map((it, i) => (
                    <div key={i} className="bg-slate-900/70 border border-white/10 rounded-2xl p-6">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl grid place-items-center bg-gradient-to-tr from-indigo-500 to-fuchsia-500 text-white shadow-inner">
                                {it.icon}
                            </div>
                            <div className="font-semibold">{it.title}</div>
                        </div>
                        <p className="mt-2 text-slate-300">{it.text}</p>
                    </div>
                ))}
            </div>

            {/* POPULAR COURSES */}
            <div className="mx-auto px-4 py-12">
                <div className="flex items-end justify-between gap-4">
                    <h2 className="text-xl md:text-3xl font-bold">Popular Courses</h2>
                    <Button variant="outline">
                        View All Courses
                    </Button>
                </div>

                <div className="mt-6 grid min-w-0 gap-6 md:grid-cols-3">
                    {COURSES.map((c) => (
                        <div key={c.id} className="bg-slate-900/70 border border-white/10 rounded-2xl p-6">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="rounded-lg border border-white/10 text-slate-300 px-2 py-0.5">
                                    {c.level}
                                </span>
                                <span className="text-slate-400">• {c.duration}</span>
                            </div>

                            <h3 className="mt-2 font-semibold">{c.title}</h3>

                            <div className="mt-4 flex items-center justify-between">
                                <Button
                                    onClick={() => onViewCourse(c.id)}
                                    variant="primary"
                                >
                                    View Details →
                                </Button>
                                <div className="text-slate-200 font-semibold">${c.price.toFixed(2)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}