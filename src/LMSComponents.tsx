import React from 'react';

// Notification Bell Component
export function NotificationBell({ notifications, onNotificationClick }: any) {
  const [isOpen, setIsOpen] = React.useState(false);
  const unreadCount = notifications.filter((n: any) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'system': return '🔔';
      case 'course': return '📚';
      case 'deadline': return '⏰';
      case 'achievement': return '🏆';
      case 'social': return '👥';
      default: return '📢';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#f44336';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#2196f3';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'rgba(255,255,255,0.2)',
          border: 'none',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '50%',
          cursor: 'pointer',
          position: 'relative',
          fontSize: '18px'
        }}
      >
        🔔
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            backgroundColor: '#f44336',
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: '0',
          backgroundColor: 'white',
          width: '400px',
          maxHeight: '500px',
          borderRadius: '12px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
          zIndex: 1000,
          marginTop: '10px',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: '#1976d2',
            color: 'white',
            padding: '15px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{ margin: 0, fontSize: '16px' }}>
              🔔 Notifications ({unreadCount} unread)
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: 'white',
                width: '25px',
                height: '25px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              ✕
            </button>
          </div>

          {/* Notifications List */}
          <div style={{
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            {notifications.length === 0 ? (
              <div style={{
                padding: '40px 20px',
                textAlign: 'center',
                color: '#666'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '10px' }}>📭</div>
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification: any) => (
                <div
                  key={notification.id}
                  onClick={() => onNotificationClick(notification.id)}
                  style={{
                    padding: '15px 20px',
                    borderBottom: '1px solid #eee',
                    backgroundColor: notification.read ? 'white' : '#f8f9fa',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    ':hover': {
                      backgroundColor: '#f0f0f0'
                    }
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = notification.read ? 'white' : '#f8f9fa'}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{ fontSize: '20px', marginTop: '2px' }}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '5px' }}>
                        <h4 style={{
                          margin: 0,
                          fontSize: '14px',
                          fontWeight: notification.read ? 'normal' : 'bold',
                          color: '#333'
                        }}>
                          {notification.title}
                        </h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: getPriorityColor(notification.priority)
                          }} />
                          <span style={{ fontSize: '11px', color: '#999' }}>
                            {formatTimeAgo(notification.timestamp)}
                          </span>
                        </div>
                      </div>
                      <p style={{
                        margin: 0,
                        fontSize: '13px',
                        color: '#666',
                        lineHeight: '1.4'
                      }}>
                        {notification.message}
                      </p>
                      {!notification.read && (
                        <div style={{
                          marginTop: '8px',
                          fontSize: '11px',
                          color: '#1976d2',
                          fontWeight: 'bold'
                        }}>
                          • New
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div style={{
              padding: '15px 20px',
              borderTop: '1px solid #eee',
              backgroundColor: '#f8f9fa',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <button
                onClick={() => {
                  notifications.forEach((n: any) => onNotificationClick(n.id));
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1976d2',
                  cursor: 'pointer',
                  fontSize: '12px',
                  textDecoration: 'underline'
                }}
              >
                Mark all as read
              </button>
              <span style={{ fontSize: '11px', color: '#999' }}>
                {notifications.length} total notifications
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Notifications Page
export function NotificationsPage({ notifications, onNotificationClick, onNavigate }: any) {
  const [filter, setFilter] = React.useState('all');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'system': return '🔔';
      case 'course': return '📚';
      case 'deadline': return '⏰';
      case 'achievement': return '🏆';
      case 'social': return '👥';
      default: return '📢';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#f44336';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#2196f3';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;
    return `${days} days ago`;
  };

  const filteredNotifications = notifications.filter((notification: any) => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter((n: any) => !n.read).length;

  return (
    <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#333', marginBottom: '10px' }}>🔔 Notifications</h1>
        <p style={{ color: '#666', fontSize: '16px' }}>
          Stay updated with course announcements, deadlines, and achievements
        </p>
      </div>

      {/* Notification Stats */}
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '20px',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '2rem', color: '#f44336', fontWeight: 'bold' }}>{unreadCount}</div>
            <div style={{ color: '#666', fontSize: '14px' }}>Unread</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', color: '#1976d2', fontWeight: 'bold' }}>{notifications.length}</div>
            <div style={{ color: '#666', fontSize: '14px' }}>Total</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', color: '#4caf50', fontWeight: 'bold' }}>
              {notifications.filter((n: any) => n.type === 'achievement').length}
            </div>
            <div style={{ color: '#666', fontSize: '14px' }}>Achievements</div>
          </div>
          <div>
            <div style={{ fontSize: '2rem', color: '#ff9800', fontWeight: 'bold' }}>
              {notifications.filter((n: any) => n.priority === 'high').length}
            </div>
            <div style={{ color: '#666', fontSize: '14px' }}>High Priority</div>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '30px',
        flexWrap: 'wrap'
      }}>
        {[
          { id: 'all', label: 'All', count: notifications.length },
          { id: 'unread', label: 'Unread', count: unreadCount },
          { id: 'system', label: 'System', count: notifications.filter((n: any) => n.type === 'system').length },
          { id: 'course', label: 'Courses', count: notifications.filter((n: any) => n.type === 'course').length },
          { id: 'deadline', label: 'Deadlines', count: notifications.filter((n: any) => n.type === 'deadline').length },
          { id: 'achievement', label: 'Achievements', count: notifications.filter((n: any) => n.type === 'achievement').length },
          { id: 'social', label: 'Social', count: notifications.filter((n: any) => n.type === 'social').length },
        ].map((filterOption) => (
          <button
            key={filterOption.id}
            onClick={() => setFilter(filterOption.id)}
            style={{
              padding: '8px 16px',
              border: '1px solid #ddd',
              borderRadius: '20px',
              backgroundColor: filter === filterOption.id ? '#1976d2' : 'white',
              color: filter === filterOption.id ? 'white' : '#333',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
          >
            {filterOption.label} ({filterOption.count})
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div style={{ display: 'grid', gap: '15px' }}>
        {filteredNotifications.length === 0 ? (
          <div style={{
            backgroundColor: 'white',
            padding: '60px 20px',
            textAlign: 'center',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>📭</div>
            <h3 style={{ color: '#666', marginBottom: '10px' }}>No notifications found</h3>
            <p style={{ color: '#999' }}>
              {filter === 'unread' ? 'All caught up! No unread notifications.' : 'No notifications match your current filter.'}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notification: any) => (
            <div
              key={notification.id}
              onClick={() => {
                onNotificationClick(notification.id);
                if (notification.actionUrl) {
                  onNavigate(notification.actionUrl.replace('/', ''));
                }
              }}
              style={{
                backgroundColor: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: notification.read ? '1px solid #e0e0e0' : '2px solid #1976d2',
                position: 'relative'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
            >
              {!notification.read && (
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#1976d2'
                }} />
              )}

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                <div style={{
                  fontSize: '32px',
                  padding: '10px',
                  borderRadius: '50%',
                  backgroundColor: `${getPriorityColor(notification.priority)}20`,
                  border: `2px solid ${getPriorityColor(notification.priority)}`
                }}>
                  {getNotificationIcon(notification.type)}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <h3 style={{
                      margin: 0,
                      fontSize: '18px',
                      fontWeight: notification.read ? 'normal' : 'bold',
                      color: '#333'
                    }}>
                      {notification.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        color: 'white',
                        backgroundColor: getPriorityColor(notification.priority),
                        textTransform: 'uppercase'
                      }}>
                        {notification.priority}
                      </span>
                      <span style={{ fontSize: '14px', color: '#999' }}>
                        {formatTimeAgo(notification.timestamp)}
                      </span>
                    </div>
                  </div>

                  <p style={{
                    margin: 0,
                    fontSize: '15px',
                    color: '#666',
                    lineHeight: '1.5',
                    marginBottom: '15px'
                  }}>
                    {notification.message}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      backgroundColor: '#f0f0f0',
                      color: '#666',
                      textTransform: 'capitalize'
                    }}>
                      {notification.type}
                    </span>

                    {notification.actionUrl && (
                      <span style={{
                        fontSize: '12px',
                        color: '#1976d2',
                        fontWeight: 'bold'
                      }}>
                        Click to view →
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Actions */}
      {unreadCount > 0 && (
        <div style={{
          marginTop: '30px',
          textAlign: 'center'
        }}>
          <button
            onClick={() => {
              notifications.forEach((n: any) => onNotificationClick(n.id));
            }}
            style={{
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            Mark All as Read ({unreadCount})
          </button>
        </div>
      )}
    </div>
  );
}

// Courses Page
export function CoursesPage({ onNavigate }: any) {
  // Filter states
  const [courseTypeFilter, setCourseTypeFilter] = React.useState('All');
  const [difficultyFilter, setDifficultyFilter] = React.useState('All');
  const [departmentFilter, setDepartmentFilter] = React.useState('All');

  const courses = [
    { id: 1, title: 'React Development Fundamentals', difficulty: 'Intermediate', duration: '40h', category: 'Frontend', enrolled: false, courseType: 'Technical', department: 'Engineering' },
    { id: 2, title: 'Python Programming Mastery', difficulty: 'Beginner', duration: '60h', category: 'Backend', enrolled: true, courseType: 'Technical', department: 'Engineering' },
    { id: 3, title: 'Data Science with Python', difficulty: 'Advanced', duration: '80h', category: 'Data Science', enrolled: false, courseType: 'Technical', department: 'Data & Analytics' },
    { id: 4, title: 'UI/UX Design Principles', difficulty: 'Intermediate', duration: '35h', category: 'Design', enrolled: false, courseType: 'Creative', department: 'Design' },
    { id: 5, title: 'Machine Learning Fundamentals', difficulty: 'Advanced', duration: '70h', category: 'AI/ML', enrolled: false, courseType: 'Technical', department: 'Data & Analytics' },
    { id: 6, title: 'Project Management Essentials', difficulty: 'Beginner', duration: '25h', category: 'Business', enrolled: false, courseType: 'Business', department: 'Management' },
    { id: 7, title: 'Digital Marketing Strategy', difficulty: 'Intermediate', duration: '30h', category: 'Marketing', enrolled: false, courseType: 'Business', department: 'Marketing' },
    { id: 8, title: 'Cybersecurity Fundamentals', difficulty: 'Intermediate', duration: '45h', category: 'Security', enrolled: false, courseType: 'Technical', department: 'Engineering' },
    { id: 9, title: 'Leadership & Communication', difficulty: 'Beginner', duration: '20h', category: 'Soft Skills', enrolled: false, courseType: 'Soft Skills', department: 'HR & Development' },
    { id: 10, title: 'Advanced JavaScript', difficulty: 'Advanced', duration: '50h', category: 'Frontend', enrolled: false, courseType: 'Technical', department: 'Engineering' },
    { id: 11, title: 'Graphic Design Mastery', difficulty: 'Intermediate', duration: '35h', category: 'Design', enrolled: false, courseType: 'Creative', department: 'Design' },
    { id: 12, title: 'Financial Analysis', difficulty: 'Advanced', duration: '40h', category: 'Finance', enrolled: false, courseType: 'Business', department: 'Finance' },
  ];

  // Filter logic
  const filteredCourses = courses.filter(course => {
    const matchesCourseType = courseTypeFilter === 'All' || course.courseType === courseTypeFilter;
    const matchesDifficulty = difficultyFilter === 'All' || course.difficulty === difficultyFilter;
    const matchesDepartment = departmentFilter === 'All' || course.department === departmentFilter;
    return matchesCourseType && matchesDifficulty && matchesDepartment;
  });

  // Get unique values for filter options
  const courseTypes = ['All', ...Array.from(new Set(courses.map(course => course.courseType)))];
  const difficulties = ['All', ...Array.from(new Set(courses.map(course => course.difficulty)))];
  const departments = ['All', ...Array.from(new Set(courses.map(course => course.department)))];

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#333' }}>📚 Course Catalog</h1>
        <p style={{ color: '#666' }}>Discover and enroll in courses to advance your skills</p>
      </div>

      {/* Filter Section */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h3 style={{ color: '#333', marginBottom: '20px' }}>🔍 Filter Courses</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          {/* Course Type Filter */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
              Course Type
            </label>
            <select
              value={courseTypeFilter}
              onChange={(e) => setCourseTypeFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '2px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}
            >
              {courseTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
              Difficulty Level
            </label>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '2px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>
          </div>

          {/* Department Filter */}
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
              Department
            </label>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '2px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px',
                backgroundColor: 'white',
                cursor: 'pointer'
              }}
            >
              {departments.map(department => (
                <option key={department} value={department}>{department}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Results Summary */}
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            📊 Showing <strong>{filteredCourses.length}</strong> of <strong>{courses.length}</strong> courses
            {(courseTypeFilter !== 'All' || difficultyFilter !== 'All' || departmentFilter !== 'All') && (
              <span style={{ marginLeft: '10px' }}>
                | Filters:
                {courseTypeFilter !== 'All' && <span style={{ marginLeft: '5px', backgroundColor: '#1976d2', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>{courseTypeFilter}</span>}
                {difficultyFilter !== 'All' && <span style={{ marginLeft: '5px', backgroundColor: '#ff9800', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>{difficultyFilter}</span>}
                {departmentFilter !== 'All' && <span style={{ marginLeft: '5px', backgroundColor: '#4caf50', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '12px' }}>{departmentFilter}</span>}
              </span>
            )}
          </p>
          {(courseTypeFilter !== 'All' || difficultyFilter !== 'All' || departmentFilter !== 'All') && (
            <button
              onClick={() => {
                setCourseTypeFilter('All');
                setDifficultyFilter('All');
                setDepartmentFilter('All');
              }}
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              🗑️ Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* Course Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
        gap: '25px'
      }}>
        {filteredCourses.length > 0 ? filteredCourses.map((course) => (
          <div key={course.id} style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#333', marginBottom: '15px' }}>{course.title}</h3>

            {/* Course Type and Department */}
            <div style={{ marginBottom: '12px' }}>
              <span style={{
                backgroundColor: '#1976d2',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                marginRight: '8px'
              }}>
                📚 {course.courseType}
              </span>
              <span style={{
                backgroundColor: '#4caf50',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px'
              }}>
                🏢 {course.department}
              </span>
            </div>

            {/* Difficulty, Category, Duration */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
              <span style={{
                backgroundColor: course.difficulty === 'Beginner' ? '#4caf50' : course.difficulty === 'Intermediate' ? '#ff9800' : '#f44336',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px'
              }}>
                📊 {course.difficulty}
              </span>
              <span style={{ backgroundColor: '#e0e0e0', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' }}>
                🎯 {course.category}
              </span>
              <span style={{ backgroundColor: '#e0e0e0', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' }}>
                ⏱️ {course.duration}
              </span>
            </div>
            <button
              style={{
                width: '100%',
                backgroundColor: course.enrolled ? '#4caf50' : '#1976d2',
                color: 'white',
                border: 'none',
                padding: '10px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              {course.enrolled ? '✅ Enrolled' : '📚 Enroll Now'}
            </button>
          </div>
        )) : (
          // No Results Message
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '60px 20px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
            <h3 style={{ color: '#333', marginBottom: '10px' }}>No Courses Found</h3>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              No courses match your current filter criteria. Try adjusting your filters or clearing them to see more results.
            </p>
            <button
              onClick={() => {
                setCourseTypeFilter('All');
                setDifficultyFilter('All');
                setDepartmentFilter('All');
              }}
              style={{
                padding: '12px 24px',
                backgroundColor: '#1976d2',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              🗑️ Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// My Courses Page
export function MyCoursesPage({ onNavigate }: any) {
  const [activeTab, setActiveTab] = React.useState('enrolled');

  const myCourses = [
    { id: 1, title: 'React Development Fundamentals', progress: 75, status: 'In Progress', type: 'enrolled' },
    { id: 2, title: 'Python Programming Mastery', progress: 100, status: 'Completed', type: 'enrolled' },
    { id: 3, title: 'Data Science with Python', progress: 30, status: 'In Progress', type: 'enrolled' },
  ];

  const mandatoryCourses = [
    { id: 4, title: 'Workplace Safety Training', progress: 80, status: 'In Progress', deadline: '2024-02-15', priority: 'High', type: 'mandatory' },
    { id: 5, title: 'Data Privacy & Security', progress: 100, status: 'Completed', deadline: '2024-02-28', priority: 'Medium', type: 'mandatory' },
    { id: 6, title: 'Code of Conduct', progress: 0, status: 'Not Started', deadline: '2024-03-10', priority: 'Medium', type: 'mandatory' },
  ];

  const renderCourseCard = (course: any) => (
    <div key={course.id} style={{
      backgroundColor: 'white',
      padding: '25px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      border: course.type === 'mandatory' && course.progress < 100 ? '2px solid #ff9800' : 'none'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
        <h3 style={{ color: '#333', margin: 0, flex: 1 }}>{course.title}</h3>
        {course.type === 'mandatory' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
            <span style={{
              backgroundColor: course.priority === 'High' ? '#f44336' : '#ff9800',
              color: 'white',
              padding: '2px 8px',
              borderRadius: '8px',
              fontSize: '10px',
              fontWeight: 'bold'
            }}>
              {course.priority} Priority
            </span>
            {course.deadline && (
              <span style={{
                fontSize: '12px',
                color: new Date(course.deadline) < new Date() ? '#f44336' : '#666',
                fontWeight: new Date(course.deadline) < new Date() ? 'bold' : 'normal'
              }}>
                Due: {new Date(course.deadline).toLocaleDateString()}
              </span>
            )}
          </div>
        )}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
          <span>Progress</span>
          <span>{course.progress}%</span>
        </div>
        <div style={{
          backgroundColor: '#e0e0e0',
          borderRadius: '10px',
          height: '10px',
          overflow: 'hidden'
        }}>
          <div style={{
            backgroundColor: course.progress === 100 ? '#4caf50' : course.type === 'mandatory' ? '#ff9800' : '#1976d2',
            height: '100%',
            width: `${course.progress}%`,
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          backgroundColor: course.status === 'Completed' ? '#4caf50' :
                          course.status === 'In Progress' ? '#ff9800' : '#f44336',
          color: 'white',
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '12px'
        }}>
          {course.status}
        </span>
        <button style={{
          backgroundColor: course.type === 'mandatory' && course.progress < 100 ? '#ff9800' : '#1976d2',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: course.type === 'mandatory' && course.progress < 100 ? 'bold' : 'normal'
        }}>
          {course.progress === 100 ? 'Review' : course.type === 'mandatory' ? 'Complete Required' : 'Continue'}
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', marginBottom: '30px' }}>📖 My Courses</h1>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        marginBottom: '30px',
        borderBottom: '2px solid #e0e0e0'
      }}>
        <button
          onClick={() => setActiveTab('enrolled')}
          style={{
            padding: '12px 24px',
            border: 'none',
            backgroundColor: 'transparent',
            color: activeTab === 'enrolled' ? '#1976d2' : '#666',
            borderBottom: activeTab === 'enrolled' ? '2px solid #1976d2' : '2px solid transparent',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: activeTab === 'enrolled' ? 'bold' : 'normal',
            marginBottom: '-2px'
          }}
        >
          📚 Enrolled Courses ({myCourses.length})
        </button>
        <button
          onClick={() => setActiveTab('mandatory')}
          style={{
            padding: '12px 24px',
            border: 'none',
            backgroundColor: 'transparent',
            color: activeTab === 'mandatory' ? '#ff9800' : '#666',
            borderBottom: activeTab === 'mandatory' ? '2px solid #ff9800' : '2px solid transparent',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: activeTab === 'mandatory' ? 'bold' : 'normal',
            marginBottom: '-2px'
          }}
        >
          ⚠️ Mandatory Courses ({mandatoryCourses.filter(c => c.progress < 100).length} pending)
        </button>
      </div>

      {/* Course Content */}
      {activeTab === 'enrolled' && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ color: '#666', fontSize: '16px' }}>
              Track your enrolled courses and continue your learning journey
            </p>
          </div>
          <div style={{ display: 'grid', gap: '20px' }}>
            {myCourses.map(renderCourseCard)}
          </div>
        </div>
      )}

      {activeTab === 'mandatory' && (
        <div>
          <div style={{
            backgroundColor: '#fff3e0',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid #ffcc02'
          }}>
            <h3 style={{ color: '#f57c00', margin: '0 0 10px 0' }}>⚠️ Important Notice</h3>
            <p style={{ color: '#ef6c00', margin: 0 }}>
              You have {mandatoryCourses.filter(c => c.progress < 100).length} mandatory courses to complete.
              Please ensure all required training is finished by the specified deadlines.
            </p>
          </div>
          <div style={{ display: 'grid', gap: '20px' }}>
            {mandatoryCourses.map(renderCourseCard)}
          </div>
        </div>
      )}
    </div>
  );
}

// Skills Page
export function SkillsPage({ onNavigate }: any) {
  const skills = [
    { name: 'JavaScript', level: 85, category: 'Frontend' },
    { name: 'React', level: 90, category: 'Frontend' },
    { name: 'Python', level: 75, category: 'Backend' },
    { name: 'Data Analysis', level: 45, category: 'Data Science' },
    { name: 'UI Design', level: 60, category: 'Design' },
    { name: 'Machine Learning', level: 30, category: 'AI/ML' },
  ];

  const getSkillLevel = (level: number) => {
    if (level >= 70) return { label: 'Expert', color: '#4caf50' };
    if (level >= 40) return { label: 'Intermediate', color: '#ff9800' };
    return { label: 'Novice', color: '#f44336' };
  };

  const skillLevelCounts = {
    expert: skills.filter(s => s.level >= 70).length,
    intermediate: skills.filter(s => s.level >= 40 && s.level < 70).length,
    novice: skills.filter(s => s.level < 40).length
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', marginBottom: '30px' }}>🧠 Skills Profile</h1>

      {/* Skills Analytics Summary */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h3 style={{ color: '#333', marginBottom: '20px' }}>📊 Skills Analytics</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '20px',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '2.5rem', color: '#4caf50', fontWeight: 'bold' }}>{skillLevelCounts.expert}</div>
            <div style={{ color: '#666', fontWeight: 'bold' }}>Expert Level</div>
            <div style={{ fontSize: '12px', color: '#999' }}>70%+ Proficiency</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', color: '#ff9800', fontWeight: 'bold' }}>{skillLevelCounts.intermediate}</div>
            <div style={{ color: '#666', fontWeight: 'bold' }}>Intermediate Level</div>
            <div style={{ fontSize: '12px', color: '#999' }}>40-69% Proficiency</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', color: '#f44336', fontWeight: 'bold' }}>{skillLevelCounts.novice}</div>
            <div style={{ color: '#666', fontWeight: 'bold' }}>Novice Level</div>
            <div style={{ fontSize: '12px', color: '#999' }}>0-39% Proficiency</div>
          </div>
        </div>
      </div>

      {/* Individual Skills */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '25px'
      }}>
        {skills.map((skill, index) => {
          const skillLevel = getSkillLevel(skill.level);
          return (
            <div key={index} style={{
              backgroundColor: 'white',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ color: '#333', margin: 0 }}>{skill.name}</h3>
                <span style={{
                  backgroundColor: skillLevel.color,
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {skillLevel.label}
                </span>
              </div>
              <p style={{ color: '#666', marginBottom: '15px' }}>{skill.category}</p>
              <div style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span>Proficiency</span>
                  <span style={{ fontWeight: 'bold' }}>{skill.level}%</span>
                </div>
                <div style={{
                  backgroundColor: '#e0e0e0',
                  borderRadius: '10px',
                  height: '12px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    backgroundColor: skillLevel.color,
                    height: '100%',
                    width: `${skill.level}%`,
                    transition: 'width 0.3s ease',
                    borderRadius: '10px'
                  }} />
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#999' }}>
                {skill.level >= 70 ? 'Advanced mastery with deep expertise' :
                 skill.level >= 40 ? 'Solid understanding with practical experience' :
                 'Basic knowledge, room for growth'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Personalized Page
export function PersonalizedPage({ onNavigate }: any) {
  const [selectedPath, setSelectedPath] = React.useState<any>(null);

  const learningPaths = [
    {
      id: 'fullstack',
      title: 'Full Stack Engineer',
      icon: '🌐',
      description: 'Master both frontend and backend development to build complete web applications',
      duration: '8-12 months',
      difficulty: 'Intermediate to Advanced',
      prerequisites: ['Basic programming knowledge', 'HTML/CSS fundamentals'],
      phases: [
        {
          phase: 1,
          title: 'Foundation Phase',
          duration: '2-3 months',
          courses: [
            { name: 'Python Programming Mastery', duration: '60h', status: 'completed', progress: 100 },
            { name: 'JavaScript Fundamentals', duration: '45h', status: 'in-progress', progress: 75 },
            { name: 'HTML/CSS Advanced', duration: '30h', status: 'not-started', progress: 0 }
          ]
        },
        {
          phase: 2,
          title: 'Frontend Development',
          duration: '3-4 months',
          courses: [
            { name: 'React Development Fundamentals', duration: '40h', status: 'enrolled', progress: 25 },
            { name: 'Advanced React Patterns', duration: '35h', status: 'not-started', progress: 0 },
            { name: 'State Management (Redux)', duration: '25h', status: 'not-started', progress: 0 },
            { name: 'UI/UX Design Principles', duration: '35h', status: 'not-started', progress: 0 }
          ]
        },
        {
          phase: 3,
          title: 'Backend Development',
          duration: '2-3 months',
          courses: [
            { name: 'Node.js & Express', duration: '50h', status: 'not-started', progress: 0 },
            { name: 'Database Design & SQL', duration: '40h', status: 'not-started', progress: 0 },
            { name: 'API Development & REST', duration: '35h', status: 'not-started', progress: 0 },
            { name: 'Authentication & Security', duration: '30h', status: 'not-started', progress: 0 }
          ]
        },
        {
          phase: 4,
          title: 'Advanced Topics',
          duration: '1-2 months',
          courses: [
            { name: 'Cloud Deployment (AWS/Azure)', duration: '40h', status: 'not-started', progress: 0 },
            { name: 'DevOps Fundamentals', duration: '35h', status: 'not-started', progress: 0 },
            { name: 'Testing & Quality Assurance', duration: '30h', status: 'not-started', progress: 0 }
          ]
        }
      ],
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'AWS', 'REST APIs'],
      projects: [
        'Personal Portfolio Website',
        'E-commerce Application',
        'Social Media Dashboard',
        'Real-time Chat Application',
        'Full Stack Blog Platform'
      ],
      careerOutcomes: [
        'Full Stack Developer',
        'Web Application Developer',
        'Software Engineer',
        'Frontend/Backend Developer',
        'Technical Lead'
      ]
    },
    {
      id: 'datascience',
      title: 'Data Science Specialist',
      icon: '📊',
      description: 'Analyze data, build predictive models, and extract insights from complex datasets',
      duration: '6-9 months',
      difficulty: 'Intermediate to Advanced',
      prerequisites: ['Mathematics/Statistics background', 'Basic programming'],
      phases: [
        {
          phase: 1,
          title: 'Programming Foundation',
          duration: '2 months',
          courses: [
            { name: 'Python Programming Mastery', duration: '60h', status: 'completed', progress: 100 },
            { name: 'Statistics & Probability', duration: '45h', status: 'in-progress', progress: 60 },
            { name: 'SQL for Data Analysis', duration: '35h', status: 'not-started', progress: 0 }
          ]
        },
        {
          phase: 2,
          title: 'Data Analysis',
          duration: '2-3 months',
          courses: [
            { name: 'Data Science with Python', duration: '80h', status: 'enrolled', progress: 30 },
            { name: 'Data Visualization', duration: '40h', status: 'not-started', progress: 0 },
            { name: 'Pandas & NumPy Mastery', duration: '35h', status: 'not-started', progress: 0 }
          ]
        },
        {
          phase: 3,
          title: 'Machine Learning',
          duration: '2-3 months',
          courses: [
            { name: 'Machine Learning Fundamentals', duration: '70h', status: 'not-started', progress: 0 },
            { name: 'Deep Learning with TensorFlow', duration: '60h', status: 'not-started', progress: 0 },
            { name: 'Natural Language Processing', duration: '50h', status: 'not-started', progress: 0 }
          ]
        },
        {
          phase: 4,
          title: 'Advanced Analytics',
          duration: '1-2 months',
          courses: [
            { name: 'Big Data with Spark', duration: '45h', status: 'not-started', progress: 0 },
            { name: 'MLOps & Model Deployment', duration: '40h', status: 'not-started', progress: 0 }
          ]
        }
      ],
      skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Tableau', 'TensorFlow', 'Spark'],
      projects: [
        'Customer Churn Prediction',
        'Sales Forecasting Model',
        'Sentiment Analysis Tool',
        'Recommendation System',
        'Real-time Analytics Dashboard'
      ],
      careerOutcomes: [
        'Data Scientist',
        'Machine Learning Engineer',
        'Data Analyst',
        'Business Intelligence Analyst',
        'AI Research Scientist'
      ]
    },
    {
      id: 'ai-engineer',
      title: 'AI/ML Engineer',
      icon: '🤖',
      description: 'Build and deploy artificial intelligence and machine learning systems',
      duration: '10-14 months',
      difficulty: 'Advanced',
      prerequisites: ['Strong programming background', 'Mathematics/Statistics', 'Data structures'],
      phases: [
        {
          phase: 1,
          title: 'Foundation',
          duration: '3 months',
          courses: [
            { name: 'Python Programming Mastery', duration: '60h', status: 'completed', progress: 100 },
            { name: 'Advanced Mathematics for AI', duration: '50h', status: 'not-started', progress: 0 },
            { name: 'Data Structures & Algorithms', duration: '45h', status: 'not-started', progress: 0 }
          ]
        },
        {
          phase: 2,
          title: 'Machine Learning',
          duration: '4 months',
          courses: [
            { name: 'Machine Learning Fundamentals', duration: '70h', status: 'not-started', progress: 0 },
            { name: 'Deep Learning Specialization', duration: '80h', status: 'not-started', progress: 0 },
            { name: 'Computer Vision', duration: '60h', status: 'not-started', progress: 0 },
            { name: 'Natural Language Processing', duration: '50h', status: 'not-started', progress: 0 }
          ]
        },
        {
          phase: 3,
          title: 'AI Engineering',
          duration: '3 months',
          courses: [
            { name: 'MLOps & Production Systems', duration: '55h', status: 'not-started', progress: 0 },
            { name: 'AI Model Optimization', duration: '45h', status: 'not-started', progress: 0 },
            { name: 'Distributed Computing', duration: '40h', status: 'not-started', progress: 0 }
          ]
        }
      ],
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Kubernetes', 'Docker', 'AWS/GCP', 'MLOps', 'Computer Vision'],
      projects: [
        'Image Recognition System',
        'Chatbot with NLP',
        'Autonomous Vehicle AI',
        'Fraud Detection System',
        'AI-Powered Recommendation Engine'
      ],
      careerOutcomes: [
        'AI Engineer',
        'Machine Learning Engineer',
        'Computer Vision Engineer',
        'NLP Engineer',
        'AI Research Scientist'
      ]
    },
    {
      id: 'devops',
      title: 'DevOps Engineer',
      icon: '⚙️',
      description: 'Bridge development and operations with automation, CI/CD, and cloud infrastructure',
      duration: '6-8 months',
      difficulty: 'Intermediate to Advanced',
      prerequisites: ['Basic programming', 'Linux fundamentals', 'Networking basics'],
      phases: [
        {
          phase: 1,
          title: 'Foundation',
          duration: '2 months',
          courses: [
            { name: 'Linux System Administration', duration: '40h', status: 'not-started', progress: 0 },
            { name: 'Networking Fundamentals', duration: '35h', status: 'not-started', progress: 0 },
            { name: 'Git & Version Control', duration: '25h', status: 'not-started', progress: 0 }
          ]
        },
        {
          phase: 2,
          title: 'Cloud & Infrastructure',
          duration: '2-3 months',
          courses: [
            { name: 'AWS Cloud Fundamentals', duration: '50h', status: 'not-started', progress: 0 },
            { name: 'Docker & Containerization', duration: '40h', status: 'not-started', progress: 0 },
            { name: 'Kubernetes Orchestration', duration: '45h', status: 'not-started', progress: 0 }
          ]
        },
        {
          phase: 3,
          title: 'Automation & CI/CD',
          duration: '2 months',
          courses: [
            { name: 'CI/CD Pipelines', duration: '40h', status: 'not-started', progress: 0 },
            { name: 'Infrastructure as Code', duration: '35h', status: 'not-started', progress: 0 },
            { name: 'Monitoring & Logging', duration: '30h', status: 'not-started', progress: 0 }
          ]
        }
      ],
      skills: ['AWS/Azure', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Ansible', 'Python', 'Bash'],
      projects: [
        'Automated Deployment Pipeline',
        'Microservices Architecture',
        'Infrastructure Monitoring System',
        'Container Orchestration Platform',
        'Cloud Migration Project'
      ],
      careerOutcomes: [
        'DevOps Engineer',
        'Site Reliability Engineer',
        'Cloud Engineer',
        'Infrastructure Engineer',
        'Platform Engineer'
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#4caf50';
      case 'in-progress': return '#ff9800';
      case 'enrolled': return '#2196f3';
      case 'not-started': return '#9e9e9e';
      default: return '#9e9e9e';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '🔄';
      case 'enrolled': return '📚';
      case 'not-started': return '⭕';
      default: return '⭕';
    }
  };

  const calculatePathProgress = (path: any) => {
    const allCourses = path.phases.flatMap((phase: any) => phase.courses);
    const totalProgress = allCourses.reduce((sum: number, course: any) => sum + course.progress, 0);
    return Math.round(totalProgress / allCourses.length);
  };

  if (selectedPath) {
    const pathProgress = calculatePathProgress(selectedPath);

    return (
      <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Back Button */}
        <button
          onClick={() => setSelectedPath(null)}
          style={{
            backgroundColor: '#f5f5f5',
            border: '1px solid #ddd',
            padding: '10px 20px',
            borderRadius: '6px',
            cursor: 'pointer',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          ← Back to Learning Paths
        </button>

        {/* Path Header */}
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
            <div style={{ fontSize: '4rem' }}>{selectedPath.icon}</div>
            <div>
              <h1 style={{ color: '#333', margin: 0, marginBottom: '10px' }}>{selectedPath.title}</h1>
              <p style={{ color: '#666', fontSize: '18px', margin: 0 }}>{selectedPath.description}</p>
            </div>
          </div>

          {/* Path Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '20px',
            marginBottom: '20px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1976d2' }}>{selectedPath.duration}</div>
              <div style={{ fontSize: '14px', color: '#666' }}>Duration</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#9c27b0' }}>{selectedPath.difficulty}</div>
              <div style={{ fontSize: '14px', color: '#666' }}>Difficulty Level</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#9c27b0' }}>{pathProgress}%</div>
              <div style={{ fontSize: '14px', color: '#666' }}>Your Progress</div>
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ fontWeight: 'bold' }}>Overall Progress</span>
              <span>{pathProgress}%</span>
            </div>
            <div style={{
              backgroundColor: '#e0e0e0',
              borderRadius: '10px',
              height: '12px',
              overflow: 'hidden'
            }}>
              <div style={{
                backgroundColor: '#1976d2',
                height: '100%',
                width: `${pathProgress}%`,
                transition: 'width 0.3s ease',
                borderRadius: '10px'
              }} />
            </div>
          </div>

          {/* Prerequisites */}
          <div style={{ marginBottom: '20px' }}>
            <h4 style={{ color: '#333', marginBottom: '10px' }}>📋 Prerequisites:</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {selectedPath.prerequisites.map((prereq: string, index: number) => (
                <span key={index} style={{
                  backgroundColor: '#fff3e0',
                  color: '#f57c00',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  border: '1px solid #ffcc02'
                }}>
                  {prereq}
                </span>
              ))}
            </div>
          </div>

          {/* Skills You'll Learn */}
          <div>
            <h4 style={{ color: '#333', marginBottom: '10px' }}>🎯 Skills You'll Master:</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {selectedPath.skills.map((skill: string, index: number) => (
                <span key={index} style={{
                  backgroundColor: '#e3f2fd',
                  color: '#1976d2',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  border: '1px solid #bbdefb'
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Phases */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#333', marginBottom: '20px' }}>📚 Learning Phases</h2>
          {selectedPath.phases.map((phase: any, phaseIndex: number) => {
            const phaseProgress = Math.round(
              phase.courses.reduce((sum: number, course: any) => sum + course.progress, 0) / phase.courses.length
            );

            return (
              <div key={phaseIndex} style={{
                backgroundColor: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <h3 style={{ color: '#333', margin: 0 }}>
                    Phase {phase.phase}: {phase.title}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ color: '#666', fontSize: '14px' }}>{phase.duration}</span>
                    <span style={{
                      backgroundColor: phaseProgress === 100 ? '#4caf50' : phaseProgress > 0 ? '#ff9800' : '#e0e0e0',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {phaseProgress}%
                    </span>
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#e0e0e0',
                  borderRadius: '10px',
                  height: '8px',
                  overflow: 'hidden',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    backgroundColor: phaseProgress === 100 ? '#4caf50' : '#1976d2',
                    height: '100%',
                    width: `${phaseProgress}%`,
                    transition: 'width 0.3s ease'
                  }} />
                </div>

                <div style={{ display: 'grid', gap: '15px' }}>
                  {phase.courses.map((course: any, courseIndex: number) => (
                    <div key={courseIndex} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '15px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '8px',
                      border: `2px solid ${getStatusColor(course.status)}20`
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span style={{ fontSize: '20px' }}>{getStatusIcon(course.status)}</span>
                        <div>
                          <h4 style={{ margin: 0, color: '#333' }}>{course.name}</h4>
                          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{course.duration}</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '14px', fontWeight: 'bold', color: getStatusColor(course.status) }}>
                            {course.progress}%
                          </div>
                          <div style={{ fontSize: '12px', color: '#666', textTransform: 'capitalize' }}>
                            {course.status.replace('-', ' ')}
                          </div>
                        </div>
                        <button style={{
                          backgroundColor: course.status === 'not-started' ? '#1976d2' :
                                          course.status === 'completed' ? '#4caf50' : '#ff9800',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}>
                          {course.status === 'completed' ? 'Review' :
                           course.status === 'in-progress' ? 'Continue' :
                           course.status === 'enrolled' ? 'Start' : 'Enroll'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Projects & Career Outcomes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
          {/* Projects */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#333', marginBottom: '20px' }}>🚀 Portfolio Projects</h3>
            <div style={{ display: 'grid', gap: '10px' }}>
              {selectedPath.projects.map((project: string, index: number) => (
                <div key={index} style={{
                  padding: '12px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '6px',
                  borderLeft: '4px solid #1976d2'
                }}>
                  <span style={{ fontWeight: 'bold' }}>{index + 1}. {project}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Career Outcomes */}
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: '#333', marginBottom: '20px' }}>💼 Career Opportunities</h3>
            <div style={{ display: 'grid', gap: '10px' }}>
              {selectedPath.careerOutcomes.map((career: string, index: number) => (
                <div key={index} style={{
                  padding: '12px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '6px',
                  borderLeft: '4px solid #4caf50'
                }}>
                  <span style={{ fontWeight: 'bold' }}>{career}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button style={{
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            marginRight: '15px'
          }}>
            🚀 Start This Path
          </button>
          <button style={{
            backgroundColor: 'white',
            color: '#1976d2',
            border: '2px solid #1976d2',
            padding: '15px 30px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            📄 Download Roadmap
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#333', marginBottom: '10px' }}>🎯 Personalized Learning Paths</h1>
        <p style={{ color: '#666', fontSize: '18px' }}>
          Choose your career path and get a structured roadmap with courses, projects, and skills
        </p>
      </div>

      {/* Learning Paths Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '25px'
      }}>
        {learningPaths.map((path) => {
          const pathProgress = calculatePathProgress(path);

          return (
            <div
              key={path.id}
              onClick={() => setSelectedPath(path)}
              style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '2px solid transparent'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                e.currentTarget.style.borderColor = '#1976d2';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ fontSize: '4rem', marginBottom: '15px' }}>{path.icon}</div>
                <h3 style={{ color: '#333', marginBottom: '10px', fontSize: '1.5rem' }}>{path.title}</h3>
                <p style={{ color: '#666', lineHeight: '1.5', margin: 0 }}>{path.description}</p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Your Progress</span>
                  <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{pathProgress}%</span>
                </div>
                <div style={{
                  backgroundColor: '#e0e0e0',
                  borderRadius: '10px',
                  height: '8px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    backgroundColor: '#1976d2',
                    height: '100%',
                    width: `${pathProgress}%`,
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '15px',
                marginBottom: '20px',
                fontSize: '14px'
              }}>
                <div>
                  <strong>Duration:</strong><br />
                  <span style={{ color: '#666' }}>{path.duration}</span>
                </div>
                <div>
                  <strong>Difficulty:</strong><br />
                  <span style={{ color: '#666' }}>{path.difficulty}</span>
                </div>
                <div>
                  <strong>Prerequisites:</strong><br />
                  <span style={{ color: '#9c27b0', fontSize: '14px' }}>
                    {path.prerequisites.slice(0, 2).join(', ')}
                    {path.prerequisites.length > 2 && '...'}
                  </span>
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <button style={{
                  backgroundColor: '#1976d2',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  width: '100%'
                }}>
                  View Detailed Roadmap →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Recommendations */}
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        marginTop: '40px'
      }}>
        <h2 style={{ color: '#333', marginBottom: '20px' }}>🤖 AI Recommendations</h2>
        <div style={{
          backgroundColor: '#e3f2fd',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #bbdefb'
        }}>
          <h4 style={{ color: '#1976d2', marginBottom: '10px' }}>💡 Recommended for You: Full Stack Engineer</h4>
          <p style={{ color: '#666', margin: 0 }}>
            Based on your current progress in React and Python, the Full Stack Engineer path is perfect for you.
            You're already 25% complete and can leverage your existing skills to become a complete web developer.
          </p>
        </div>
      </div>
    </div>
  );
}

// Enhanced Social Learning Page with Interactive Features
export function SocialPage({ onNavigate }: any) {
  const [activeTab, setActiveTab] = React.useState('forums');
  const [selectedForum, setSelectedForum] = React.useState<any>(null);
  const [selectedStudyGroup, setSelectedStudyGroup] = React.useState<any>(null);
  const [selectedChallenge, setSelectedChallenge] = React.useState<any>(null);
  const [newPostText, setNewPostText] = React.useState('');
  const [showNewPostForm, setShowNewPostForm] = React.useState(false);

  // Forums Data with Interactive Content
  const forums = [
    {
      id: 1,
      title: 'React Best Practices & Advanced Patterns',
      category: 'Frontend Development',
      description: 'Discuss React hooks, performance optimization, and modern patterns',
      members: 1247,
      posts: 89,
      lastActivity: '2 hours ago',
      icon: '⚛️',
      trending: true,
      posts_data: [
        {
          id: 1,
          title: 'useCallback vs useMemo - When to use which?',
          author: 'USER1',
          avatar: 'U1',
          time: '2 hours ago',
          content: 'I\'ve been working with React hooks and I\'m still confused about when to use useCallback vs useMemo. Can someone explain the practical differences with examples?',
          replies: 12,
          likes: 23,
          tags: ['hooks', 'performance', 'optimization'],
          replies_data: [
            {
              id: 1,
              author: 'USER2',
              avatar: 'U2',
              time: '1 hour ago',
              content: 'Great question! useCallback is for memoizing functions, useMemo is for memoizing values. Use useCallback when passing functions to child components to prevent unnecessary re-renders.',
              likes: 8
            },
            {
              id: 2,
              author: 'USER3',
              avatar: 'U3',
              time: '45 minutes ago',
              content: 'Here\'s a practical example:\n\n```jsx\n// useCallback for functions\nconst handleClick = useCallback(() => {\n  setCount(count + 1);\n}, [count]);\n\n// useMemo for expensive calculations\nconst expensiveValue = useMemo(() => {\n  return heavyCalculation(data);\n}, [data]);\n```',
              likes: 15
            }
          ]
        },
        {
          id: 2,
          title: 'Best practices for state management in large React apps',
          author: 'USER4',
          avatar: 'U4',
          time: '5 hours ago',
          content: 'What are your recommendations for state management in large React applications? Redux, Zustand, Context API, or something else?',
          replies: 8,
          likes: 19,
          tags: ['state-management', 'redux', 'context'],
          replies_data: []
        }
      ]
    },
    {
      id: 2,
      title: 'Python Programming Help & Tips',
      category: 'Backend Development',
      description: 'Get help with Python syntax, libraries, and best practices',
      members: 892,
      posts: 156,
      lastActivity: '1 hour ago',
      icon: '🐍',
      trending: false
    },
    {
      id: 3,
      title: 'Machine Learning & AI Discussions',
      category: 'Data Science',
      description: 'Share ML projects, discuss algorithms, and get help with AI concepts',
      members: 2156,
      posts: 234,
      lastActivity: '30 minutes ago',
      icon: '🤖',
      trending: true
    }
  ];

  // Study Groups Data
  const studyGroups = [
    {
      id: 1,
      name: 'Full-Stack JavaScript Bootcamp',
      description: 'Weekly study sessions covering React, Node.js, and MongoDB',
      members: 25,
      nextMeeting: 'Friday, 7:00 PM EST',
      meetingType: 'Virtual (Zoom)',
      currentTopic: 'Building REST APIs with Express.js',
      schedule: 'Every Friday 7-9 PM',
      level: 'Intermediate',
      icon: '🚀',
      organizer: 'USER1',
      progress: 65,
      upcomingTopics: [
        'Authentication & JWT Tokens',
        'Database Design & MongoDB',
        'Deployment with Docker',
        'Testing with Jest & Cypress'
      ],
      members_list: [
        { name: 'You (Demo User)', avatar: 'DU', role: 'member', joinDate: '2024-01-15' },
        { name: 'USER1', avatar: 'U1', role: 'organizer', joinDate: '2024-01-01' },
        { name: 'USER2', avatar: 'U2', role: 'member', joinDate: '2024-01-10' },
        { name: 'USER3', avatar: 'U3', role: 'member', joinDate: '2024-01-12' }
      ]
    },
    {
      id: 2,
      name: 'Data Science Study Circle',
      description: 'Collaborative learning for Python, pandas, and machine learning',
      members: 18,
      nextMeeting: 'Sunday, 3:00 PM EST',
      meetingType: 'Hybrid (Campus + Online)',
      currentTopic: 'Feature Engineering Techniques',
      schedule: 'Every Sunday 3-5 PM',
      level: 'Advanced',
      icon: '📊',
      organizer: 'USER4',
      progress: 40
    },
    {
      id: 3,
      name: 'UI/UX Design Workshop',
      description: 'Design thinking, prototyping, and user research methods',
      members: 32,
      nextMeeting: 'Wednesday, 6:30 PM EST',
      meetingType: 'In-Person (Design Lab)',
      currentTopic: 'User Journey Mapping',
      schedule: 'Every Wednesday 6:30-8:30 PM',
      level: 'Beginner',
      icon: '🎨',
      organizer: 'USER5',
      progress: 25
    }
  ];

  // Challenges Data
  const challenges = [
    {
      id: 1,
      title: 'Build a Weather Dashboard',
      description: 'Create a responsive weather app using React and a weather API',
      difficulty: 'Intermediate',
      timeLimit: '7 days',
      participants: 45,
      submissions: 23,
      deadline: '2024-02-15',
      prize: '🏆 Gold Trophy + Certificate',
      skills: ['React', 'API Integration', 'CSS'],
      icon: '🌤️',
      status: 'active',
      requirements: [
        'Use React functional components and hooks',
        'Integrate with OpenWeatherMap API',
        'Responsive design for mobile and desktop',
        'Display 5-day forecast',
        'Include search functionality'
      ],
      judging_criteria: [
        'Code quality and organization (30%)',
        'User interface design (25%)',
        'Functionality and features (25%)',
        'Responsiveness (20%)'
      ]
    },
    {
      id: 2,
      title: 'Data Visualization Challenge',
      description: 'Create an interactive dashboard using Python and Plotly',
      difficulty: 'Advanced',
      timeLimit: '10 days',
      participants: 28,
      submissions: 12,
      deadline: '2024-02-20',
      prize: '🥇 Champion Medal + Recognition',
      skills: ['Python', 'Plotly', 'Data Analysis'],
      icon: '📈',
      status: 'active'
    },
    {
      id: 3,
      title: 'CSS Animation Showcase',
      description: 'Design creative CSS animations without JavaScript',
      difficulty: 'Beginner',
      timeLimit: '5 days',
      participants: 67,
      submissions: 34,
      deadline: '2024-02-12',
      prize: '🎨 Design Tool Subscription',
      skills: ['CSS', 'Animation', 'Design'],
      icon: '✨',
      status: 'ending_soon'
    }
  ];

  // Main Social Learning Interface
  if (selectedForum) {
    return (
      <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        <button
          onClick={() => setSelectedForum(null)}
          style={{
            backgroundColor: '#f5f5f5',
            border: '1px solid #ddd',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          ← Back to Forums
        </button>

        {/* Forum Header */}
        <div style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <div style={{ fontSize: '3rem' }}>{selectedForum.icon}</div>
            <div>
              <h2 style={{ margin: '0 0 5px 0', color: '#333' }}>{selectedForum.title}</h2>
              <p style={{ margin: '0 0 10px 0', color: '#666' }}>{selectedForum.description}</p>
              <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#999' }}>
                <span>👥 {selectedForum.members} members</span>
                <span>📝 {selectedForum.posts} posts</span>
                <span>🕒 Last activity: {selectedForum.lastActivity}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowNewPostForm(!showNewPostForm)}
            style={{
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            ✏️ New Post
          </button>
        </div>

        {/* New Post Form */}
        {showNewPostForm && (
          <div style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            marginBottom: '30px'
          }}>
            <h3 style={{ marginBottom: '15px' }}>Create New Post</h3>
            <input
              type="text"
              placeholder="Post title..."
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                marginBottom: '15px',
                fontSize: '16px'
              }}
            />
            <textarea
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder="Share your thoughts, ask questions, or start a discussion..."
              style={{
                width: '100%',
                height: '120px',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                marginBottom: '15px',
                fontSize: '14px',
                resize: 'vertical'
              }}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={{
                backgroundColor: '#1976d2',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}>
                Post
              </button>
              <button
                onClick={() => setShowNewPostForm(false)}
                style={{
                  backgroundColor: '#f5f5f5',
                  color: '#666',
                  border: '1px solid #ddd',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Forum Posts */}
        <div>
          {selectedForum.posts_data?.map((post: any) => (
            <div key={post.id} style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              marginBottom: '20px',
              border: '1px solid #eee'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#1976d2',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  {post.avatar}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <h4 style={{ margin: 0, color: '#333' }}>{post.title}</h4>
                    {post.tags && (
                      <div style={{ display: 'flex', gap: '5px' }}>
                        {post.tags.map((tag: string, index: number) => (
                          <span key={index} style={{
                            backgroundColor: '#e3f2fd',
                            color: '#1976d2',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            fontSize: '12px'
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px' }}>
                    <span style={{ color: '#666', fontSize: '14px' }}>by {post.author}</span>
                    <span style={{ color: '#999', fontSize: '14px' }}>{post.time}</span>
                  </div>

                  <p style={{ color: '#333', lineHeight: '1.6', marginBottom: '15px', whiteSpace: 'pre-wrap' }}>
                    {post.content}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <button style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#666',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '14px'
                    }}>
                      👍 {post.likes}
                    </button>
                    <button style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#666',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '14px'
                    }}>
                      💬 {post.replies} replies
                    </button>
                    <button style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#1976d2',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}>
                      Reply
                    </button>
                  </div>

                  {/* Show replies if available */}
                  {post.replies_data && post.replies_data.length > 0 && (
                    <div style={{ marginTop: '20px', paddingLeft: '20px', borderLeft: '3px solid #eee' }}>
                      {post.replies_data.map((reply: any) => (
                        <div key={reply.id} style={{
                          backgroundColor: '#f8f9fa',
                          padding: '15px',
                          borderRadius: '8px',
                          marginBottom: '10px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                            <div style={{
                              width: '30px',
                              height: '30px',
                              borderRadius: '50%',
                              backgroundColor: '#4caf50',
                              color: 'white',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              fontWeight: 'bold'
                            }}>
                              {reply.avatar}
                            </div>
                            <span style={{ fontWeight: 'bold', color: '#333' }}>{reply.author}</span>
                            <span style={{ color: '#999', fontSize: '12px' }}>{reply.time}</span>
                          </div>
                          <p style={{ color: '#333', lineHeight: '1.5', margin: '0 0 10px 0', whiteSpace: 'pre-wrap' }}>
                            {reply.content}
                          </p>
                          <button style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: '#666',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}>
                            👍 {reply.likes}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Main Social Learning Interface
  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', marginBottom: '30px' }}>👥 Social Learning</h1>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        marginBottom: '30px',
        borderBottom: '2px solid #eee'
      }}>
        {[
          { id: 'forums', label: '💬 Discussion Forums', count: forums.length },
          { id: 'groups', label: '📚 Study Groups', count: studyGroups.length },
          { id: 'challenges', label: '🏆 Challenges', count: challenges.length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 24px',
              border: 'none',
              backgroundColor: 'transparent',
              color: activeTab === tab.id ? '#1976d2' : '#666',
              borderBottom: activeTab === tab.id ? '2px solid #1976d2' : '2px solid transparent',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: activeTab === tab.id ? 'bold' : 'normal',
              marginBottom: '-2px'
            }}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Forums Tab */}
      {activeTab === 'forums' && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ color: '#666', fontSize: '16px' }}>
              Join discussions, ask questions, and share knowledge with fellow learners
            </p>
          </div>
          <div style={{ display: 'grid', gap: '20px' }}>
            {forums.map((forum) => (
              <div
                key={forum.id}
                onClick={() => setSelectedForum(forum)}
                style={{
                  backgroundColor: 'white',
                  padding: '25px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: '1px solid #eee',
                  position: 'relative'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
              >
                {forum.trending && (
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    backgroundColor: '#ff5722',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    🔥 TRENDING
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                  <div style={{ fontSize: '2.5rem' }}>{forum.icon}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{forum.title}</h3>
                    <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>{forum.description}</p>
                    <div style={{ display: 'flex', gap: '20px', fontSize: '12px', color: '#999' }}>
                      <span>👥 {forum.members} members</span>
                      <span>📝 {forum.posts} posts</span>
                      <span>🕒 {forum.lastActivity}</span>
                    </div>
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#f8f9fa',
                  padding: '12px',
                  borderRadius: '8px',
                  borderLeft: '4px solid #1976d2'
                }}>
                  <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Latest Activity:</div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
                    Recent discussion about React hooks and performance optimization
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Study Groups Tab */}
      {activeTab === 'groups' && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ color: '#666', fontSize: '16px' }}>
              Join study groups for collaborative learning and peer support
            </p>
          </div>
          <div style={{ display: 'grid', gap: '20px' }}>
            {studyGroups.map((group) => (
              <div
                key={group.id}
                onClick={() => setSelectedStudyGroup(group)}
                style={{
                  backgroundColor: 'white',
                  padding: '25px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: '1px solid #eee'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                  <div style={{ fontSize: '2.5rem' }}>{group.icon}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{group.name}</h3>
                    <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>{group.description}</p>
                    <div style={{ display: 'flex', gap: '20px', fontSize: '12px', color: '#999' }}>
                      <span>👥 {group.members} members</span>
                      <span>📅 {group.schedule}</span>
                      <span>🎯 {group.level}</span>
                    </div>
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#e3f2fd',
                  padding: '12px',
                  borderRadius: '8px',
                  marginBottom: '15px'
                }}>
                  <div style={{ fontSize: '12px', color: '#1976d2', marginBottom: '4px' }}>Next Meeting:</div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
                    {group.nextMeeting} • {group.currentTopic}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    backgroundColor: group.level === 'Beginner' ? '#e8f5e8' :
                                   group.level === 'Intermediate' ? '#fff3e0' : '#ffebee',
                    color: group.level === 'Beginner' ? '#2e7d32' :
                           group.level === 'Intermediate' ? '#f57c00' : '#c62828',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {group.level}
                  </span>
                  <span style={{ fontSize: '14px', color: '#1976d2', fontWeight: 'bold' }}>
                    Click to join →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Challenges Tab */}
      {activeTab === 'challenges' && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ color: '#666', fontSize: '16px' }}>
              Participate in coding challenges and showcase your skills
            </p>
          </div>
          <div style={{ display: 'grid', gap: '20px' }}>
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                onClick={() => setSelectedChallenge(challenge)}
                style={{
                  backgroundColor: 'white',
                  padding: '25px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: '1px solid #eee',
                  position: 'relative'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
              >
                {challenge.status === 'ending_soon' && (
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    backgroundColor: '#ff5722',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    ⏰ ENDING SOON
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                  <div style={{ fontSize: '2.5rem' }}>{challenge.icon}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{challenge.title}</h3>
                    <p style={{ margin: '0 0 10px 0', color: '#666', fontSize: '14px' }}>{challenge.description}</p>
                    <div style={{ display: 'flex', gap: '20px', fontSize: '12px', color: '#999' }}>
                      <span>🎯 {challenge.difficulty}</span>
                      <span>⏱️ {challenge.timeLimit}</span>
                      <span>👥 {challenge.participants} participants</span>
                    </div>
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#fff3e0',
                  padding: '12px',
                  borderRadius: '8px',
                  marginBottom: '15px'
                }}>
                  <div style={{ fontSize: '12px', color: '#f57c00', marginBottom: '4px' }}>Prize:</div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
                    {challenge.prize}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {challenge.skills.slice(0, 2).map((skill: string, index: number) => (
                      <span key={index} style={{
                        backgroundColor: '#e3f2fd',
                        color: '#1976d2',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px'
                      }}>
                        {skill}
                      </span>
                    ))}
                    {challenge.skills.length > 2 && (
                      <span style={{ fontSize: '12px', color: '#666' }}>
                        +{challenge.skills.length - 2} more
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '14px', color: '#1976d2', fontWeight: 'bold' }}>
                    Join Challenge →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Achievements Page
export function AchievementsPage({ onNavigate }: any) {
  const [activeTab, setActiveTab] = React.useState('badges');

  const badges = [
    {
      id: 1,
      name: 'First Course Completed',
      description: 'Complete your first course',
      icon: '🎓',
      earned: true,
      earnedDate: '2024-01-15',
      rarity: 'Common',
      points: 100
    },
    {
      id: 2,
      name: 'Frontend Developer',
      description: 'Complete 3 frontend courses',
      icon: '💻',
      earned: true,
      earnedDate: '2024-01-20',
      rarity: 'Uncommon',
      points: 250
    },
    {
      id: 3,
      name: 'Quiz Master',
      description: 'Score 100% on 5 quizzes',
      icon: '🧠',
      earned: false,
      progress: 60,
      rarity: 'Rare',
      points: 500
    },
    {
      id: 4,
      name: 'Learning Streak',
      description: 'Learn for 30 consecutive days',
      icon: '🔥',
      earned: false,
      progress: 77,
      rarity: 'Epic',
      points: 750
    },
    {
      id: 5,
      name: 'Social Butterfly',
      description: 'Participate in 10 forum discussions',
      icon: '🦋',
      earned: false,
      progress: 40,
      rarity: 'Uncommon',
      points: 300
    },
    {
      id: 6,
      name: 'Skill Master',
      description: 'Reach expert level in any skill',
      icon: '⭐',
      earned: true,
      earnedDate: '2024-01-25',
      rarity: 'Legendary',
      points: 1000
    },
  ];

  const certificates = [
    {
      id: 1,
      courseName: 'React Development Fundamentals',
      completionDate: '2024-01-20',
      grade: 'A+',
      credentialId: 'RDF-2024-001',
      skills: ['React', 'JavaScript', 'JSX', 'Component Architecture'],
      duration: '40 hours'
    },
    {
      id: 2,
      courseName: 'Python Programming Mastery',
      completionDate: '2024-01-10',
      grade: 'A',
      credentialId: 'PPM-2024-002',
      skills: ['Python', 'Data Structures', 'OOP', 'Problem Solving'],
      duration: '60 hours'
    },
    {
      id: 3,
      courseName: 'Workplace Safety Training',
      completionDate: '2024-01-05',
      grade: 'Pass',
      credentialId: 'WST-2024-003',
      skills: ['Safety Protocols', 'Risk Assessment', 'Emergency Procedures'],
      duration: '8 hours',
      type: 'mandatory'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return '#9e9e9e';
      case 'Uncommon': return '#4caf50';
      case 'Rare': return '#2196f3';
      case 'Epic': return '#9c27b0';
      case 'Legendary': return '#ff9800';
      default: return '#9e9e9e';
    }
  };

  const totalPoints = badges.filter(b => b.earned).reduce((sum, badge) => sum + badge.points, 0);
  const earnedBadges = badges.filter(b => b.earned).length;



  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', marginBottom: '30px' }}>🏆 Achievements</h1>

      {/* Achievement Stats */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h3 style={{ color: '#333', marginBottom: '20px' }}>📊 Achievement Summary</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '20px',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '2.5rem', color: '#ff9800', fontWeight: 'bold' }}>{earnedBadges}</div>
            <div style={{ color: '#666', fontWeight: 'bold' }}>Badges Earned</div>
            <div style={{ fontSize: '12px', color: '#999' }}>out of {badges.length}</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', color: '#4caf50', fontWeight: 'bold' }}>{certificates.length}</div>
            <div style={{ color: '#666', fontWeight: 'bold' }}>Certificates</div>
            <div style={{ fontSize: '12px', color: '#999' }}>Completed</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', color: '#2196f3', fontWeight: 'bold' }}>{totalPoints}</div>
            <div style={{ color: '#666', fontWeight: 'bold' }}>Total Points</div>
            <div style={{ fontSize: '12px', color: '#999' }}>Achievement Score</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', color: '#9c27b0', fontWeight: 'bold' }}>3</div>
            <div style={{ color: '#666', fontWeight: 'bold' }}>Rank</div>
            <div style={{ fontSize: '12px', color: '#999' }}>Leaderboard</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        marginBottom: '30px',
        borderBottom: '2px solid #e0e0e0'
      }}>
        <button
          onClick={() => setActiveTab('badges')}
          style={{
            padding: '12px 24px',
            border: 'none',
            backgroundColor: 'transparent',
            color: activeTab === 'badges' ? '#ff9800' : '#666',
            borderBottom: activeTab === 'badges' ? '2px solid #ff9800' : '2px solid transparent',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: activeTab === 'badges' ? 'bold' : 'normal',
            marginBottom: '-2px'
          }}
        >
          🏅 Badges ({earnedBadges}/{badges.length})
        </button>
        <button
          onClick={() => setActiveTab('certificates')}
          style={{
            padding: '12px 24px',
            border: 'none',
            backgroundColor: 'transparent',
            color: activeTab === 'certificates' ? '#4caf50' : '#666',
            borderBottom: activeTab === 'certificates' ? '2px solid #4caf50' : '2px solid transparent',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: activeTab === 'certificates' ? 'bold' : 'normal',
            marginBottom: '-2px'
          }}
        >
          📜 Certificates ({certificates.length})
        </button>

      </div>

      {/* Badges Tab */}
      {activeTab === 'badges' && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ color: '#666', fontSize: '16px' }}>
              Earn badges by completing courses, participating in forums, and achieving learning milestones
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '25px'
          }}>
            {badges.map((badge) => (
              <div key={badge.id} style={{
                backgroundColor: 'white',
                padding: '25px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                textAlign: 'center',
                opacity: badge.earned ? 1 : 0.7,
                border: badge.earned ? `2px solid ${getRarityColor(badge.rarity)}` : '2px solid #e0e0e0'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '15px' }}>{badge.icon}</div>
                <h3 style={{ color: '#333', marginBottom: '10px' }}>{badge.name}</h3>
                <p style={{ color: '#666', marginBottom: '15px', fontSize: '14px' }}>{badge.description}</p>

                <div style={{ marginBottom: '15px' }}>
                  <span style={{
                    backgroundColor: getRarityColor(badge.rarity),
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    marginRight: '10px'
                  }}>
                    {badge.rarity}
                  </span>
                  <span style={{
                    backgroundColor: '#e0e0e0',
                    color: '#333',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}>
                    {badge.points} pts
                  </span>
                </div>

                {badge.earned ? (
                  <div style={{ color: '#4caf50', fontWeight: 'bold' }}>
                    ✅ Earned on {new Date(badge.earnedDate!).toLocaleDateString()}
                  </div>
                ) : (
                  <div>
                    <div style={{ marginBottom: '10px' }}>
                      <div style={{ fontSize: '14px', marginBottom: '5px' }}>
                        Progress: {badge.progress}%
                      </div>
                      <div style={{
                        backgroundColor: '#e0e0e0',
                        borderRadius: '10px',
                        height: '8px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          backgroundColor: getRarityColor(badge.rarity),
                          height: '100%',
                          width: `${badge.progress}%`,
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                    </div>
                    <div style={{ color: '#666', fontSize: '12px' }}>
                      Keep learning to unlock!
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certificates Tab */}
      {activeTab === 'certificates' && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ color: '#666', fontSize: '16px' }}>
              Official certificates for completed courses with verified credentials
            </p>
          </div>
          <div style={{
            display: 'grid',
            gap: '25px'
          }}>
            {certificates.map((cert) => (
              <div key={cert.id} style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: cert.type === 'mandatory' ? '2px solid #ff9800' : '2px solid #4caf50'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <div style={{ fontSize: '2rem', marginRight: '15px' }}>🏆</div>
                      <div>
                        <h3 style={{ color: '#333', margin: 0 }}>Certificate of Completion</h3>
                        <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>
                          {cert.type === 'mandatory' ? 'Mandatory Training' : 'Professional Development'}
                        </p>
                      </div>
                    </div>

                    <h2 style={{ color: '#1976d2', marginBottom: '15px' }}>{cert.courseName}</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
                      <div>
                        <strong>Completion Date:</strong> {new Date(cert.completionDate).toLocaleDateString()}
                      </div>
                      <div>
                        <strong>Grade:</strong> <span style={{ color: cert.grade.includes('A') ? '#4caf50' : '#ff9800', fontWeight: 'bold' }}>{cert.grade}</span>
                      </div>
                      <div>
                        <strong>Duration:</strong> {cert.duration}
                      </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <strong>Skills Demonstrated:</strong>
                      <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {cert.skills.map((skill, index) => (
                          <span key={index} style={{
                            backgroundColor: '#e3f2fd',
                            color: '#1976d2',
                            padding: '4px 12px',
                            borderRadius: '12px',
                            fontSize: '12px'
                          }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{
                      backgroundColor: '#f5f5f5',
                      padding: '15px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      color: '#666'
                    }}>
                      <strong>Credential ID:</strong> {cert.credentialId}<br />
                      <strong>Verification:</strong> This certificate can be verified through our credential system
                    </div>
                  </div>

                  <div style={{ marginLeft: '20px' }}>
                    <button style={{
                      backgroundColor: '#1976d2',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      marginBottom: '10px',
                      display: 'block',
                      width: '100%'
                    }}>
                      📄 Download PDF
                    </button>
                    <button style={{
                      backgroundColor: '#4caf50',
                      color: 'white',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'block',
                      width: '100%'
                    }}>
                      🔗 Share Certificate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}



    </div>
  );
}

// Leaderboard Page
export function LeaderboardPage({ onNavigate }: any) {
  const [leaderboardPeriod, setLeaderboardPeriod] = React.useState('weekly');

  const leaderboardData = {
    daily: [
      { rank: 1, name: 'USER1', points: 450, coursesCompleted: 2, timeSpent: '4.5h', avatar: 'U1', isCurrentUser: false, reward: '🥇 Gold Medal', joinDate: '2024-01-15', streak: 15 },
      { rank: 2, name: 'USER2', points: 380, coursesCompleted: 1, timeSpent: '3.8h', avatar: 'U2', isCurrentUser: false, reward: '🥈 Silver Medal', joinDate: '2024-01-10', streak: 8 },
      { rank: 3, name: 'You (Demo User)', points: 320, coursesCompleted: 1, timeSpent: '3.2h', avatar: 'D', isCurrentUser: true, reward: '🥉 Bronze Medal', joinDate: '2024-01-20', streak: 5 },
      { rank: 4, name: 'USER3', points: 280, coursesCompleted: 1, timeSpent: '2.8h', avatar: 'U3', isCurrentUser: false, reward: '🎖️ Achievement Badge', joinDate: '2024-01-12', streak: 3 },
      { rank: 5, name: 'USER4', points: 250, coursesCompleted: 0, timeSpent: '2.5h', avatar: 'U4', isCurrentUser: false, reward: '⭐ Star Performer', joinDate: '2024-01-18', streak: 2 },
      { rank: 6, name: 'USER5', points: 220, coursesCompleted: 1, timeSpent: '2.2h', avatar: 'U5', isCurrentUser: false, reward: '🌟 Daily Achiever', joinDate: '2024-01-14', streak: 4 },
      { rank: 7, name: 'USER6', points: 200, coursesCompleted: 0, timeSpent: '2.0h', avatar: 'U6', isCurrentUser: false, reward: '📚 Learning Badge', joinDate: '2024-01-16', streak: 1 },
      { rank: 8, name: 'USER7', points: 180, coursesCompleted: 0, timeSpent: '1.8h', avatar: 'U7', isCurrentUser: false, reward: '🎯 Focus Award', joinDate: '2024-01-19', streak: 6 },
    ],
    weekly: [
      { rank: 1, name: 'USER1', points: 2450, coursesCompleted: 8, timeSpent: '24.5h', avatar: 'U1', isCurrentUser: false, reward: '🏆 Weekly Champion', joinDate: '2024-01-08', streak: 25 },
      { rank: 2, name: 'USER2', points: 2380, coursesCompleted: 7, timeSpent: '23.8h', avatar: 'U2', isCurrentUser: false, reward: '🥈 Weekly Runner-up', joinDate: '2024-01-05', streak: 22 },
      { rank: 3, name: 'You (Demo User)', points: 2250, coursesCompleted: 6, timeSpent: '22.5h', avatar: 'D', isCurrentUser: true, reward: '🥉 Top 3 Weekly', joinDate: '2024-01-20', streak: 18 },
      { rank: 4, name: 'USER3', points: 2100, coursesCompleted: 5, timeSpent: '21h', avatar: 'U3', isCurrentUser: false, reward: '🎯 Excellence Badge', joinDate: '2024-01-12', streak: 15 },
      { rank: 5, name: 'USER4', points: 1950, coursesCompleted: 4, timeSpent: '19.5h', avatar: 'U4', isCurrentUser: false, reward: '⚡ Lightning Learner', joinDate: '2024-01-15', streak: 12 },
      { rank: 6, name: 'USER5', points: 1800, coursesCompleted: 4, timeSpent: '18h', avatar: 'U5', isCurrentUser: false, reward: '🌟 Consistent Performer', joinDate: '2024-01-10', streak: 20 },
      { rank: 7, name: 'USER6', points: 1650, coursesCompleted: 3, timeSpent: '16.5h', avatar: 'U6', isCurrentUser: false, reward: '📈 Progress Master', joinDate: '2024-01-14', streak: 8 },
      { rank: 8, name: 'USER7', points: 1500, coursesCompleted: 3, timeSpent: '15h', avatar: 'U7', isCurrentUser: false, reward: '🎓 Knowledge Seeker', joinDate: '2024-01-18', streak: 10 },
    ],
    monthly: [
      { rank: 1, name: 'USER1', points: 8900, coursesCompleted: 25, timeSpent: '89h', avatar: 'U1', isCurrentUser: false, reward: '👑 Monthly Champion', joinDate: '2023-12-15', streak: 45 },
      { rank: 2, name: 'USER2', points: 8650, coursesCompleted: 23, timeSpent: '86.5h', avatar: 'U2', isCurrentUser: false, reward: '🥈 Monthly Runner-up', joinDate: '2023-12-20', streak: 42 },
      { rank: 3, name: 'You (Demo User)', points: 8200, coursesCompleted: 20, timeSpent: '82h', avatar: 'D', isCurrentUser: true, reward: '🥉 Top 3 Monthly', joinDate: '2024-01-20', streak: 35 },
      { rank: 4, name: 'USER3', points: 7800, coursesCompleted: 18, timeSpent: '78h', avatar: 'U3', isCurrentUser: false, reward: '🌟 Dedication Award', joinDate: '2023-12-25', streak: 38 },
      { rank: 5, name: 'USER4', points: 7500, coursesCompleted: 16, timeSpent: '75h', avatar: 'U4', isCurrentUser: false, reward: '🚀 Progress Master', joinDate: '2024-01-01', streak: 30 },
      { rank: 6, name: 'USER5', points: 7200, coursesCompleted: 15, timeSpent: '72h', avatar: 'U5', isCurrentUser: false, reward: '💎 Elite Learner', joinDate: '2023-12-18', streak: 28 },
      { rank: 7, name: 'USER6', points: 6800, coursesCompleted: 14, timeSpent: '68h', avatar: 'U6', isCurrentUser: false, reward: '🏅 Achievement Master', joinDate: '2024-01-05', streak: 25 },
      { rank: 8, name: 'USER7', points: 6500, coursesCompleted: 13, timeSpent: '65h', avatar: 'U7', isCurrentUser: false, reward: '⭐ Star Student', joinDate: '2023-12-22', streak: 32 },
    ]
  };

  const recentAwards = [
    { user: 'USER1', award: 'Course Completion Master', date: '2 hours ago', icon: '🎓', type: 'achievement' },
    { user: 'USER2', award: 'Quiz Perfect Score', date: '4 hours ago', icon: '🧠', type: 'performance' },
    { user: 'You (Demo User)', award: 'Frontend Developer Badge', date: '1 day ago', icon: '💻', type: 'skill' },
    { user: 'USER3', award: '7-Day Learning Streak', date: '2 days ago', icon: '🔥', type: 'consistency' },
    { user: 'USER4', award: 'Social Contributor', date: '3 days ago', icon: '👥', type: 'community' },
    { user: 'USER1', award: 'Weekly Champion', date: '1 week ago', icon: '🏆', type: 'leaderboard' },
  ];

  const platformStats = {
    totalUsers: 1247,
    activeToday: 89,
    coursesCompleted: 3456,
    totalHoursLearned: 12847,
    averageProgress: 73
  };

  const getCurrentLeaderboard = () => {
    return leaderboardData[leaderboardPeriod as keyof typeof leaderboardData] || leaderboardData.weekly;
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', marginBottom: '30px' }}>🏆 Global Leaderboard</h1>

      {/* Platform Statistics */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h3 style={{ color: '#333', marginBottom: '20px' }}>📊 Platform Statistics</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '2.5rem', color: '#1976d2', fontWeight: 'bold' }}>{platformStats.totalUsers.toLocaleString()}</div>
            <div style={{ color: '#666', fontWeight: 'bold' }}>Total Users</div>
            <div style={{ fontSize: '12px', color: '#999' }}>Active Learners</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', color: '#4caf50', fontWeight: 'bold' }}>{platformStats.activeToday}</div>
            <div style={{ color: '#666', fontWeight: 'bold' }}>Active Today</div>
            <div style={{ fontSize: '12px', color: '#999' }}>Online Now</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', color: '#ff9800', fontWeight: 'bold' }}>{platformStats.coursesCompleted.toLocaleString()}</div>
            <div style={{ color: '#666', fontWeight: 'bold' }}>Courses Completed</div>
            <div style={{ fontSize: '12px', color: '#999' }}>Total Achievements</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', color: '#9c27b0', fontWeight: 'bold' }}>{platformStats.totalHoursLearned.toLocaleString()}h</div>
            <div style={{ color: '#666', fontWeight: 'bold' }}>Hours Learned</div>
            <div style={{ fontSize: '12px', color: '#999' }}>Community Total</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', color: '#f44336', fontWeight: 'bold' }}>{platformStats.averageProgress}%</div>
            <div style={{ color: '#666', fontWeight: 'bold' }}>Avg Progress</div>
            <div style={{ fontSize: '12px', color: '#999' }}>Platform Wide</div>
          </div>
        </div>
      </div>

      {/* Period Selection */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {[
          { id: 'daily', label: '📅 Daily', desc: 'Last 24 hours' },
          { id: 'weekly', label: '📊 Weekly', desc: 'Last 7 days' },
          { id: 'monthly', label: '🏆 Monthly', desc: 'Last 30 days' }
        ].map((period) => (
          <button
            key={period.id}
            onClick={() => setLeaderboardPeriod(period.id)}
            style={{
              padding: '15px 25px',
              border: '2px solid #ddd',
              borderRadius: '12px',
              backgroundColor: leaderboardPeriod === period.id ? '#9c27b0' : 'white',
              color: leaderboardPeriod === period.id ? 'white' : '#333',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              textAlign: 'center',
              minWidth: '150px'
            }}
            onMouseOver={(e) => {
              if (leaderboardPeriod !== period.id) {
                e.currentTarget.style.borderColor = '#9c27b0';
                e.currentTarget.style.backgroundColor = '#f3e5f5';
              }
            }}
            onMouseOut={(e) => {
              if (leaderboardPeriod !== period.id) {
                e.currentTarget.style.borderColor = '#ddd';
                e.currentTarget.style.backgroundColor = 'white';
              }
            }}
          >
            <div>{period.label}</div>
            <div style={{ fontSize: '12px', opacity: 0.8 }}>{period.desc}</div>
          </button>
        ))}
      </div>

      {/* Leaderboard */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        marginBottom: '30px'
      }}>
        <div style={{
          backgroundColor: '#9c27b0',
          color: 'white',
          padding: '20px',
          textAlign: 'center'
        }}>
          <h2 style={{ margin: 0, fontSize: '24px' }}>
            🏆 {leaderboardPeriod.charAt(0).toUpperCase() + leaderboardPeriod.slice(1)} Leaderboard
          </h2>
          <p style={{ margin: '5px 0 0 0', opacity: 0.9 }}>
            Top performers and their amazing achievements
          </p>
        </div>

        <div style={{ padding: '0' }}>
          {getCurrentLeaderboard().map((user, index) => (
            <div
              key={user.rank}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '20px 25px',
                borderBottom: index < getCurrentLeaderboard().length - 1 ? '1px solid #eee' : 'none',
                backgroundColor: user.isCurrentUser ? '#e3f2fd' : 'white',
                position: 'relative'
              }}
            >
              {/* Rank */}
              <div style={{
                minWidth: '60px',
                textAlign: 'center',
                marginRight: '20px'
              }}>
                {user.rank <= 3 ? (
                  <div style={{ fontSize: '2rem' }}>
                    {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                  </div>
                ) : (
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#666',
                    backgroundColor: '#f5f5f5',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto'
                  }}>
                    {user.rank}
                  </div>
                )}
              </div>

              {/* Avatar */}
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: user.isCurrentUser ? '#1976d2' : '#9c27b0',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 'bold',
                marginRight: '20px'
              }}>
                {user.avatar}
              </div>

              {/* User Info */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                  <h4 style={{
                    margin: 0,
                    fontSize: '18px',
                    fontWeight: user.isCurrentUser ? 'bold' : 'normal',
                    color: user.isCurrentUser ? '#1976d2' : '#333'
                  }}>
                    {user.name}
                  </h4>
                  {user.isCurrentUser && (
                    <span style={{
                      backgroundColor: '#1976d2',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '10px',
                      fontWeight: 'bold'
                    }}>
                      YOU
                    </span>
                  )}
                  {user.streak >= 7 && (
                    <span style={{
                      backgroundColor: '#ff9800',
                      color: 'white',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '10px',
                      fontWeight: 'bold'
                    }}>
                      🔥 {user.streak} day streak
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  Joined: {new Date(user.joinDate).toLocaleDateString()}
                </div>
              </div>

              {/* Stats */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px',
                textAlign: 'center',
                marginRight: '20px'
              }}>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1976d2' }}>
                    {user.points.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '11px', color: '#666' }}>Points</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#4caf50' }}>
                    {user.coursesCompleted}
                  </div>
                  <div style={{ fontSize: '11px', color: '#666' }}>Courses</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ff9800' }}>
                    {user.timeSpent}
                  </div>
                  <div style={{ fontSize: '11px', color: '#666' }}>Time</div>
                </div>
              </div>

              {/* Reward */}
              <div style={{
                minWidth: '200px',
                textAlign: 'right'
              }}>
                <div style={{
                  backgroundColor: user.rank <= 3 ? '#fff3e0' : '#f5f5f5',
                  color: user.rank <= 3 ? '#f57c00' : '#666',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  border: user.rank <= 3 ? '1px solid #ffcc02' : '1px solid #ddd'
                }}>
                  {user.reward}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Awards */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h3 style={{ color: '#333', marginBottom: '20px' }}>🎉 Recent Awards & Achievements</h3>
        <div style={{ display: 'grid', gap: '15px' }}>
          {recentAwards.map((award, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #e0e0e0'
            }}>
              <div style={{ fontSize: '24px', marginRight: '15px' }}>
                {award.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '2px' }}>
                  {award.user}
                </div>
                <div style={{ color: '#666', fontSize: '14px' }}>
                  Earned: {award.award}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  backgroundColor: award.type === 'leaderboard' ? '#9c27b0' :
                                  award.type === 'achievement' ? '#4caf50' :
                                  award.type === 'performance' ? '#ff9800' :
                                  award.type === 'skill' ? '#2196f3' : '#666',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}>
                  {award.type}
                </span>
                <span style={{ fontSize: '12px', color: '#999' }}>
                  {award.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rewards Information */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ color: '#333', marginBottom: '20px' }}>💰 Reward System</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          <div style={{
            padding: '20px',
            backgroundColor: '#fff3e0',
            borderRadius: '8px',
            border: '2px solid #ffcc02'
          }}>
            <h4 style={{ color: '#f57c00', marginBottom: '10px' }}>🥇 Daily Rewards</h4>
            <ul style={{ color: '#666', fontSize: '14px', margin: 0, paddingLeft: '20px' }}>
              <li>1st Place: Gold Medal</li>
              <li>2nd Place: Silver Medal</li>
              <li>3rd Place: Bronze Medal</li>
              <li>Top 5: Achievement Badges</li>
            </ul>
          </div>
          <div style={{
            padding: '20px',
            backgroundColor: '#e8f5e8',
            borderRadius: '8px',
            border: '2px solid #4caf50'
          }}>
            <h4 style={{ color: '#2e7d32', marginBottom: '10px' }}>📊 Weekly Rewards</h4>
            <ul style={{ color: '#666', fontSize: '14px', margin: 0, paddingLeft: '20px' }}>
              <li>1st Place: Champion Trophy</li>
              <li>2nd Place: Runner-up Badge</li>
              <li>3rd Place: Bronze Trophy</li>
              <li>Top 8: Special Badges</li>
            </ul>
          </div>
          <div style={{
            padding: '20px',
            backgroundColor: '#f3e5f5',
            borderRadius: '8px',
            border: '2px solid #9c27b0'
          }}>
            <h4 style={{ color: '#7b1fa2', marginBottom: '10px' }}>🏆 Monthly Rewards</h4>
            <ul style={{ color: '#666', fontSize: '14px', margin: 0, paddingLeft: '20px' }}>
              <li>1st Place: Champion Crown</li>
              <li>2nd Place: Silver Crown</li>
              <li>3rd Place: Bronze Crown</li>
              <li>Top 8: Elite Status</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Chatbot Component
export function EnhancedChatbot() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [messages, setMessages] = React.useState([
    {
      id: 1,
      text: "Hello! I'm your LMS Assistant 🤖 I can help you with course recommendations, learning paths, platform features, and answer any questions about our Learning Management System. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = React.useState('');

  const courseDatabase = [
    { id: 1, title: 'React Development Fundamentals', difficulty: 'Intermediate', duration: '40h', category: 'Frontend', skills: ['JavaScript', 'React', 'JSX', 'Components'], prerequisites: ['HTML', 'CSS', 'JavaScript Basics'] },
    { id: 2, title: 'Python Programming Mastery', difficulty: 'Beginner', duration: '60h', category: 'Backend', skills: ['Python', 'Data Structures', 'OOP'], prerequisites: [] },
    { id: 3, title: 'Data Science with Python', difficulty: 'Advanced', duration: '80h', category: 'Data Science', skills: ['Python', 'Pandas', 'NumPy', 'Machine Learning'], prerequisites: ['Python Programming'] },
    { id: 4, title: 'UI/UX Design Principles', difficulty: 'Intermediate', duration: '35h', category: 'Design', skills: ['Design Thinking', 'Prototyping', 'User Research'], prerequisites: [] },
    { id: 5, title: 'Machine Learning Fundamentals', difficulty: 'Advanced', duration: '70h', category: 'AI/ML', skills: ['ML Algorithms', 'TensorFlow', 'Deep Learning'], prerequisites: ['Python Programming', 'Statistics'] },
    { id: 6, title: 'Project Management Essentials', difficulty: 'Beginner', duration: '25h', category: 'Business', skills: ['Agile', 'Scrum', 'Leadership'], prerequisites: [] },
  ];

  const learningPaths = {
    'frontend': {
      name: 'Frontend Developer Path',
      courses: ['Python Programming Mastery', 'React Development Fundamentals', 'UI/UX Design Principles'],
      duration: '4-6 months',
      description: 'Become a complete frontend developer with modern technologies'
    },
    'backend': {
      name: 'Backend Developer Path',
      courses: ['Python Programming Mastery', 'Data Science with Python'],
      duration: '3-5 months',
      description: 'Master server-side development and data handling'
    },
    'fullstack': {
      name: 'Full-Stack Developer Path',
      courses: ['Python Programming Mastery', 'React Development Fundamentals', 'Data Science with Python'],
      duration: '6-8 months',
      description: 'Complete full-stack development mastery'
    },
    'datascience': {
      name: 'Data Science Path',
      courses: ['Python Programming Mastery', 'Data Science with Python', 'Machine Learning Fundamentals'],
      duration: '5-7 months',
      description: 'Become a data scientist with ML expertise'
    },
    'ai': {
      name: 'AI/ML Specialist Path',
      courses: ['Python Programming Mastery', 'Data Science with Python', 'Machine Learning Fundamentals'],
      duration: '6-9 months',
      description: 'Master artificial intelligence and machine learning'
    }
  };

  const getIntelligentResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // Course Catalog Questions
    if (message.includes('course') && (message.includes('catalog') || message.includes('available') || message.includes('list'))) {
      return `📚 **Course Catalog Overview:**

We have 6 comprehensive courses available:

**Frontend Development:**
• React Development Fundamentals (40h) - Intermediate
• UI/UX Design Principles (35h) - Intermediate

**Backend & Data:**
• Python Programming Mastery (60h) - Beginner
• Data Science with Python (80h) - Advanced
• Machine Learning Fundamentals (70h) - Advanced

**Business:**
• Project Management Essentials (25h) - Beginner

Each course includes video lectures, interactive quizzes, hands-on projects, and certificates upon completion. Would you like details about any specific course?`;
    }

    // Learning Path Recommendations
    if (message.includes('learning path') || message.includes('recommend') || message.includes('career') || message.includes('roadmap')) {
      return `🎯 **Learning Path Recommendations:**

Based on popular career tracks, here are our curated paths:

**🚀 Frontend Developer Path** (4-6 months)
→ Python Programming → React Development → UI/UX Design

**⚙️ Backend Developer Path** (3-5 months)
→ Python Programming → Data Science with Python

**🌟 Full-Stack Developer Path** (6-8 months)
→ Python Programming → React Development → Data Science

**📊 Data Science Path** (5-7 months)
→ Python Programming → Data Science → Machine Learning

**🤖 AI/ML Specialist Path** (6-9 months)
→ Python Programming → Data Science → Machine Learning

Which career path interests you most? I can provide a detailed roadmap!`;
    }

    // Platform Features
    if (message.includes('feature') || message.includes('platform') || message.includes('lms') || message.includes('system')) {
      return `🎓 **LMS Platform Features:**

**📚 Course Management:**
• Interactive video lectures with transcripts
• Progress tracking and bookmarking
• Downloadable resources and materials
• Mobile-responsive learning

**🧠 Skills & Analytics:**
• Interactive skill wheel visualization
• Proficiency tracking across technologies
• Personalized analytics dashboard
• Competency assessments

**👥 Social Learning:**
• Discussion forums for each course
• Study groups and peer collaboration
• Weekly challenges and competitions
• Achievement sharing

**🏆 Gamification:**
• Badge system for milestones
• Certificates upon completion
• Leaderboards and rankings
• Learning streaks and rewards

**🎯 AI-Powered Features:**
• Personalized course recommendations
• Adaptive learning paths
• Smart content suggestions
• Progress optimization

What specific feature would you like to explore?`;
    }

    // Specific Course Information
    if (message.includes('react')) {
      const course = courseDatabase.find(c => c.title.toLowerCase().includes('react'));
      return `⚛️ **React Development Fundamentals:**

**Duration:** ${course?.duration} (Intermediate level)
**Skills You'll Learn:** ${course?.skills.join(', ')}
**Prerequisites:** ${course?.prerequisites.join(', ')}

**Course Content:**
• Modern React with Hooks
• Component architecture and state management
• JSX and virtual DOM concepts
• React Router for navigation
• API integration and data fetching
• Testing React applications

This course is perfect for developers who know JavaScript basics and want to master modern React development. It's part of our Frontend Developer learning path!

Ready to enroll? 🚀`;
    }

    if (message.includes('python')) {
      const course = courseDatabase.find(c => c.title.toLowerCase().includes('python'));
      return `🐍 **Python Programming Mastery:**

**Duration:** ${course?.duration} (Beginner-friendly)
**Skills You'll Learn:** ${course?.skills.join(', ')}
**Prerequisites:** None - perfect for beginners!

**Course Content:**
• Python syntax and fundamentals
• Data structures (lists, dictionaries, sets)
• Object-oriented programming
• File handling and modules
• Error handling and debugging
• Real-world projects and applications

This is our most popular course and the foundation for Data Science, AI/ML, and Backend development paths. Over 1,000 students have completed it successfully!

Want to start your Python journey? 🚀`;
    }

    // Progress and Navigation Help
    if (message.includes('progress') || message.includes('track')) {
      return `📊 **Progress Tracking:**

Your learning progress is tracked across multiple dimensions:

**Course Progress:**
• Video completion percentage
• Quiz scores and attempts
• Assignment submissions
• Time spent learning

**Skill Development:**
• Proficiency levels (Novice → Expert)
• Skill wheel visualization
• Competency assessments
• Industry benchmarking

**Achievements:**
• Badges for milestones
• Certificates for completions
• Learning streaks
• Social recognition

Visit your **Skills Profile** to see detailed analytics, or check **My Courses** for individual course progress. Need help navigating to any section?`;
    }

    // Navigation Help
    if (message.includes('navigate') || message.includes('find') || message.includes('where')) {
      return `🧭 **Platform Navigation:**

**Main Sections:**
• **Dashboard** - Overview and quick stats
• **Course Catalog** - Browse all available courses
• **My Courses** - Your enrolled courses and progress
• **Skills Profile** - Skill tracking and analytics
• **Personalized Learning** - AI-recommended paths
• **Social Learning** - Forums and study groups
• **Achievements** - Badges and certificates

**Quick Tips:**
• Use the top navigation bar to switch sections
• Click feature cards on Dashboard for quick access
• Your progress is saved automatically
• Use search in Course Catalog to find specific topics

Which section would you like to explore? I can guide you there!`;
    }

    // Beginner Help
    if (message.includes('beginner') || message.includes('start') || message.includes('new')) {
      return `🌟 **Perfect for Beginners!**

**Recommended Starting Path:**
1. **Python Programming Mastery** (60h) - No prerequisites
2. **Project Management Essentials** (25h) - Learn organization skills
3. Choose your specialization:
   • **React Development** for Frontend
   • **Data Science** for Analytics
   • **UI/UX Design** for Design

**Beginner-Friendly Features:**
• Step-by-step video tutorials
• Interactive coding exercises
• 24/7 community support
• Progress tracking and motivation
• Certificate upon completion

**Success Tips:**
• Set aside 1-2 hours daily for consistent learning
• Join study groups for peer support
• Complete all quizzes and assignments
• Don't hesitate to ask questions in forums

Ready to start your learning journey? I recommend beginning with Python Programming Mastery! 🚀`;
    }

    // Default helpful response
    return `I'm here to help you navigate our LMS platform! I can assist with:

🎯 **Course Recommendations** - "What courses do you recommend for frontend development?"
📚 **Course Catalog** - "Tell me about available courses"
🛤️ **Learning Paths** - "What learning path should I follow for data science?"
🎓 **Platform Features** - "What features does this LMS have?"
📊 **Progress Tracking** - "How do I track my learning progress?"
🧭 **Navigation Help** - "How do I find my enrolled courses?"

Try asking me something like:
• "Recommend a learning path for AI"
• "Tell me about the React course"
• "What features does this platform have?"
• "I'm a beginner, where should I start?"

What would you like to know? 😊`;
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Generate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getIntelligentResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#1976d2',
          color: 'white',
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '28px',
          boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
          zIndex: 1000,
          transition: 'all 0.3s ease',
          animation: isOpen ? 'none' : 'pulse 2s infinite'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        🤖
      </div>

      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          right: '20px',
          backgroundColor: 'white',
          width: '450px',
          height: '600px',
          borderRadius: '16px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: '#1976d2',
            color: 'white',
            padding: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px' }}>🤖 LMS Assistant</h3>
              <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>AI-Powered Learning Guide</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: 'white',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            backgroundColor: '#f8f9fa'
          }}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  marginBottom: '15px',
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '12px 16px',
                    borderRadius: '18px',
                    backgroundColor: message.sender === 'user' ? '#1976d2' : 'white',
                    color: message.sender === 'user' ? 'white' : '#333',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.4'
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{
            padding: '20px',
            borderTop: '1px solid #eee',
            backgroundColor: 'white'
          }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about courses, learning paths, features..."
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: '1px solid #ddd',
                  borderRadius: '25px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleSendMessage}
                style={{
                  backgroundColor: '#1976d2',
                  color: 'white',
                  border: 'none',
                  width: '45px',
                  height: '45px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '18px'
                }}
              >
                📤
              </button>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes pulse {
            0% { box-shadow: 0 6px 20px rgba(25, 118, 210, 0.4); }
            50% { box-shadow: 0 6px 20px rgba(25, 118, 210, 0.8); }
            100% { box-shadow: 0 6px 20px rgba(25, 118, 210, 0.4); }
          }
        `}
      </style>
    </>
  );
}

// Course Recommendations Page
export function CourseRecommendationsPage({ onNavigate }: any) {
  const [activeTab, setActiveTab] = React.useState('ai-powered');
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = React.useState('all');

  // Mock user learning data based on consumption patterns
  const userLearningData = {
    totalHoursSpent: 127,
    coursesCompleted: 3,
    coursesInProgress: 2,
    averageSessionTime: 45, // minutes
    preferredLearningTime: 'evening',
    completionRate: 85,
    strongestSkills: ['JavaScript', 'React', 'HTML/CSS'],
    improvementAreas: ['Backend Development', 'Database Design', 'DevOps'],
    learningVelocity: 'fast', // fast, medium, slow
    engagementScore: 92,
    lastActiveDate: new Date(),
    streakDays: 15
  };

  // AI-Powered Recommendations based on consumption patterns
  const aiRecommendations = [
    {
      id: 1,
      title: 'Node.js Backend Development',
      instructor: 'INSTRUCTOR1',
      difficulty: 'intermediate',
      category: 'Backend Development',
      duration: 35,
      rating: 4.8,
      enrolledCount: 2847,
      thumbnail: '🟢',
      confidence: 95,
      reason: 'Perfect next step based on your React expertise and 45min average session time',
      matchFactors: [
        'Complements your JavaScript skills (100% match)',
        'Aligns with your 45min learning sessions',
        'Popular among React developers (87% take this next)',
        'Matches your fast learning velocity'
      ],
      estimatedCompletionTime: '4-5 weeks',
      prerequisites: ['JavaScript Fundamentals', 'React Basics'],
      learningOutcomes: ['Build REST APIs', 'Database Integration', 'Authentication Systems'],
      consumptionPattern: 'High engagement expected based on your JavaScript performance'
    },
    {
      id: 2,
      title: 'Advanced React Patterns & Performance',
      instructor: 'INSTRUCTOR2',
      difficulty: 'advanced',
      category: 'Frontend Development',
      duration: 28,
      rating: 4.9,
      enrolledCount: 1923,
      thumbnail: '⚛️',
      confidence: 92,
      reason: 'Natural progression from your React fundamentals with 85% completion rate',
      matchFactors: [
        'Direct continuation of your React journey',
        'Matches your evening learning preference',
        'Suitable for your fast learning pace',
        'High engagement predicted (92% match)'
      ],
      estimatedCompletionTime: '3-4 weeks',
      prerequisites: ['React Fundamentals', 'JavaScript ES6+'],
      learningOutcomes: ['Performance Optimization', 'Advanced Hooks', 'State Management'],
      consumptionPattern: 'Expected 90%+ completion based on React track record'
    },
    {
      id: 3,
      title: 'Database Design & SQL Mastery',
      instructor: 'INSTRUCTOR3',
      difficulty: 'intermediate',
      category: 'Database',
      duration: 32,
      rating: 4.7,
      enrolledCount: 3156,
      thumbnail: '🗄️',
      confidence: 88,
      reason: 'Identified as improvement area, essential for full-stack development',
      matchFactors: [
        'Addresses your backend knowledge gap',
        'Complements your frontend skills',
        'Fits your 45min session preference',
        'High demand skill in your learning path'
      ],
      estimatedCompletionTime: '4-5 weeks',
      prerequisites: ['Basic Programming Concepts'],
      learningOutcomes: ['Database Design', 'Complex Queries', 'Performance Tuning'],
      consumptionPattern: 'Moderate engagement expected - new domain for you'
    }
  ];

  // Trending Recommendations based on platform data
  const trendingRecommendations = [
    {
      id: 4,
      title: 'AI & Machine Learning Fundamentals',
      instructor: 'INSTRUCTOR4',
      difficulty: 'beginner',
      category: 'Artificial Intelligence',
      duration: 40,
      rating: 4.8,
      enrolledCount: 5234,
      thumbnail: '🤖',
      trendScore: 98,
      weeklyGrowth: '+45%',
      reason: 'Hottest skill in 2024, 67% of learners adding this to their path'
    },
    {
      id: 5,
      title: 'Cloud Computing with AWS',
      instructor: 'INSTRUCTOR5',
      difficulty: 'intermediate',
      category: 'Cloud Computing',
      duration: 38,
      rating: 4.6,
      enrolledCount: 4187,
      thumbnail: '☁️',
      trendScore: 94,
      weeklyGrowth: '+38%',
      reason: 'High demand skill, 89% job posting requirement'
    },
    {
      id: 6,
      title: 'Cybersecurity Essentials',
      instructor: 'INSTRUCTOR6',
      difficulty: 'beginner',
      category: 'Security',
      duration: 25,
      rating: 4.7,
      enrolledCount: 3892,
      thumbnail: '🔒',
      trendScore: 91,
      weeklyGrowth: '+42%',
      reason: 'Critical skill across all industries, growing 42% weekly'
    }
  ];

  // Collaborative Filtering Recommendations
  const collaborativeRecommendations = [
    {
      id: 7,
      title: 'TypeScript for React Developers',
      instructor: 'INSTRUCTOR7',
      difficulty: 'intermediate',
      category: 'Frontend Development',
      duration: 22,
      rating: 4.8,
      enrolledCount: 2156,
      thumbnail: '📘',
      similarUsers: 156,
      reason: 'Learners with similar progress (React + JavaScript) chose this next',
      completionRate: 91
    },
    {
      id: 8,
      title: 'GraphQL API Development',
      instructor: 'INSTRUCTOR8',
      difficulty: 'intermediate',
      category: 'Backend Development',
      duration: 30,
      rating: 4.7,
      enrolledCount: 1834,
      thumbnail: '🔗',
      similarUsers: 134,
      reason: 'Popular among React developers transitioning to backend',
      completionRate: 87
    }
  ];

  // Content-based Recommendations
  const contentBasedRecommendations = [
    {
      id: 9,
      title: 'React Native Mobile Development',
      instructor: 'INSTRUCTOR9',
      difficulty: 'intermediate',
      category: 'Mobile Development',
      duration: 45,
      rating: 4.6,
      enrolledCount: 2743,
      thumbnail: '📱',
      contentMatch: 94,
      reason: 'Leverages your React skills for mobile development'
    },
    {
      id: 10,
      title: 'Next.js Full-Stack Framework',
      instructor: 'INSTRUCTOR10',
      difficulty: 'intermediate',
      category: 'Full-Stack Development',
      duration: 35,
      rating: 4.9,
      enrolledCount: 3421,
      thumbnail: '⚡',
      contentMatch: 96,
      reason: 'Perfect match for your React + JavaScript expertise'
    }
  ];

  const renderRecommendationCard = (course: any, type: string) => (
    <div key={course.id} style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '25px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      border: '1px solid #eee',
      position: 'relative'
    }}>
      {/* Confidence/Score Badge */}
      {type === 'ai' && (
        <div style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          backgroundColor: course.confidence >= 90 ? '#4caf50' : course.confidence >= 80 ? '#ff9800' : '#2196f3',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          {course.confidence}% Match
        </div>
      )}

      {type === 'trending' && (
        <div style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          backgroundColor: '#e91e63',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          🔥 {course.weeklyGrowth}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
        <div style={{
          fontSize: '3rem',
          backgroundColor: '#f5f5f5',
          padding: '15px',
          borderRadius: '12px',
          minWidth: '80px',
          textAlign: 'center'
        }}>
          {course.thumbnail}
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '18px' }}>
            {course.title}
          </h3>
          <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>
            by {course.instructor}
          </p>

          <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', flexWrap: 'wrap' }}>
            <span style={{
              backgroundColor: course.difficulty === 'beginner' ? '#e8f5e8' :
                             course.difficulty === 'intermediate' ? '#fff3e0' : '#ffebee',
              color: course.difficulty === 'beginner' ? '#2e7d32' :
                     course.difficulty === 'intermediate' ? '#f57c00' : '#c62828',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              {course.difficulty.toUpperCase()}
            </span>
            <span style={{ color: '#666', fontSize: '14px' }}>
              ⏱️ {course.duration}h
            </span>
            <span style={{ color: '#666', fontSize: '14px' }}>
              ⭐ {course.rating}
            </span>
            <span style={{ color: '#666', fontSize: '14px' }}>
              👥 {course.enrolledCount.toLocaleString()}
            </span>
          </div>

          <p style={{
            color: '#333',
            fontSize: '14px',
            lineHeight: '1.4',
            marginBottom: '15px',
            fontStyle: 'italic'
          }}>
            💡 {course.reason}
          </p>

          {/* AI-specific details */}
          {type === 'ai' && course.matchFactors && (
            <div style={{ marginBottom: '15px' }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#666', marginBottom: '8px' }}>
                Why this matches you:
              </div>
              {course.matchFactors.slice(0, 2).map((factor: string, index: number) => (
                <div key={index} style={{
                  fontSize: '12px',
                  color: '#555',
                  marginBottom: '4px',
                  paddingLeft: '12px',
                  position: 'relative'
                }}>
                  <span style={{ position: 'absolute', left: '0', color: '#4caf50' }}>✓</span>
                  {factor}
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
            <button style={{
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              View Details
            </button>
            <button style={{
              backgroundColor: 'transparent',
              color: '#1976d2',
              border: '1px solid #1976d2',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', marginBottom: '30px' }}>🎯 Course Recommendations</h1>

      {/* Learning Analytics Summary */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        marginBottom: '30px'
      }}>
        <h3 style={{ color: '#333', marginBottom: '20px' }}>📊 Your Learning Profile</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '20px',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '2.5rem', color: '#1976d2', fontWeight: 'bold' }}>{userLearningData.totalHoursSpent}h</div>
            <div style={{ color: '#666', fontWeight: 'bold' }}>Total Learning Time</div>
            <div style={{ fontSize: '12px', color: '#999' }}>Across all courses</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', color: '#4caf50', fontWeight: 'bold' }}>{userLearningData.completionRate}%</div>
            <div style={{ color: '#666', fontWeight: 'bold' }}>Completion Rate</div>
            <div style={{ fontSize: '12px', color: '#999' }}>Above average (75%)</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', color: '#ff9800', fontWeight: 'bold' }}>{userLearningData.averageSessionTime}min</div>
            <div style={{ color: '#666', fontWeight: 'bold' }}>Avg Session Time</div>
            <div style={{ fontSize: '12px', color: '#999' }}>Optimal for retention</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', color: '#e91e63', fontWeight: 'bold' }}>{userLearningData.streakDays}</div>
            <div style={{ color: '#666', fontWeight: 'bold' }}>Day Streak</div>
            <div style={{ fontSize: '12px', color: '#999' }}>Keep it up! 🔥</div>
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', color: '#9c27b0', fontWeight: 'bold' }}>{userLearningData.engagementScore}</div>
            <div style={{ color: '#666', fontWeight: 'bold' }}>Engagement Score</div>
            <div style={{ fontSize: '12px', color: '#999' }}>Highly engaged learner</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        marginBottom: '30px',
        borderBottom: '2px solid #eee'
      }}>
        {[
          { id: 'ai-powered', label: '🤖 AI-Powered', count: aiRecommendations.length },
          { id: 'trending', label: '🔥 Trending', count: trendingRecommendations.length },
          { id: 'collaborative', label: '👥 Similar Learners', count: collaborativeRecommendations.length },
          { id: 'content-based', label: '🎯 Content Match', count: contentBasedRecommendations.length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 24px',
              border: 'none',
              backgroundColor: 'transparent',
              color: activeTab === tab.id ? '#1976d2' : '#666',
              borderBottom: activeTab === tab.id ? '2px solid #1976d2' : '2px solid transparent',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: activeTab === tab.id ? 'bold' : 'normal',
              marginBottom: '-2px'
            }}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* AI-Powered Recommendations */}
      {activeTab === 'ai-powered' && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ color: '#666', fontSize: '16px' }}>
              Personalized recommendations based on your learning patterns, consumption habits, and skill progression
            </p>
          </div>
          <div style={{ display: 'grid', gap: '20px' }}>
            {aiRecommendations.map(course => renderRecommendationCard(course, 'ai'))}
          </div>
        </div>
      )}

      {/* Trending Recommendations */}
      {activeTab === 'trending' && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ color: '#666', fontSize: '16px' }}>
              Most popular courses right now, based on enrollment trends and industry demand
            </p>
          </div>
          <div style={{ display: 'grid', gap: '20px' }}>
            {trendingRecommendations.map(course => renderRecommendationCard(course, 'trending'))}
          </div>
        </div>
      )}

      {/* Collaborative Filtering */}
      {activeTab === 'collaborative' && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ color: '#666', fontSize: '16px' }}>
              Courses chosen by learners with similar progress and interests as you
            </p>
          </div>
          <div style={{ display: 'grid', gap: '20px' }}>
            {collaborativeRecommendations.map(course => renderRecommendationCard(course, 'collaborative'))}
          </div>
        </div>
      )}

      {/* Content-Based Recommendations */}
      {activeTab === 'content-based' && (
        <div>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ color: '#666', fontSize: '16px' }}>
              Courses that build upon your existing skills and knowledge areas
            </p>
          </div>
          <div style={{ display: 'grid', gap: '20px' }}>
            {contentBasedRecommendations.map(course => renderRecommendationCard(course, 'content'))}
          </div>
        </div>
      )}
    </div>
  );
}
