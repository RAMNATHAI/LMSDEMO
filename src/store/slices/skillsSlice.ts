import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { skillsAPI } from '../../services/api';

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'novice' | 'intermediate' | 'advanced' | 'expert';
  progress: number; // 0-100
  color: string;
}

export interface SkillAssessment {
  id: string;
  skillId: string;
  courseId: string;
  moduleId: string;
  points: number;
  timestamp: string;
}

interface SkillsState {
  skills: Skill[];
  assessments: SkillAssessment[];
  loading: boolean;
  error: string | null;
  analytics: {
    totalSkills: number;
    expertLevel: number;
    advancedLevel: number;
    intermediateLevel: number;
    noviceLevel: number;
  };
}

const initialState: SkillsState = {
  skills: [],
  assessments: [],
  loading: false,
  error: null,
  analytics: {
    totalSkills: 0,
    expertLevel: 0,
    advancedLevel: 0,
    intermediateLevel: 0,
    noviceLevel: 0,
  },
};

// Async thunks
export const fetchSkills = createAsyncThunk('skills/fetchSkills', async () => {
  const response = await skillsAPI.getSkills();
  return response;
});

export const updateSkillProgress = createAsyncThunk(
  'skills/updateSkillProgress',
  async ({ skillId, points, courseId, moduleId }: {
    skillId: string;
    points: number;
    courseId: string;
    moduleId: string;
  }) => {
    const response = await skillsAPI.updateSkillProgress(skillId, points, courseId, moduleId);
    return response;
  }
);

export const fetchSkillAnalytics = createAsyncThunk('skills/fetchSkillAnalytics', async () => {
  const response = await skillsAPI.getSkillAnalytics();
  return response;
});

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    clearSkills: (state) => {
      state.skills = [];
      state.assessments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch skills
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch skills';
      })
      // Update skill progress
      .addCase(updateSkillProgress.fulfilled, (state, action) => {
        const skillIndex = state.skills.findIndex(s => s.id === action.payload.skillId);
        if (skillIndex !== -1) {
          state.skills[skillIndex] = action.payload.skill;
        }
        state.assessments.push(action.payload.assessment);
      })
      // Fetch skill analytics
      .addCase(fetchSkillAnalytics.fulfilled, (state, action) => {
        state.analytics = action.payload;
      });
  },
});

export const { clearSkills } = skillsSlice.actions;
export default skillsSlice.reducer;
