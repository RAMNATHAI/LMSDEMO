import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar, LinearProgress, Chip } from '@mui/material';
import { EmojiEvents, Star, TrendingUp, School } from '@mui/icons-material';

export default function Achievements() {
  const badges = [
    {
      id: '1',
      name: 'First Course Completed',
      description: 'Complete your first course',
      icon: '🎓',
      earned: true,
      earnedDate: '2024-01-15',
      rarity: 'common',
    },
    {
      id: '2',
      name: 'Frontend Developer',
      description: 'Complete 3 frontend courses',
      icon: '💻',
      earned: true,
      earnedDate: '2024-01-20',
      rarity: 'uncommon',
    },
    {
      id: '3',
      name: 'Quiz Master',
      description: 'Score 100% on 5 quizzes',
      icon: '🧠',
      earned: false,
      progress: 60,
      rarity: 'rare',
    },
    {
      id: '4',
      name: 'Learning Streak',
      description: 'Learn for 30 consecutive days',
      icon: '🔥',
      earned: false,
      progress: 23,
      rarity: 'epic',
    },
    {
      id: '5',
      name: 'Social Butterfly',
      description: 'Participate in 10 forum discussions',
      icon: '🦋',
      earned: false,
      progress: 40,
      rarity: 'uncommon',
    },
    {
      id: '6',
      name: 'Skill Master',
      description: 'Reach expert level in any skill',
      icon: '⭐',
      earned: true,
      earnedDate: '2024-01-25',
      rarity: 'legendary',
    },
  ];

  const certificates = [
    {
      id: '1',
      name: 'React Development Fundamentals',
      issueDate: '2024-01-20',
      instructor: 'John Smith',
      grade: 'A+',
    },
    {
      id: '2',
      name: 'Python Programming Mastery',
      issueDate: '2024-01-10',
      instructor: 'Sarah Johnson',
      grade: 'A',
    },
  ];

  const leaderboard = [
    { rank: 1, name: 'Alice Cooper', points: 2450, avatar: 'A' },
    { rank: 2, name: 'Bob Wilson', points: 2380, avatar: 'B' },
    { rank: 3, name: 'You', points: 2250, avatar: 'Y', isCurrentUser: true },
    { rank: 4, name: 'Carol Davis', points: 2100, avatar: 'C' },
    { rank: 5, name: 'David Brown', points: 1950, avatar: 'D' },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'grey';
      case 'uncommon': return 'green';
      case 'rare': return 'blue';
      case 'epic': return 'purple';
      case 'legendary': return 'orange';
      default: return 'grey';
    }
  };

  const getRarityLabel = (rarity: string) => {
    return rarity.charAt(0).toUpperCase() + rarity.slice(1);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        🏆 Achievements
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Track your progress, earn badges, and compete with fellow learners
      </Typography>

      <Grid container spacing={3}>
        {/* Badges */}
        <Grid item xs={12} lg={8}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmojiEvents color="primary" />
            Badges
          </Typography>
          <Grid container spacing={2}>
            {badges.map((badge) => (
              <Grid item xs={12} sm={6} md={4} key={badge.id}>
                <Card sx={{ 
                  height: '100%',
                  opacity: badge.earned ? 1 : 0.6,
                  border: badge.earned ? 2 : 1,
                  borderColor: badge.earned ? getRarityColor(badge.rarity) : 'grey.300',
                }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h2" sx={{ mb: 1 }}>
                      {badge.icon}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {badge.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {badge.description}
                    </Typography>
                    
                    <Chip
                      label={getRarityLabel(badge.rarity)}
                      size="small"
                      sx={{ 
                        mb: 2,
                        backgroundColor: getRarityColor(badge.rarity),
                        color: 'white',
                      }}
                    />

                    {badge.earned ? (
                      <Typography variant="body2" color="success.main">
                        Earned on {new Date(badge.earnedDate!).toLocaleDateString()}
                      </Typography>
                    ) : (
                      <Box>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          Progress: {badge.progress}%
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={badge.progress}
                          sx={{ height: 6, borderRadius: 3 }}
                        />
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Leaderboard */}
        <Grid item xs={12} lg={4}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrendingUp color="secondary" />
            Leaderboard
          </Typography>
          <Card>
            <CardContent>
              {leaderboard.map((user) => (
                <Box
                  key={user.rank}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    py: 1,
                    px: 2,
                    mb: 1,
                    borderRadius: 1,
                    backgroundColor: user.isCurrentUser ? 'primary.light' : 'transparent',
                    color: user.isCurrentUser ? 'primary.contrastText' : 'inherit',
                  }}
                >
                  <Typography variant="h6" sx={{ minWidth: 24 }}>
                    {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : user.rank}
                  </Typography>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {user.avatar}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: user.isCurrentUser ? 'bold' : 'normal' }}>
                      {user.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2">
                    {user.points} pts
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Certificates */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <School color="success" />
            Certificates
          </Typography>
          <Grid container spacing={3}>
            {certificates.map((cert) => (
              <Grid item xs={12} md={6} key={cert.id}>
                <Card sx={{ border: 2, borderColor: 'success.main' }}>
                  <CardContent>
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                      <Typography variant="h4" sx={{ mb: 1 }}>🏆</Typography>
                      <Typography variant="h6" gutterBottom>
                        Certificate of Completion
                      </Typography>
                    </Box>
                    
                    <Typography variant="h5" sx={{ textAlign: 'center', mb: 2, color: 'primary.main' }}>
                      {cert.name}
                    </Typography>
                    
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        Instructor: {cert.instructor}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        Grade: {cert.grade}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Issued on {new Date(cert.issueDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
