import React from "react";
import Button from "../../components/atom/button/button";
import { api } from "../../utils/api";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BookOpen, Clock, User, Play } from "lucide-react";

interface PurchasedCourse {
  _id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  category: string;
  duration: number;
  level: string;
  thumbnail: string;
  tags: string[];
  requirements: string[];
  learningOutcomes: string[];
  curriculum: any[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function MyCourses() {
  const [courses, setCourses] = React.useState<PurchasedCourse[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchPurchasedCourses = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getPurchasedCourses();
      if (response.success && response.data) {
        setCourses(response.data);
      } else {
        setError(response.message || "Failed to fetch purchased courses");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch purchased courses");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchPurchasedCourses();
  }, [fetchPurchasedCourses]);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-slate-300">Loading your courses...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold">My Courses</h1>
      
      {error && (
        <Alert className="mt-6">
          <AlertDescription className="text-red-400">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {courses.length === 0 && !loading ? (
        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-8 text-center">
          <BookOpen className="h-16 w-16 text-slate-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-300 mb-2">No courses yet</h3>
          <p className="text-slate-400 mb-6">You haven't purchased any courses yet. Start learning today!</p>
          <Button variant="secondary">
            Browse Courses
          </Button>
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map(course => (
              <div key={course._id} className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 hover:bg-slate-900/90 transition-colors">
                <div className="mb-4">
                  <img
                    src="/src/assets/images/course.png"
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
                
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.curriculum?.length || 0} lessons</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatDuration(course.duration)}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="secondary" className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    Continue Learning
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
