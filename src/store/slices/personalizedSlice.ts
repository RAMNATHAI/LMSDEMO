import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { personalizedAPI } from '../../services/api';

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: number; // in weeks
  courses: string[]; // course IDs
  skills: string[]; // skill IDs
  progress: number; // 0-100
  enrolled: boolean;
  recommended: boolean;
}

export interface Recommendation {
  id: string;
  type: 'course' | 'path' | 'skill';
  itemId: string;
  title: string;
  reason: string;
  confidence: number; // 0-1
  category: string;
}

interface PersonalizedState {
  learningPaths: LearningPath[];
  recommendations: Recommendation[];
  currentPath: LearningPath | null;
  loading: boolean;
  error: string | null;
  preferences: {
    preferredDifficulty: string;
    preferredCategories: string[];
    learningGoals: string[];
    timeAvailability: number; // hours per week
  };
}

const initialState: PersonalizedState = {
  learningPaths: [],
  recommendations: [],
  currentPath: null,
  loading: false,
  error: null,
  preferences: {
    preferredDifficulty: '',
    preferredCategories: [],
    learningGoals: [],
    timeAvailability: 0,
  },
};

// Async thunks
export const fetchLearningPaths = createAsyncThunk(
  'personalized/fetchLearningPaths',
  async () => {
    const response = await personalizedAPI.getLearningPaths();
    return response;
  }
);

export const fetchRecommendations = createAsyncThunk(
  'personalized/fetchRecommendations',
  async () => {
    const response = await personalizedAPI.getRecommendations();
    return response;
  }
);

export const enrollInPath = createAsyncThunk(
  'personalized/enrollInPath',
  async (pathId: string) => {
    const response = await personalizedAPI.enrollInPath(pathId);
    return response;
  }
);

export const updatePreferences = createAsyncThunk(
  'personalized/updatePreferences',
  async (preferences: Partial<PersonalizedState['preferences']>) => {
    const response = await personalizedAPI.updatePreferences(preferences);
    return response;
  }
);

export const generatePersonalizedPath = createAsyncThunk(
  'personalized/generatePersonalizedPath',
  async (goals: string[]) => {
    const response = await personalizedAPI.generatePersonalizedPath(goals);
    return response;
  }
);

const personalizedSlice = createSlice({
  name: 'personalized',
  initialState,
  reducers: {
    setCurrentPath: (state, action: PayloadAction<LearningPath>) => {
      state.currentPath = action.payload;
    },
    clearCurrentPath: (state) => {
      state.currentPath = null;
    },
    updatePathProgress: (state, action: PayloadAction<{ pathId: string; progress: number }>) => {
      const pathIndex = state.learningPaths.findIndex(p => p.id === action.payload.pathId);
      if (pathIndex !== -1) {
        state.learningPaths[pathIndex].progress = action.payload.progress;
      }
      if (state.currentPath && state.currentPath.id === action.payload.pathId) {
        state.currentPath.progress = action.payload.progress;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch learning paths
      .addCase(fetchLearningPaths.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLearningPaths.fulfilled, (state, action) => {
        state.loading = false;
        state.learningPaths = action.payload;
      })
      .addCase(fetchLearningPaths.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch learning paths';
      })
      // Fetch recommendations
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.recommendations = action.payload;
      })
      // Enroll in path
      .addCase(enrollInPath.fulfilled, (state, action) => {
        const pathIndex = state.learningPaths.findIndex(p => p.id === action.payload.id);
        if (pathIndex !== -1) {
          state.learningPaths[pathIndex].enrolled = true;
        }
      })
      // Update preferences
      .addCase(updatePreferences.fulfilled, (state, action) => {
        state.preferences = { ...state.preferences, ...action.payload };
      })
      // Generate personalized path
      .addCase(generatePersonalizedPath.fulfilled, (state, action) => {
        state.learningPaths.unshift(action.payload);
      });
  },
});

export const { setCurrentPath, clearCurrentPath, updatePathProgress } = personalizedSlice.actions;
export default personalizedSlice.reducer;
