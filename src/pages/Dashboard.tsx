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
  Avatar,
  Chip,
} from '@mui/material';
import {
  School,
  BookmarkBorder,
  Psychology,
  Target,
  People,
  EmojiEvents,
  PlayArrow,
  TrendingUp,
} from '@mui/icons-material';
import { RootState, AppDispatch } from '../store/store';
import { fetchNotifications } from '../store/slices/notificationsSlice';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { unreadCount } = useSelector((state: RootState) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const featureCards = [
    {
      title: '📚 Course Catalog',
      subtitle: '6 courses available',
      description: 'Browse React, Python, Data Science, UI/UX, Machine Learning, and Project Management courses',
      icon: <School sx={{ fontSize: 60, color: 'primary.main' }} />,
      path: '/courses',
      color: 'primary.main',
    },
    {
      title: '📖 My Courses',
      subtitle: 'Progress tracking',
      description: 'Track your enrolled courses, view progress, and continue learning where you left off',
      icon: <BookmarkBorder sx={{ fontSize: 60, color: 'success.main' }} />,
      path: '/my-courses',
      color: 'success.main',
    },
    {
      title: '🧠 Skills Profile',
      subtitle: 'Skill wheel and analytics',
      description: 'Interactive skill wheel, proficiency tracking, and comprehensive analytics dashboard',
      icon: <Psychology sx={{ fontSize: 60, color: 'secondary.main' }} />,
      path: '/skills',
      color: 'secondary.main',
    },
    {
      title: '🎯 Personalized Learning',
      subtitle: 'AI-powered paths',
      description: 'Dynamic learning paths with Beginner, Intermediate, and Expert tracks for every course',
      icon: <Target sx={{ fontSize: 60, color: 'warning.main' }} />,
      path: '/personalized',
      color: 'warning.main',
    },
    {
      title: '👥 Social Learning',
      subtitle: 'Forums and teams',
      description: 'Join discussion forums, form study teams, and collaborate with fellow learners',
      icon: <People sx={{ fontSize: 60, color: 'info.main' }} />,
      path: '/social',
      color: 'info.main',
    },
    {
      title: '🏆 Achievements',
      subtitle: 'Badges and certificates',
      description: 'Earn badges, collect certificates, and compete on leaderboards',
      icon: <EmojiEvents sx={{ fontSize: 60, color: 'error.main' }} />,
      path: '/achievements',
      color: 'error.main',
    },
  ];

  const additionalFeatures = [
    '🎥 Video Learning',
    '❓ Interactive Quizzes',
    '🤖 AI Chatbot',
    '🔔 Notifications',
    '⚙️ Admin Dashboard',
    '📱 Mobile Ready',
  ];

  return (
    <Box>
      {/* Welcome Section */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {user?.name || 'Demo User'}! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Here's your learning dashboard with all LMS capabilities
        </Typography>
        {unreadCount > 0 && (
          <Chip
            label={`${unreadCount} new notifications`}
            color="primary"
            variant="outlined"
            sx={{ mb: 2 }}
          />
        )}
      </Box>

      {/* 6 Feature Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {featureCards.map((card, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                },
              }}
              onClick={() => navigate(card.path)}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Box sx={{ mb: 2 }}>
                  {card.icon}
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {card.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2, fontWeight: 'medium' }}
                >
                  {card.subtitle}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3, minHeight: '48px' }}
                >
                  {card.description}
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<PlayArrow />}
                  sx={{
                    backgroundColor: card.color,
                    '&:hover': {
                      backgroundColor: card.color,
                      opacity: 0.8,
                    },
                  }}
                >
                  Explore
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Additional Features Section */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <TrendingUp color="primary" />
          Additional Features Available
        </Typography>
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          {additionalFeatures.map((feature, index) => (
            <Grid item key={index}>
              <Chip
                label={feature}
                color="primary"
                variant="outlined"
                sx={{
                  fontSize: '0.9rem',
                  height: '36px',
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Quick Stats */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            📊 Quick Stats
          </Typography>
          <Grid container spacing={3} sx={{ textAlign: 'center' }}>
            <Grid item xs={6} sm={3}>
              <Typography variant="h4" color="primary.main">3</Typography>
              <Typography variant="body2" color="text.secondary">Courses Available</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="h4" color="success.main">1</Typography>
              <Typography variant="body2" color="text.secondary">Completed</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="h4" color="warning.main">8</Typography>
              <Typography variant="body2" color="text.secondary">Skills Tracked</Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography variant="h4" color="error.main">5</Typography>
              <Typography variant="body2" color="text.secondary">Badges Earned</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Getting Started */}
      <Card sx={{ mt: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h5" gutterBottom>
            🚀 Ready to Start Learning?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Explore our comprehensive course catalog and begin your personalized learning journey
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: 'white',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'grey.100',
              },
            }}
            onClick={() => navigate('/courses')}
          >
            Browse Courses
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
