import React from "react";
import Button from "../../components/atom/button/button";
import { api } from "../../utils/api";
import type { Course } from "../../types/course";
import { CheckCircle2, Clock, User, BookOpen, Star } from "lucide-react";

export default function CourseDetail({
                                       courseId,
                                       onCheckout,
                                     }: {
  courseId: string;
  onCheckout: (course: Course) => void;
}) {
  const [course, setCourse] = React.useState<Course | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        // For now, we'll get the course from the courses list
        // In a real app, you'd have a separate endpoint for single course
        const response = await api.getCourses();
        const foundCourse = response.data.courses.find(c => c._id === courseId);
        if (foundCourse) {
          setCourse(foundCourse);
        } else {
          setError("Course not found");
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

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
          <div className="text-slate-300">Loading course details...</div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="text-center">
          <p className="text-red-400">{error || "Course not found"}</p>
          <Button
            onClick={() => history.back()}
            variant="outline"
            className="mt-4"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
      <div className="mx-auto max-w-5xl px-4 py-12">
        <Button
            className="text-sm text-slate-400 hover:text-slate-200"
            onClick={() => history.back()}
        >
          &larr; Back to Courses
        </Button>

        <div className="mt-6 grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Header */}
            <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-6">
              <div className="mb-4">
                <img
                  src={course.thumbnail || "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800"}
                  alt={course.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              
              <div className="flex items-center gap-2 text-sm mb-3">
                <span className="rounded-lg border border-white/10 text-slate-300 px-2 py-0.5">
                  {course.level}
                </span>
                <span className="text-slate-400">• {formatDuration(course.duration)}</span>
                <span className="text-slate-400">• {course.category}</span>
              </div>
              
              <h1 className="text-3xl font-semibold mb-3">{course.title}</h1>
              <p className="text-slate-300 mb-4">{course.description}</p>
              
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>By {course.instructor}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatDuration(course.duration)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.curriculum.length} lessons</span>
                </div>
              </div>
            </div>

            {/* Learning Outcomes */}
            <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-6">
              <h3 className="font-semibold text-xl mb-4">What you'll learn:</h3>
              <ul className="grid gap-3">
                {course.learningOutcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            {course.requirements.length > 0 && (
              <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-6">
                <h3 className="font-semibold text-xl mb-4">Requirements:</h3>
                <ul className="space-y-2">
                  {course.requirements.map((req, i) => (
                    <li key={i} className="text-slate-300 flex items-start gap-2">
                      <span className="text-slate-500 mt-2">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Curriculum */}
            <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-6">
              <h3 className="font-semibold text-xl mb-4">Course Curriculum:</h3>
              <div className="space-y-3">
                {course.curriculum
                  .sort((a, b) => a.order - b.order)
                  .map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-950/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500 text-sm">#{item.order}</span>
                        <span className="text-slate-300">{item.title}</span>
                        <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">
                          {item.type}
                        </span>
                      </div>
                      <span className="text-slate-400 text-sm">{item.duration}min</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-white mb-2">
                  ${course.price.toFixed(2)}
                </div>
                <p className="text-slate-400 text-sm">One-time payment</p>
              </div>
              
              <Button
                onClick={() => onCheckout(course)}
                variant="secondary"
                className="w-full mb-4 text-lg py-3"
              >
                Buy Now
              </Button>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Level:</span>
                  <span className="text-white capitalize">{course.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Duration:</span>
                  <span className="text-white">{formatDuration(course.duration)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Lessons:</span>
                  <span className="text-white">{course.curriculum.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Category:</span>
                  <span className="text-white capitalize">{course.category.replace('-', ' ')}</span>
                </div>
              </div>
              
              {course.tags.length > 0 && (
                <div className="mt-6">
                  <p className="text-slate-400 text-sm mb-2">Tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag, i) => (
                      <span key={i} className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}
