import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { coursesAPI } from '../../services/api';

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  duration: number; // in hours
  thumbnail: string;
  modules: Module[];
  prerequisites: string[];
  enrolled: boolean;
  progress?: number;
  isMandatory?: boolean;
  deadline?: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'document' | 'quiz' | 'assignment';
  content: string;
  duration?: number;
  completed?: boolean;
  transcript?: string;
}

export interface Quiz {
  id: string;
  moduleId: string;
  questions: Question[];
  attempts: number;
  maxAttempts: number;
  passed: boolean;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface CoursesState {
  courses: Course[];
  myCourses: Course[];
  mandatoryCourses: Course[];
  currentCourse: Course | null;
  currentModule: Module | null;
  currentQuiz: Quiz | null;
  loading: boolean;
  error: string | null;
  filters: {
    category: string;
    difficulty: string;
    search: string;
  };
}

const initialState: CoursesState = {
  courses: [],
  myCourses: [],
  mandatoryCourses: [],
  currentCourse: null,
  currentModule: null,
  currentQuiz: null,
  loading: false,
  error: null,
  filters: {
    category: '',
    difficulty: '',
    search: '',
  },
};

// Async thunks
export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const response = await coursesAPI.getCourses();
  return response;
});

export const fetchMyCourses = createAsyncThunk('courses/fetchMyCourses', async () => {
  const response = await coursesAPI.getMyCourses();
  return response;
});

export const fetchMandatoryCourses = createAsyncThunk('courses/fetchMandatoryCourses', async () => {
  const response = await coursesAPI.getMandatoryCourses();
  return response;
});

export const enrollInCourse = createAsyncThunk(
  'courses/enrollInCourse',
  async (courseId: string) => {
    const response = await coursesAPI.enrollInCourse(courseId);
    return response;
  }
);

export const fetchCourseDetail = createAsyncThunk(
  'courses/fetchCourseDetail',
  async (courseId: string) => {
    const response = await coursesAPI.getCourseDetail(courseId);
    return response;
  }
);

export const updateProgress = createAsyncThunk(
  'courses/updateProgress',
  async ({ courseId, moduleId, progress }: { courseId: string; moduleId: string; progress: number }) => {
    const response = await coursesAPI.updateProgress(courseId, moduleId, progress);
    return response;
  }
);

export const submitQuiz = createAsyncThunk(
  'courses/submitQuiz',
  async ({ quizId, answers }: { quizId: string; answers: number[] }) => {
    const response = await coursesAPI.submitQuiz(quizId, answers);
    return response;
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<typeof initialState.filters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
      state.currentModule = null;
      state.currentQuiz = null;
    },
    setCurrentModule: (state, action: PayloadAction<Module>) => {
      state.currentModule = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch courses';
      })
      // Fetch my courses
      .addCase(fetchMyCourses.fulfilled, (state, action) => {
        state.myCourses = action.payload;
      })
      // Fetch mandatory courses
      .addCase(fetchMandatoryCourses.fulfilled, (state, action) => {
        state.mandatoryCourses = action.payload;
      })
      // Enroll in course
      .addCase(enrollInCourse.fulfilled, (state, action) => {
        const courseIndex = state.courses.findIndex(c => c.id === action.payload.id);
        if (courseIndex !== -1) {
          state.courses[courseIndex].enrolled = true;
        }
        state.myCourses.push(action.payload);
      })
      // Fetch course detail
      .addCase(fetchCourseDetail.fulfilled, (state, action) => {
        state.currentCourse = action.payload;
      })
      // Update progress
      .addCase(updateProgress.fulfilled, (state, action) => {
        if (state.currentCourse) {
          const moduleIndex = state.currentCourse.modules.findIndex(m => m.id === action.payload.moduleId);
          if (moduleIndex !== -1) {
            state.currentCourse.modules[moduleIndex].completed = action.payload.completed;
          }
          state.currentCourse.progress = action.payload.courseProgress;
        }
      })
      // Submit quiz
      .addCase(submitQuiz.fulfilled, (state, action) => {
        state.currentQuiz = action.payload;
      });
  },
});

export const { setFilters, clearCurrentCourse, setCurrentModule } = coursesSlice.actions;
export default coursesSlice.reducer;
