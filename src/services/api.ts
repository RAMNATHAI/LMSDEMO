const API_BASE_URL = 'http://localhost:4000/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }
  return response.json();
};

// Auth API
export const authAPI = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  register: async (userData: { email: string; password: string; name: string }) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  getCurrentUser: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// Courses API
export const coursesAPI = {
  getCourses: async () => {
    const response = await fetch(`${API_BASE_URL}/courses`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getMyCourses: async () => {
    const response = await fetch(`${API_BASE_URL}/courses/my-courses`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getMandatoryCourses: async () => {
    const response = await fetch(`${API_BASE_URL}/courses/mandatory`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getCourseDetail: async (courseId: string) => {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  enrollInCourse: async (courseId: string) => {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}/enroll`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  updateProgress: async (courseId: string, moduleId: string, progress: number) => {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}/progress`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ moduleId, progress }),
    });
    return handleResponse(response);
  },

  submitQuiz: async (quizId: string, answers: number[]) => {
    const response = await fetch(`${API_BASE_URL}/quizzes/${quizId}/submit`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ answers }),
    });
    return handleResponse(response);
  },
};

// Notifications API
export const notificationsAPI = {
  getNotifications: async () => {
    const response = await fetch(`${API_BASE_URL}/notifications`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  markAsRead: async (notificationId: string) => {
    const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}/read`, {
      method: 'PUT',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  markAllAsRead: async () => {
    const response = await fetch(`${API_BASE_URL}/notifications/read-all`, {
      method: 'PUT',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  deleteNotification: async (notificationId: string) => {
    const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// Skills API
export const skillsAPI = {
  getSkills: async () => {
    const response = await fetch(`${API_BASE_URL}/skills`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  updateSkillProgress: async (skillId: string, points: number, courseId: string, moduleId: string) => {
    const response = await fetch(`${API_BASE_URL}/skills/${skillId}/progress`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ points, courseId, moduleId }),
    });
    return handleResponse(response);
  },

  getSkillAnalytics: async () => {
    const response = await fetch(`${API_BASE_URL}/skills/analytics`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// Personalized Learning API
export const personalizedAPI = {
  getLearningPaths: async () => {
    const response = await fetch(`${API_BASE_URL}/personalized/paths`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getRecommendations: async () => {
    const response = await fetch(`${API_BASE_URL}/personalized/recommendations`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  enrollInPath: async (pathId: string) => {
    const response = await fetch(`${API_BASE_URL}/personalized/paths/${pathId}/enroll`, {
      method: 'POST',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  updatePreferences: async (preferences: any) => {
    const response = await fetch(`${API_BASE_URL}/personalized/preferences`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(preferences),
    });
    return handleResponse(response);
  },

  generatePersonalizedPath: async (goals: string[]) => {
    const response = await fetch(`${API_BASE_URL}/personalized/generate-path`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ goals }),
    });
    return handleResponse(response);
  },
};

// Chatbot API
export const chatbotAPI = {
  sendMessage: async (message: string) => {
    const response = await fetch(`${API_BASE_URL}/chatbot/message`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ message }),
    });
    return handleResponse(response);
  },
};
