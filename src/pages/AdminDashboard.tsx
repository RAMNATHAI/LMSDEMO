import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { People, School, Assessment, Settings } from '@mui/icons-material';

export default function AdminDashboard() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        ⚙️ Admin Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage users, courses, and system settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <People sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6">User Management</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Manage learners and instructors
              </Typography>
              <Button variant="contained" size="small">
                Manage Users
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <School sx={{ fontSize: 48, color: 'secondary.main', mb: 2 }} />
              <Typography variant="h6">Course Management</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Create and manage courses
              </Typography>
              <Button variant="contained" size="small">
                Manage Courses
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Assessment sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
              <Typography variant="h6">Analytics</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                View learning analytics
              </Typography>
              <Button variant="contained" size="small">
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Settings sx={{ fontSize: 48, color: 'info.main', mb: 2 }} />
              <Typography variant="h6">System Settings</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Configure system settings
              </Typography>
              <Button variant="contained" size="small">
                Settings
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
