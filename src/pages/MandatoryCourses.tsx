import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Chip, LinearProgress, Button, Alert } from '@mui/material';
import { Warning, Schedule, CheckCircle } from '@mui/icons-material';

export default function MandatoryCourses() {
  const mandatoryCourses = [
    {
      id: '1',
      title: 'Workplace Safety Training',
      description: 'Essential safety protocols and procedures',
      deadline: '2024-02-15',
      progress: 80,
      priority: 'high',
      status: 'in-progress',
    },
    {
      id: '2',
      title: 'Data Privacy & Security',
      description: 'GDPR compliance and data protection',
      deadline: '2024-02-28',
      progress: 100,
      priority: 'medium',
      status: 'completed',
    },
    {
      id: '3',
      title: 'Code of Conduct',
      description: 'Company policies and ethical guidelines',
      deadline: '2024-03-10',
      progress: 0,
      priority: 'medium',
      status: 'not-started',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle color="success" />;
      case 'in-progress': return <Schedule color="primary" />;
      default: return <Warning color="warning" />;
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        ⚠️ Mandatory Courses
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Complete these required courses by their deadlines
      </Typography>

      <Alert severity="info" sx={{ mb: 4 }}>
        You have {mandatoryCourses.filter(c => c.status !== 'completed').length} mandatory courses to complete
      </Alert>

      <Grid container spacing={3}>
        {mandatoryCourses.map((course) => (
          <Grid item xs={12} md={6} key={course.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {getStatusIcon(course.status)}
                  <Typography variant="h6" sx={{ ml: 1, flexGrow: 1 }}>
                    {course.title}
                  </Typography>
                  <Chip
                    label={course.priority}
                    color={getPriorityColor(course.priority) as any}
                    size="small"
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {course.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Deadline: {new Date(course.deadline).toLocaleDateString()}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={course.progress}
                      sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                      color={course.progress === 100 ? 'success' : 'primary'}
                    />
                    <Typography variant="body2">{course.progress}%</Typography>
                  </Box>
                </Box>

                <Button
                  fullWidth
                  variant={course.status === 'completed' ? 'outlined' : 'contained'}
                  color={course.priority === 'high' ? 'error' : 'primary'}
                >
                  {course.status === 'completed' ? 'Review' : 'Start Course'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
