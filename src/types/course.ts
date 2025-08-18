export interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  category: string;
  duration: number; // in minutes
  level: 'beginner' | 'intermediate' | 'advanced';
  thumbnail: string;
  tags: string[];
  requirements: string[];
  learningOutcomes: string[];
  curriculum: CurriculumItem[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CurriculumItem {
  title: string;
  type: 'video' | 'text' | 'quiz';
  duration: number;
  content: string;
  order: number;
}

export interface CoursesResponse {
  success: boolean;
  data: {
    courses: Course[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalCourses: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
  message: string;
}

export interface PurchasedCoursesResponse {
  success: boolean;
  data: {
    courses: Course[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalCourses: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
  message: string;
}