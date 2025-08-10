import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Chip,
  Tabs,
  Tab,
} from '@mui/material';
import { PlayArrow, CheckCircle, Schedule } from '@mui/icons-material';
import { RootState, AppDispatch } from '../store/store';
import { fetchMyCourses } from '../store/slices/coursesSlice';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function MyCourses() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { myCourses } = useSelector((state: RootState) => state.courses);
  const [tab, setTab] = React.useState(0);

  useEffect(() => {
    dispatch(fetchMyCourses());
  }, [dispatch]);

  const mockMyCourses = [
    {
      id: '1',
      title: 'React Development Fundamentals',
      description: 'Learn modern React development',
      instructor: 'John Smith',
      difficulty: 'intermediate' as const,
      category: 'Frontend',
      duration: 40,
      thumbnail: '',
      modules: [],
      prerequisites: [],
      enrolled: true,
      progress: 75,
    },
    {
      id: '2',
      title: 'Python Programming Mastery',
      description: 'Complete Python course',
      instructor: 'Sarah Johnson',
      difficulty: 'beginner' as const,
      category: 'Backend',
      duration: 60,
      thumbnail: '',
      modules: [],
      prerequisites: [],
      enrolled: true,
      progress: 100,
    },
    {
      id: '3',
      title: 'Data Science with Python',
      description: 'Learn data analysis and ML',
      instructor: 'Dr. Michael Chen',
      difficulty: 'advanced' as const,
      category: 'Data Science',
      duration: 80,
      thumbnail: '',
      modules: [],
      prerequisites: [],
      enrolled: true,
      progress: 30,
    },
  ];

  const displayCourses = myCourses.length > 0 ? myCourses : mockMyCourses;
  
  const inProgressCourses = displayCourses.filter(course => course.progress! > 0 && course.progress! < 100);
  const completedCourses = displayCourses.filter(course => course.progress === 100);
  const notStartedCourses = displayCourses.filter(course => course.progress === 0);

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'success';
    if (progress >= 50) return 'primary';
    return 'warning';
  };

  const CourseCard = ({ course }: { course: any }) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {course.description}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Progress</Typography>
            <Typography variant="body2">{course.progress}%</Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={course.progress}
            color={getProgressColor(course.progress)}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Chip label={course.difficulty} size="small" />
          <Chip label={course.category} variant="outlined" size="small" />
        </Box>

        <Typography variant="body2" color="text.secondary">
          Instructor: {course.instructor}
        </Typography>
      </CardContent>
      
      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={course.progress === 100 ? <CheckCircle /> : <PlayArrow />}
          onClick={() => navigate(`/courses/${course.id}`)}
        >
          {course.progress === 100 ? 'Review Course' : 'Continue Learning'}
        </Button>
      </Box>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        📖 My Courses
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Track your learning progress and continue where you left off
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
          <Tab 
            label={`In Progress (${inProgressCourses.length})`} 
            icon={<PlayArrow />}
            iconPosition="start"
          />
          <Tab 
            label={`Completed (${completedCourses.length})`} 
            icon={<CheckCircle />}
            iconPosition="start"
          />
          <Tab 
            label={`Not Started (${notStartedCourses.length})`} 
            icon={<Schedule />}
            iconPosition="start"
          />
        </Tabs>
      </Box>

      <TabPanel value={tab} index={0}>
        <Grid container spacing={3}>
          {inProgressCourses.map((course) => (
            <Grid item xs={12} md={6} lg={4} key={course.id}>
              <CourseCard course={course} />
            </Grid>
          ))}
          {inProgressCourses.length === 0 && (
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  No courses in progress
                </Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => navigate('/courses')}
                >
                  Browse Courses
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </TabPanel>

      <TabPanel value={tab} index={1}>
        <Grid container spacing={3}>
          {completedCourses.map((course) => (
            <Grid item xs={12} md={6} lg={4} key={course.id}>
              <CourseCard course={course} />
            </Grid>
          ))}
          {completedCourses.length === 0 && (
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  No completed courses yet
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Complete your first course to see it here
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </TabPanel>

      <TabPanel value={tab} index={2}>
        <Grid container spacing={3}>
          {notStartedCourses.map((course) => (
            <Grid item xs={12} md={6} lg={4} key={course.id}>
              <CourseCard course={course} />
            </Grid>
          ))}
          {notStartedCourses.length === 0 && (
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  All courses have been started
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Great job on beginning your learning journey!
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </TabPanel>
    </Box>
  );
}
