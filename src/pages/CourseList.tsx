import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { School, AccessTime, Person } from '@mui/icons-material';
import { RootState, AppDispatch } from '../store/store';
import { fetchCourses, enrollInCourse, setFilters } from '../store/slices/coursesSlice';

export default function CourseList() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { courses, loading, filters } = useSelector((state: RootState) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const mockCourses = [
    {
      id: '1',
      title: 'React Development Fundamentals',
      description: 'Learn modern React development with hooks, context, and best practices',
      instructor: 'John Smith',
      difficulty: 'intermediate' as const,
      category: 'Frontend',
      duration: 40,
      thumbnail: '/api/placeholder/300/200',
      modules: [],
      prerequisites: ['JavaScript Basics'],
      enrolled: false,
    },
    {
      id: '2',
      title: 'Python Programming Mastery',
      description: 'Complete Python course from basics to advanced concepts',
      instructor: 'Sarah Johnson',
      difficulty: 'beginner' as const,
      category: 'Backend',
      duration: 60,
      thumbnail: '/api/placeholder/300/200',
      modules: [],
      prerequisites: [],
      enrolled: true,
    },
    {
      id: '3',
      title: 'Data Science with Python',
      description: 'Learn data analysis, visualization, and machine learning',
      instructor: 'Dr. Michael Chen',
      difficulty: 'advanced' as const,
      category: 'Data Science',
      duration: 80,
      thumbnail: '/api/placeholder/300/200',
      modules: [],
      prerequisites: ['Python Programming'],
      enrolled: false,
    },
    {
      id: '4',
      title: 'UI/UX Design Principles',
      description: 'Master user interface and user experience design',
      instructor: 'Emily Davis',
      difficulty: 'intermediate' as const,
      category: 'Design',
      duration: 35,
      thumbnail: '/api/placeholder/300/200',
      modules: [],
      prerequisites: [],
      enrolled: false,
    },
    {
      id: '5',
      title: 'Machine Learning Fundamentals',
      description: 'Introduction to ML algorithms and practical applications',
      instructor: 'Dr. Alex Rodriguez',
      difficulty: 'advanced' as const,
      category: 'AI/ML',
      duration: 70,
      thumbnail: '/api/placeholder/300/200',
      modules: [],
      prerequisites: ['Python Programming', 'Statistics'],
      enrolled: false,
    },
    {
      id: '6',
      title: 'Project Management Essentials',
      description: 'Learn agile methodologies and project leadership skills',
      instructor: 'Lisa Thompson',
      difficulty: 'beginner' as const,
      category: 'Business',
      duration: 25,
      thumbnail: '/api/placeholder/300/200',
      modules: [],
      prerequisites: [],
      enrolled: false,
    },
  ];

  const displayCourses = courses.length > 0 ? courses : mockCourses;

  const filteredCourses = displayCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         course.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory = !filters.category || course.category === filters.category;
    const matchesDifficulty = !filters.difficulty || course.difficulty === filters.difficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleEnroll = (courseId: string) => {
    dispatch(enrollInCourse(courseId));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        📚 Course Catalog
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Discover and enroll in courses to advance your skills
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Search courses"
            value={filters.search}
            onChange={(e) => dispatch(setFilters({ search: e.target.value }))}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={filters.category}
              label="Category"
              onChange={(e) => dispatch(setFilters({ category: e.target.value }))}
            >
              <MenuItem value="">All Categories</MenuItem>
              <MenuItem value="Frontend">Frontend</MenuItem>
              <MenuItem value="Backend">Backend</MenuItem>
              <MenuItem value="Data Science">Data Science</MenuItem>
              <MenuItem value="Design">Design</MenuItem>
              <MenuItem value="AI/ML">AI/ML</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Difficulty</InputLabel>
            <Select
              value={filters.difficulty}
              label="Difficulty"
              onChange={(e) => dispatch(setFilters({ difficulty: e.target.value }))}
            >
              <MenuItem value="">All Levels</MenuItem>
              <MenuItem value="beginner">Beginner</MenuItem>
              <MenuItem value="intermediate">Intermediate</MenuItem>
              <MenuItem value="advanced">Advanced</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Course Grid */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredCourses.map((course) => (
            <Grid item xs={12} md={6} lg={4} key={course.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="div"
                  sx={{
                    height: 200,
                    bgcolor: 'grey.200',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <School sx={{ fontSize: 60, color: 'grey.400' }} />
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2">
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {course.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Person sx={{ fontSize: 16 }} />
                    <Typography variant="body2">{course.instructor}</Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <AccessTime sx={{ fontSize: 16 }} />
                    <Typography variant="body2">{course.duration} hours</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip
                      label={course.difficulty}
                      color={getDifficultyColor(course.difficulty) as any}
                      size="small"
                    />
                    <Chip label={course.category} variant="outlined" size="small" />
                  </Box>

                  {course.prerequisites.length > 0 && (
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                      Prerequisites: {course.prerequisites.join(', ')}
                    </Typography>
                  )}
                </CardContent>
                
                <Box sx={{ p: 2, pt: 0 }}>
                  {course.enrolled ? (
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => navigate(`/courses/${course.id}`)}
                    >
                      Continue Learning
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => handleEnroll(course.id)}
                    >
                      Enroll Now
                    </Button>
                  )}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
