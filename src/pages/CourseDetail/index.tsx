import React from "react";
import Button from "../../components/atom/button/button";
import { api } from "../../utils/api";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, Clock, User, BookOpen, Star } from "lucide-react";

interface CourseDetailData {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  category: string;
  duration: number;
  level: string;
  thumbnail: string;
  rating: number;
  totalRatings: number;
  enrollmentCount: number;
  tags: string[];
  requirements: string[];
  learningOutcomes: string[];
  createdAt: string;
}

export default function CourseDetail({
                                       courseId,
                                       onCheckout,
                                     }: {
  courseId: string;
  onCheckout: (course: any) => void;
}) {
  const [course, setCourse] = React.useState<CourseDetailData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.getCourseDetail(courseId);
        if (response.success && response.data) {
          setCourse(response.data);
        } else {
          setError(response.message || "Course not found");
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
        <Alert className="mb-6">
          <AlertDescription className="text-red-400">
            {error || "Course not found"}
          </AlertDescription>
        </Alert>
        <div className="text-center">
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
                  src="/src/assets/images/course.png"}
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
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-slate-400">{course.rating} ({course.totalRatings} reviews)</span>
                </div>
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
                  <User className="h-4 w-4" />
                  <span>{course.enrollmentCount} students</span>
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

            {/* Tags */}
            {course.tags.length > 0 && (
              <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-6">
                <h3 className="font-semibold text-xl mb-4">Course Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag, i) => (
                    <span key={i} className="text-sm bg-slate-800 text-slate-300 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-white mb-2">
                  ${course.price.toFixed(2)}
                </div>
                <p className="text-slate-400 text-sm">One-time payment</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-slate-300">{course.rating}</span>
                  <span className="text-slate-400">({course.totalRatings} reviews)</span>
                </div>
              </div>
              
              <Button
                onClick={() => onCheckout({
                  _id: course.id,
                  title: course.title,
                  description: course.description,
                  instructor: course.instructor,
                  price: course.price,
                  category: course.category,
                  duration: course.duration,
                  level: course.level,
                  thumbnail: course.thumbnail,
                  tags: course.tags,
                  requirements: course.requirements,
                  learningOutcomes: course.learningOutcomes,
                  curriculum: [],
                  isPublished: true,
                  createdAt: course.createdAt,
                  updatedAt: course.createdAt
                })}
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
                  <span className="text-slate-400">Students:</span>
                  <span className="text-white">{course.enrollmentCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Category:</span>
                  <span className="text-white capitalize">{course.category.replace('-', ' ')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
