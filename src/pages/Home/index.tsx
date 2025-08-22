import React from "react";
import Button from "../../components/atom/button/button";
import { api } from "../../utils/api";
import type { Course } from "../../types/course";
import { CheckCircle2, GraduationCap, BookOpenText, PlayCircle } from "lucide-react";

export default function Home({ 
    onViewCourse, 
    onViewAllCourses 
}: { 
    onViewCourse: (courseId: string) => void;
    onViewAllCourses: () => void;
}) {
    const [featuredCourses, setFeaturedCourses] = React.useState<Course[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchFeaturedCourses = async () => {
            try {
                const response = await api.getCourses({ limit: 3, sortBy: "createdAt", sortOrder: "desc" });
                setFeaturedCourses(response.data ?? []);
            } catch (error) {
                console.error("Failed to fetch featured courses:", error);
                // Set empty array as fallback when API is unavailable
                setFeaturedCourses([]);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedCourses();
    }, []);

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours > 0) {
            return `${hours}h ${mins}m`;
        }
        return `${mins}m`;
    };

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

                <div className="mt-8 flex flex-wrap gap-3 text-white">
                    <Button variant="primary">
                        <span onClick={onViewAllCourses}>Explore Courses</span>
                    </Button>

                    <Button className="rounded-xl px-3 py-2 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white hover:from-indigo-600 hover:to-fuchsia-600 transition-colors">
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
                    <Button variant="primary" onClick={onViewAllCourses}>
                        View All Courses
                    </Button>
                </div>

                {loading ? (
                    <div className="mt-6 grid min-w-0 gap-6 md:grid-cols-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-slate-900/70 border border-white/10 rounded-2xl p-6 animate-pulse">
                                <div className="h-40 bg-slate-800 rounded-lg mb-4"></div>
                                <div className="h-4 bg-slate-800 rounded mb-2"></div>
                                <div className="h-6 bg-slate-800 rounded mb-4"></div>
                                <div className="flex justify-between items-center">
                                    <div className="h-8 w-24 bg-slate-800 rounded"></div>
                                    <div className="h-6 w-16 bg-slate-800 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mt-6 grid min-w-0 gap-6 md:grid-cols-3">
                        {featuredCourses.length > 0 ? featuredCourses.map((course) => (
                            <div key={course._id} className="bg-slate-900/70 border border-white/10 rounded-2xl p-6 hover:bg-slate-900/90 transition-colors">
                                <div className="mb-4">
                                    <img
                                        src={course.thumbnail || "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=400"}
                                        alt={course.title}
                                        className="w-full h-40 object-cover rounded-lg"
                                    />
                                </div>
                                
                                <div className="flex items-center gap-2 text-sm mb-2">
                                    <span className="rounded-lg border border-white/10 text-slate-300 px-2 py-0.5">
                                        {course.level}
                                    </span>
                                    <span className="text-slate-400">• {formatDuration(course.duration)}</span>
                                </div>

                                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
                                <p className="text-slate-500 text-sm mb-3">By {course.instructor}</p>

                                <div className="flex items-center justify-between">
                                    <Button
                                        onClick={() => onViewCourse(course._id)}
                                        variant="primary"
                                    >
                                        View Details →
                                    </Button>
                                    <div className="text-slate-200 font-semibold">₹{course.price.toFixed(2)}</div>
                                </div>
                            </div>
                        )) : (
                            <div className="col-span-full text-center py-12">
                                <div className="text-slate-400 mb-4">
                                    <GraduationCap className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                    <p>Unable to load courses at the moment.</p>
                                    <p className="text-sm mt-1">Please check that the API server is running.</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}