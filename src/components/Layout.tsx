import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Divider,
} from '@mui/material';
import {
  School,
  Notifications,
  AccountCircle,
  Dashboard,
  BookmarkBorder,
  Psychology,
  Target,
  People,
  EmojiEvents,
  ExitToApp,
} from '@mui/icons-material';
import { RootState, AppDispatch } from '../store/store';
import { logout } from '../store/slices/authSlice';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { unreadCount } = useSelector((state: RootState) => state.notifications);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleProfileMenuClose();
  };

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: <Dashboard /> },
    { label: 'Courses', path: '/courses', icon: <School /> },
    { label: 'My Courses', path: '/my-courses', icon: <BookmarkBorder /> },
    { label: 'Mandatory', path: '/mandatory-courses', icon: <BookmarkBorder /> },
    { label: 'Skills', path: '/skills', icon: <Psychology /> },
    { label: 'Personalized', path: '/personalized', icon: <Target /> },
    { label: 'Social', path: '/social', icon: <People /> },
    { label: 'Achievements', path: '/achievements', icon: <EmojiEvents /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={2}>
        <Toolbar>
          {/* Logo and Title */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
            <School sx={{ mr: 1, fontSize: 28 }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              LMS Prototype
            </Typography>
          </Box>

          {/* Navigation Items */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                color="inherit"
                startIcon={item.icon}
                onClick={() => navigate(item.path)}
                sx={{
                  backgroundColor: isActive(item.path) ? 'rgba(255,255,255,0.1)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                  borderRadius: 1,
                  px: 2,
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Right side - Notifications and Profile */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Notifications */}
            <IconButton
              color="inherit"
              onClick={() => navigate('/notifications')}
            >
              <Badge badgeContent={unreadCount} color="error">
                <Notifications />
              </Badge>
            </IconButton>

            {/* Profile Menu */}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                {user?.name?.charAt(0) || 'U'}
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
            >
              <MenuItem disabled>
                <Box>
                  <Typography variant="subtitle1">{user?.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user?.email}
                  </Typography>
                </Box>
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => { navigate('/profile'); handleProfileMenuClose(); }}>
                <AccountCircle sx={{ mr: 1 }} />
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ExitToApp sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>

      {/* Mobile Navigation (for future implementation) */}
      <Box sx={{ display: { xs: 'block', md: 'none' }, position: 'fixed', bottom: 0, left: 0, right: 0, bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider', p: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          {navigationItems.slice(0, 4).map((item) => (
            <IconButton
              key={item.path}
              onClick={() => navigate(item.path)}
              color={isActive(item.path) ? 'primary' : 'default'}
            >
              {item.icon}
            </IconButton>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
