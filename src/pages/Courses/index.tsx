import React from "react";
import Button from "../../components/atom/button/button";
import { api } from "../../utils/api";
import type { Course } from "../../types/course";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search } from "lucide-react";

export default function Courses({ onView }: { onView: (courseId: string) => void }) {
    const [courses, setCourses] = React.useState<Course[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedCategory, setSelectedCategory] = React.useState("");
    const [selectedLevel, setSelectedLevel] = React.useState("");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);

    const categories = ["programming", "design", "business", "marketing", "data-science"];
    const levels = ["beginner", "intermediate", "advanced"];

    const fetchCourses = React.useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const params = {
                page: currentPage,
                limit: 12,
                ...(searchTerm && { search: searchTerm }),
                ...(selectedCategory && { category: selectedCategory }),
                ...(selectedLevel && { level: selectedLevel }),
                sortBy: "createdAt",
                sortOrder: "desc" as const
            };

            const response = await api.getCourses(params);
            if (response.success && response.data) {
                setCourses(response.data.courses || []);
                setTotalPages(response.data.pagination?.totalPages || 1);
            } else {
                setError(response.message || "Failed to fetch courses");
            }
        } catch (err: any) {
            setError(err.message || "Failed to fetch courses");
        } finally {
            setLoading(false);
        }
    }, [currentPage, searchTerm, selectedCategory, selectedLevel]);

    React.useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchCourses();
    };

    const formatDuration = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours > 0) {
            return `${hours}h ${mins}m`;
        }
        return `${mins}m`;
    };

    if (loading && courses.length === 0) {
        return (
            <div className="mx-auto px-4 py-12">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-slate-300">Loading courses...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto px-4 py-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-6">All Courses</h1>

                {/* Search and Filters */}
                <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-6 mb-6">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/40"
                            />
                        </div>

                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-2 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-400/40"
                        >
                            <option value="">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1).replace("-", " ")}
                                </option>
                            ))}
                        </select>

                        <select
                            value={selectedLevel}
                            onChange={(e) => setSelectedLevel(e.target.value)}
                            className="px-4 py-2 bg-slate-950 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-400/40"
                        >
                            <option value="">All Levels</option>
                            {levels.map((level) => (
                                <option key={level} value={level}>
                                    {level.charAt(0).toUpperCase() + level.slice(1)}
                                </option>
                            ))}
                        </select>

                        <Button type="submit" variant="secondary">
                            Search
                        </Button>
                    </form>
                </div>
            </div>

            {error && (
                <Alert className="mb-6">
                    <AlertDescription className="text-red-400">
                        {error}
                    </AlertDescription>
                </Alert>
            )}

            {courses.length === 0 && !loading ? (
                <div className="text-center py-12">
                    <p className="text-slate-400">No courses found matching your criteria.</p>
                </div>
            ) : (
                <>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {courses.map((course) => (
                            <div
                                key={course._id}
                                className="bg-slate-900/70 border border-white/10 rounded-2xl p-6 hover:bg-slate-900/90 transition-colors"
                            >
                                <div className="mb-4">
                                    <img
                                        src={
                                            "/src/assets/images/course.png"
                                        }
                                        alt={course.title}
                                        className="w-full h-40 object-cover rounded-lg"
                                    />
                                </div>

                                <div className="flex items-center gap-2 text-sm mb-2">
                  <span className="rounded-lg border border-white/10 text-slate-300 px-2 py-0.5">
                    {course.level}
                  </span>
                                    <span className="text-slate-400">• {formatDuration(course.duration)}</span>
                                    <span className="text-slate-400">• {course.category}</span>
                                </div>

                                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
                                <p className="text-slate-400 text-sm mb-3 line-clamp-2">{course.description}</p>
                                <p className="text-slate-500 text-xs mb-4">By {course.instructor}</p>

                                <div className="flex items-center justify-between">
                                    <Button onClick={() => onView(course._id)} variant="primary">
                                        View Details →
                                    </Button>
                                    <div className="text-slate-200 font-semibold text-lg">
                                        ₹{course.price.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-8">
                            <Button
                                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                variant="outline"
                            >
                                Previous
                            </Button>
                            <span className="text-slate-300">
                Page {currentPage} of {totalPages}
              </span>
                            <Button
                                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                variant="outline"
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
