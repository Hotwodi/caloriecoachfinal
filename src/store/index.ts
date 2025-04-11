import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for our state
interface FitnessState {
  steps: number;
  caloriesBurned: number;
  caloriesConsumed: number;
  weight: number;
  strideLength: number;
  fitnessGoals: {
    dailySteps: number;
    dailyCalories: number;
    targetWeight: number;
  };
  meals: Array<{
    id: string;
    name: string;
    calories: number;
    timestamp: number;
  }>;
}

// Initial state
const initialState: FitnessState = {
  steps: 0,
  caloriesBurned: 0,
  caloriesConsumed: 0,
  weight: 70, // Default weight in kg
  strideLength: 0.762, // Default stride length in meters
  fitnessGoals: {
    dailySteps: 10000,
    dailyCalories: 2000,
    targetWeight: 70
  },
  meals: []
};

// Create slice for fitness data
const fitnessSlice = createSlice({
  name: 'fitness',
  initialState,
  reducers: {
    incrementSteps: (state, action: PayloadAction<number>) => {
      state.steps += action.payload;
      // Calculate calories burned based on steps
      const additionalCalories = action.payload * state.strideLength * state.weight * 0.0005;
      state.caloriesBurned += Math.round(additionalCalories);
    },
    resetSteps: (state) => {
      state.steps = 0;
      state.caloriesBurned = 0;
    },
    addMeal: (state, action: PayloadAction<{ name: string, calories: number }>) => {
      const { name, calories } = action.payload;
      state.meals.push({
        id: Date.now().toString(),
        name,
        calories,
        timestamp: Date.now()
      });
      state.caloriesConsumed += calories;
    },
    updateWeight: (state, action: PayloadAction<number>) => {
      state.weight = action.payload;
    },
    updateStrideLength: (state, action: PayloadAction<number>) => {
      state.strideLength = action.payload;
    },
    updateFitnessGoals: (state, action: PayloadAction<{
      dailySteps: number;
      dailyCalories: number;
      targetWeight: number;
    }>) => {
      state.fitnessGoals = {
        ...state.fitnessGoals,
        ...action.payload
      };
    }
  }
});

// Export actions
export const { 
  incrementSteps, 
  resetSteps, 
  addMeal, 
  updateWeight,
  updateStrideLength,
  updateFitnessGoals
} = fitnessSlice.actions;

// Create and export store
export const store = configureStore({
  reducer: {
    fitness: fitnessSlice.reducer
  }
});

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;