import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Badge,
  Chip,
  Divider,
  Button,
} from '@mui/material';
import {
  Notifications,
  Close,
  School,
  EmojiEvents,
  People,
  Warning,
  Info,
} from '@mui/icons-material';

export default function NotificationCenter() {
  const [open, setOpen] = useState(false);

  const notifications = [
    {
      id: '1',
      type: 'course',
      title: 'New course available',
      message: 'Machine Learning Fundamentals is now available',
      timestamp: '2 hours ago',
      read: false,
      priority: 'medium',
    },
    {
      id: '2',
      type: 'achievement',
      title: 'Badge earned!',
      message: 'You earned the Frontend Developer badge',
      timestamp: '1 day ago',
      read: false,
      priority: 'high',
    },
    {
      id: '3',
      type: 'deadline',
      title: 'Assignment due soon',
      message: 'Python Programming assignment due in 2 days',
      timestamp: '2 days ago',
      read: true,
      priority: 'high',
    },
    {
      id: '4',
      type: 'social',
      title: 'New forum reply',
      message: 'Someone replied to your React hooks question',
      timestamp: '3 days ago',
      read: true,
      priority: 'low',
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'course': return <School color="primary" />;
      case 'achievement': return <EmojiEvents color="warning" />;
      case 'deadline': return <Warning color="error" />;
      case 'social': return <People color="info" />;
      default: return <Info />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  return (
    <>
      <IconButton
        color="inherit"
        onClick={() => setOpen(true)}
      >
        <Badge badgeContent={unreadCount} color="error">
          <Notifications />
        </Badge>
      </IconButton>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { width: 400 }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Notifications ({unreadCount} unread)
            </Typography>
            <IconButton onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Button size="small" variant="outlined">
              Mark all read
            </Button>
            <Button size="small" variant="outlined">
              Clear all
            </Button>
          </Box>

          <List>
            {notifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  sx={{
                    backgroundColor: notification.read ? 'transparent' : 'action.hover',
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  <ListItemIcon>
                    {getIcon(notification.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle2">
                          {notification.title}
                        </Typography>
                        <Chip
                          label={notification.priority}
                          size="small"
                          color={getPriorityColor(notification.priority) as any}
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {notification.timestamp}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < notifications.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>

          {notifications.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body2" color="text.secondary">
                No notifications
              </Typography>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
}
