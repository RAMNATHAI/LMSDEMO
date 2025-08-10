import React from 'react';
import { Box, Typography, Card, CardContent, Button, LinearProgress } from '@mui/material';
import { PlayArrow, Quiz, Assignment } from '@mui/icons-material';

export default function CourseDetail() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        🎥 Course Detail
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Video player, modules, and interactive content will be implemented here
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            React Development Fundamentals
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Learn modern React development with hooks, context, and best practices
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>Progress: 75%</Typography>
            <LinearProgress variant="determinate" value={75} sx={{ height: 8, borderRadius: 4 }} />
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" startIcon={<PlayArrow />}>
              Continue Video
            </Button>
            <Button variant="outlined" startIcon={<Quiz />}>
              Take Quiz
            </Button>
            <Button variant="outlined" startIcon={<Assignment />}>
              View Assignment
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
