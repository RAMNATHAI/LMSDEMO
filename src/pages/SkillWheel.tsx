import React from 'react';
import { Box, Typography, Grid, Card, CardContent, LinearProgress, Chip } from '@mui/material';

export default function SkillWheel() {
  const skills = [
    { name: 'JavaScript', level: 85, category: 'Frontend', color: '#f7df1e' },
    { name: 'React', level: 90, category: 'Frontend', color: '#61dafb' },
    { name: 'Python', level: 75, category: 'Backend', color: '#3776ab' },
    { name: 'Data Analysis', level: 60, category: 'Data Science', color: '#ff6b6b' },
    { name: 'UI Design', level: 70, category: 'Design', color: '#4ecdc4' },
    { name: 'Machine Learning', level: 45, category: 'AI/ML', color: '#45b7d1' },
  ];

  const getSkillLevel = (level: number) => {
    if (level >= 80) return { label: 'Expert', color: 'success' };
    if (level >= 60) return { label: 'Advanced', color: 'primary' };
    if (level >= 40) return { label: 'Intermediate', color: 'warning' };
    return { label: 'Novice', color: 'error' };
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        🧠 Skills Profile
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Track your skill development and proficiency levels
      </Typography>

      <Grid container spacing={3}>
        {skills.map((skill, index) => {
          const skillLevel = getSkillLevel(skill.level);
          return (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">{skill.name}</Typography>
                    <Chip
                      label={skillLevel.label}
                      color={skillLevel.color as any}
                      size="small"
                    />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {skill.category}
                  </Typography>

                  <Box sx={{ mb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Proficiency</Typography>
                      <Typography variant="body2">{skill.level}%</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={skill.level}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: skill.color,
                        },
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            📊 Skill Analytics
          </Typography>
          <Grid container spacing={3} sx={{ textAlign: 'center' }}>
            <Grid item xs={6} sm={3}>
              <Typography variant="h4" color="success.main">2</Typography>
              <Typography variant="body2">Expert Level</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="h4" color="primary.main">2</Typography>
              <Typography variant="body2">Advanced Level</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="h4" color="warning.main">1</Typography>
              <Typography variant="body2">Intermediate Level</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="h4" color="error.main">1</Typography>
              <Typography variant="body2">Novice Level</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
