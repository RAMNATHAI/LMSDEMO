import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Chip, LinearProgress } from '@mui/material';
import { Target, TrendingUp, School } from '@mui/icons-material';

export default function PersonalizedLearning() {
  const learningPaths = [
    {
      id: '1',
      title: 'Frontend Developer Track',
      description: 'Master modern frontend development with React, TypeScript, and advanced patterns',
      difficulty: 'Beginner → Expert',
      duration: '12 weeks',
      courses: ['HTML/CSS Basics', 'JavaScript Fundamentals', 'React Development', 'Advanced React Patterns'],
      progress: 60,
      enrolled: true,
    },
    {
      id: '2',
      title: 'Data Scientist Path',
      description: 'Complete data science journey from statistics to machine learning',
      difficulty: 'Intermediate → Expert',
      duration: '16 weeks',
      courses: ['Python for Data Science', 'Statistics & Probability', 'Machine Learning', 'Deep Learning'],
      progress: 0,
      enrolled: false,
    },
    {
      id: '3',
      title: 'Full-Stack Developer Journey',
      description: 'Comprehensive full-stack development with modern technologies',
      difficulty: 'Beginner → Expert',
      duration: '20 weeks',
      courses: ['Frontend Basics', 'Backend Development', 'Database Design', 'DevOps Fundamentals'],
      progress: 25,
      enrolled: true,
    },
  ];

  const recommendations = [
    {
      title: 'Advanced React Patterns',
      reason: 'Based on your React progress',
      confidence: 95,
      type: 'course',
    },
    {
      title: 'TypeScript Fundamentals',
      reason: 'Complements your JavaScript skills',
      confidence: 88,
      type: 'course',
    },
    {
      title: 'UI/UX Design Principles',
      reason: 'Popular with frontend developers',
      confidence: 75,
      type: 'course',
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty.includes('Expert')) return 'error';
    if (difficulty.includes('Intermediate')) return 'warning';
    return 'success';
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        🎯 Personalized Learning
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        AI-powered learning paths tailored to your goals and progress
      </Typography>

      {/* Learning Paths */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        📚 Learning Paths
      </Typography>
      <Grid container spacing={3}>
        {learningPaths.map((path) => (
          <Grid item xs={12} md={6} lg={4} key={path.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Target sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">{path.title}</Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {path.description}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip
                    label={path.difficulty}
                    color={getDifficultyColor(path.difficulty) as any}
                    size="small"
                  />
                  <Chip label={path.duration} variant="outlined" size="small" />
                </Box>

                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Courses ({path.courses.length}):
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {path.courses.map((course, index) => (
                    <Typography key={index} variant="body2" color="text.secondary">
                      {index + 1}. {course}
                    </Typography>
                  ))}
                </Box>

                {path.enrolled && (
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Progress</Typography>
                      <Typography variant="body2">{path.progress}%</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={path.progress}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                )}
              </CardContent>

              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  fullWidth
                  variant={path.enrolled ? 'outlined' : 'contained'}
                >
                  {path.enrolled ? 'Continue Path' : 'Enroll in Path'}
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* AI Recommendations */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        🤖 AI Recommendations
      </Typography>
      <Grid container spacing={3}>
        {recommendations.map((rec, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <School sx={{ mr: 1, color: 'secondary.main' }} />
                  <Typography variant="h6">{rec.title}</Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {rec.reason}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <TrendingUp sx={{ fontSize: 16, color: 'success.main' }} />
                  <Typography variant="body2">
                    {rec.confidence}% match
                  </Typography>
                </Box>

                <Button variant="outlined" size="small">
                  View Course
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
