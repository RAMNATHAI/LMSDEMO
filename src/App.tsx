import React, { useState } from 'react';
import { CoursesPage, MyCoursesPage, SkillsPage, PersonalizedPage, SocialPage, AchievementsPage, LeaderboardPage, CourseRecommendationsPage, EnhancedChatbot, NotificationBell, NotificationsPage } from './LMSComponents';

// Full-fledged LMS Prototype
function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState<any>(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'system',
      title: 'Welcome to LMS Prototype!',
      message: 'Explore our comprehensive learning platform with 6 courses, skill tracking, and social features.',
      priority: 'medium',
      read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      actionUrl: '/courses'
    },
    {
      id: 2,
      type: 'course',
      title: 'New Course Available',
      message: 'Machine Learning Fundamentals course is now available for enrollment. Perfect for advancing your AI skills!',
      priority: 'high',
      read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      actionUrl: '/courses'
    },
    {
      id: 3,
      type: 'deadline',
      title: 'Assignment Due Soon',
      message: 'Your Python Programming assignment is due in 2 days. Don\'t forget to submit!',
      priority: 'high',
      read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      actionUrl: '/my-courses'
    },
    {
      id: 4,
      type: 'achievement',
      title: 'Badge Earned!',
      message: 'Congratulations! You earned the "Frontend Developer" badge for completing React courses.',
      priority: 'medium',
      read: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      actionUrl: '/achievements'
    },
    {
      id: 5,
      type: 'social',
      title: 'New Forum Reply',
      message: 'Someone replied to your question about React hooks in the discussion forum.',
      priority: 'low',
      read: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
      actionUrl: '/social'
    }
  ]);

  // Login function
  const handleLogin = (email: string, password: string) => {
    if (email === 'demo@lms.com' && password === 'demo123') {
      setUser({ name: 'Demo User', email: 'demo@lms.com' });
      setCurrentPage('courses');
      return true;
    }
    return false;
  };

  // Navigation function
  const navigate = (page: string) => {
    setCurrentPage(page);
  };

  // Logout function
  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
  };

  // Notification functions
  const handleNotificationClick = (notificationId: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      case 'courses':
        return <CoursesPage onNavigate={navigate} />;
      case 'my-courses':
        return <MyCoursesPage onNavigate={navigate} />;
      case 'skills':
        return <SkillsPage onNavigate={navigate} />;
      case 'personalized':
        return <PersonalizedPage onNavigate={navigate} />;
      case 'social':
        return <SocialPage onNavigate={navigate} />;
      case 'achievements':
        return <AchievementsPage onNavigate={navigate} />;
      case 'leaderboard':
        return <LeaderboardPage onNavigate={navigate} />;
      case 'recommendations':
        return <CourseRecommendationsPage onNavigate={navigate} />;
      case 'notifications':
        return <NotificationsPage notifications={notifications} onNotificationClick={handleNotificationClick} onNavigate={navigate} />;
      default:
        return <CoursesPage onNavigate={navigate} />;
    }
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      width: '100vw',
      overflow: 'hidden'
    }}>
      {user && <Header
        user={user}
        currentPage={currentPage}
        onNavigate={navigate}
        onLogout={handleLogout}
        notifications={notifications}
        onNotificationClick={handleNotificationClick}
      />}
      <div style={{
        height: user ? 'calc(100vh - 70px)' : '100vh',
        overflow: 'auto',
        width: '100%'
      }}>
        {renderPage()}
      </div>
      {user && <EnhancedChatbot />}
    </div>
  );
}

// Header Component
function Header({ user, currentPage, onNavigate, onLogout, notifications, onNotificationClick }: any) {
  return (
    <div style={{
      backgroundColor: '#1976d2',
      color: 'white',
      padding: '15px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <h2 style={{ margin: 0 }}>🎓 LMS Prototype</h2>
        <nav style={{ display: 'flex', gap: '20px' }}>
          {[
            { id: 'courses', label: 'Course Catalog' },
            { id: 'my-courses', label: 'My Courses' },
            { id: 'recommendations', label: 'Recommendations' },
            { id: 'skills', label: 'Skills' },
            { id: 'personalized', label: 'Personalized' },
            { id: 'social', label: 'Social' },
            { id: 'achievements', label: 'Achievements' },
            { id: 'leaderboard', label: 'Leaderboard' }
          ].map(page => (
            <button
              key={page.id}
              onClick={() => onNavigate(page.id)}
              style={{
                background: currentPage === page.id ? 'rgba(255,255,255,0.2)' : 'transparent',
                border: 'none',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {page.label}
            </button>
          ))}
        </nav>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <NotificationBell notifications={notifications} onNotificationClick={onNotificationClick} />
        <span>👋 {user.name}</span>
        <button onClick={onLogout} style={{
          background: 'rgba(255,255,255,0.2)',
          border: 'none',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Logout
        </button>
      </div>
    </div>
  );
}

// Login Page
function LoginPage({ onLogin }: any) {
  const [email, setEmail] = useState('demo@lms.com');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin(email, password)) {
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        width: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#1976d2', marginBottom: '10px' }}>🎓 LMS Prototype</h1>
          <p style={{ color: '#666' }}>AI-Powered Learning Management System</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px'
              }}
            />
          </div>

          {error && (
            <div style={{
              color: 'red',
              marginBottom: '20px',
              padding: '10px',
              backgroundColor: '#ffebee',
              borderRadius: '4px'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              padding: '12px',
              fontSize: '16px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            🚀 Login to LMS
          </button>
        </form>

        <div style={{
          backgroundColor: '#e3f2fd',
          padding: '15px',
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          <strong>Demo Credentials:</strong><br />
          Email: demo@lms.com<br />
          Password: demo123
        </div>
      </div>
    </div>
  );
}

// Dashboard Page
function DashboardPage({ user, onNavigate }: any) {
  const features = [
    { id: 'courses', icon: '📚', title: 'Course Catalog', desc: '6 courses available with filtering and enrollment' },
    { id: 'my-courses', icon: '📖', title: 'My Courses', desc: 'Track progress and access mandatory courses' },
    { id: 'recommendations', icon: '🎯', title: 'Course Recommendations', desc: 'AI-powered suggestions based on your learning patterns' },
    { id: 'skills', icon: '🧠', title: 'Skills Profile', desc: 'Interactive skill wheel and analytics dashboard' },
    { id: 'personalized', icon: '🛤️', title: 'Learning Paths', desc: 'Structured learning journeys and career tracks' },
    { id: 'social', icon: '👥', title: 'Social Learning', desc: 'Forums, study groups, and collaboration' },
    { id: 'achievements', icon: '🏆', title: 'Achievements', desc: 'Badges, certificates, and leaderboards' },
  ];

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#333', marginBottom: '10px' }}>Welcome back, {user.name}! 👋</h1>
        <p style={{ color: '#666', fontSize: '18px' }}>Here's your learning dashboard with all LMS capabilities</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '25px',
        marginBottom: '40px'
      }}>
        {features.map((feature) => (
          <div
            key={feature.id}
            onClick={() => onNavigate(feature.id)}
            style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textAlign: 'center'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '15px' }}>{feature.icon}</div>
            <h3 style={{ color: '#333', marginBottom: '10px', fontSize: '1.4rem' }}>{feature.title}</h3>
            <p style={{ color: '#666', lineHeight: '1.5', margin: 0 }}>{feature.desc}</p>
          </div>
        ))}
      </div>

      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ marginBottom: '20px', color: '#333' }}>📊 Quick Stats</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '2rem', color: '#1976d2', fontWeight: 'bold' }}>6</div>
            <div style={{ color: '#666' }}>Courses Available</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', color: '#4caf50', fontWeight: 'bold' }}>3</div>
            <div style={{ color: '#666' }}>Enrolled</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', color: '#ff9800', fontWeight: 'bold' }}>8</div>
            <div style={{ color: '#666' }}>Skills Tracked</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', color: '#e91e63', fontWeight: 'bold' }}>5</div>
            <div style={{ color: '#666' }}>Badges Earned</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
