import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Avatar, Button, Chip, Divider } from '@mui/material';
import { Forum, Group, Share, ThumbUp } from '@mui/icons-material';

export default function SocialLearning() {
  const forumPosts = [
    {
      id: '1',
      title: 'Best practices for React hooks?',
      author: 'John Doe',
      course: 'React Development',
      replies: 12,
      likes: 8,
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      title: 'Python vs JavaScript for beginners',
      author: 'Sarah Smith',
      course: 'General Discussion',
      replies: 25,
      likes: 15,
      timestamp: '5 hours ago',
    },
    {
      id: '3',
      title: 'Data visualization libraries comparison',
      author: 'Mike Johnson',
      course: 'Data Science',
      replies: 8,
      likes: 12,
      timestamp: '1 day ago',
    },
  ];

  const studyGroups = [
    {
      id: '1',
      name: 'React Study Group',
      members: 15,
      description: 'Weekly discussions on React concepts and projects',
      nextMeeting: 'Tomorrow 7 PM',
      joined: true,
    },
    {
      id: '2',
      name: 'Python Beginners',
      members: 23,
      description: 'Support group for Python newcomers',
      nextMeeting: 'Friday 6 PM',
      joined: false,
    },
    {
      id: '3',
      name: 'Data Science Enthusiasts',
      members: 18,
      description: 'Share insights and collaborate on data projects',
      nextMeeting: 'Sunday 3 PM',
      joined: true,
    },
  ];

  const achievements = [
    {
      user: 'Alice Cooper',
      achievement: 'Completed React Development Fundamentals',
      timestamp: '1 hour ago',
      badge: '🎓',
    },
    {
      user: 'Bob Wilson',
      achievement: 'Earned Frontend Developer Badge',
      timestamp: '3 hours ago',
      badge: '🏆',
    },
    {
      user: 'Carol Davis',
      achievement: 'Reached 7-day learning streak',
      timestamp: '6 hours ago',
      badge: '🔥',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        👥 Social Learning
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Connect with fellow learners, join discussions, and collaborate
      </Typography>

      <Grid container spacing={3}>
        {/* Discussion Forums */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Forum sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">Discussion Forums</Typography>
              </Box>

              {forumPosts.map((post, index) => (
                <Box key={post.id}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {post.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Avatar sx={{ width: 24, height: 24 }}>
                        {post.author.charAt(0)}
                      </Avatar>
                      <Typography variant="body2" color="text.secondary">
                        {post.author}
                      </Typography>
                      <Chip label={post.course} size="small" variant="outlined" />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        {post.replies} replies
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <ThumbUp sx={{ fontSize: 16 }} />
                        <Typography variant="body2">{post.likes}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {post.timestamp}
                      </Typography>
                    </Box>
                  </Box>
                  {index < forumPosts.length - 1 && <Divider sx={{ my: 2 }} />}
                </Box>
              ))}

              <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                View All Discussions
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Study Groups */}
        <Grid item xs={12} lg={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Group sx={{ mr: 1, color: 'secondary.main' }} />
                <Typography variant="h6">Study Groups</Typography>
              </Box>

              {studyGroups.map((group, index) => (
                <Box key={group.id}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {group.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {group.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2">
                        {group.members} members • Next: {group.nextMeeting}
                      </Typography>
                      <Button
                        size="small"
                        variant={group.joined ? 'outlined' : 'contained'}
                        color={group.joined ? 'secondary' : 'primary'}
                      >
                        {group.joined ? 'Joined' : 'Join'}
                      </Button>
                    </Box>
                  </Box>
                  {index < studyGroups.length - 1 && <Divider sx={{ my: 2 }} />}
                </Box>
              ))}

              <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                Create Study Group
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Achievements */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Share sx={{ mr: 1, color: 'success.main' }} />
                <Typography variant="h6">Recent Achievements</Typography>
              </Box>

              <Grid container spacing={2}>
                {achievements.map((achievement, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                      <Typography variant="h4">{achievement.badge}</Typography>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                          {achievement.user}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {achievement.achievement}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {achievement.timestamp}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
