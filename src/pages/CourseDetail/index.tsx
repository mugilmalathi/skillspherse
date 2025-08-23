import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/atom/button/button';
import Card from '../../components/atom/card/card';
import { api } from '../../utils/api';
import { Course } from '../../types/course';
import './styles.css';

interface CourseDetailProps {
  courseId?: string;
  onCheckout?: (courseId: string) => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ courseId: propCourseId, onCheckout }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const courseId = propCourseId || id;

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) {
        setError('Course ID not provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const courseData = await api.getCourse(courseId);
        setCourse(courseData);
      } catch (err) {
        setError('Failed to load course details');
        console.error('Error fetching course:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleCheckout = () => {
    if (course) {
      if (onCheckout) {
        onCheckout(course.id);
      } else {
        navigate(`/checkout/${course.id}`);
      }
    }
  };

  if (loading) {
    return (
      <div className="course-detail-container">
        <div className="loading">Loading course details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="course-detail-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="course-detail-container">
        <div className="error">Course not found</div>
      </div>
    );
  }

  return (
    <div className="course-detail-container">
      <Card className="course-detail-card">
        <div className="course-header">
          <h1 className="course-title">{course.title}</h1>
          <div className="course-price">${course.price}</div>
        </div>
        
        <div className="course-content">
          <div className="course-description">
            <h2>Description</h2>
            <p>{course.description}</p>
          </div>
          
          <div className="course-details">
            <div className="detail-item">
              <span className="label">Duration:</span>
              <span className="value">{course.duration || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="label">Level:</span>
              <span className="value">{course.level || 'Beginner'}</span>
            </div>
            <div className="detail-item">
              <span className="label">Instructor:</span>
              <span className="value">{course.instructor || 'TBD'}</span>
            </div>
          </div>
        </div>
        
        <div className="course-actions">
          <Button 
            onClick={handleCheckout}
            className="checkout-button"
          >
            Enroll Now - ${course.price}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CourseDetail;