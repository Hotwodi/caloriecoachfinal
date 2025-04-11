/**
 * Utility functions for fitness calculations
 */

/**
 * Calculates calories burned from steps
 * Formula: steps * stride length (m) * weight (kg) * 0.0005
 */
export const calculateCaloriesFromSteps = (
  steps: number, 
  weight: number = 70, 
  strideLength: number = 0.762
): number => {
  return Math.round(steps * strideLength * weight * 0.0005);
};

/**
 * Calculates BMR (Basal Metabolic Rate) using Harris-Benedict equation
 */
export const calculateBMR = (
  weight: number, 
  height: number, 
  age: number, 
  isMale: boolean
): number => {
  if (isMale) {
    // Male BMR = 66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age)
    return Math.round(66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age));
  } else {
    // Female BMR = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age)
    return Math.round(655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age));
  }
};

/**
 * Calculate daily calorie needs based on activity level
 */
export const calculateDailyCalories = (bmr: number, activityLevel: string): number => {
  const activityMultipliers = {
    sedentary: 1.2, // Little or no exercise
    light: 1.375, // Light exercise 1-3 days/week
    moderate: 1.55, // Moderate exercise 3-5 days/week
    active: 1.725, // Hard exercise 6-7 days/week
    veryActive: 1.9 // Very hard exercise & physical job
  };
  
  const multiplier = activityMultipliers[activityLevel] || activityMultipliers.moderate;
  return Math.round(bmr * multiplier);
};

/**
 * Calculate calorie deficit or surplus
 */
export const calculateCalorieBalance = (caloriesIn: number, caloriesOut: number): number => {
  return caloriesIn - caloriesOut;
};

/**
 * Calculate weight change prediction based on calorie balance
 * 1kg of body fat = approximately 7700 calories
 */
export const predictWeightChange = (dailyCalorieBalance: number, days: number = 7): number => {
  const totalCalorieBalance = dailyCalorieBalance * days;
  // Convert calorie balance to kg (7700 calories = 1kg)
  return totalCalorieBalance / 7700;
};

/**
 * Calculate macronutrient distribution from calories
 * Returns grams of protein, carbs and fat
 */
export const calculateMacros = (
  calories: number,
  proteinPercentage: number = 30,
  carbsPercentage: number = 40,
  fatPercentage: number = 30
) => {
  // Convert percentages to decimal
  const proteinRatio = proteinPercentage / 100;
  const carbsRatio = carbsPercentage / 100;
  const fatRatio = fatPercentage / 100;
  
  // Calculate calories for each macro
  const proteinCalories = calories * proteinRatio;
  const carbCalories = calories * carbsRatio;
  const fatCalories = calories * fatRatio;
  
  // Convert to grams (protein=4cal/g, carbs=4cal/g, fat=9cal/g)
  return {
    protein: Math.round(proteinCalories / 4),
    carbs: Math.round(carbCalories / 4),
    fat: Math.round(fatCalories / 9)
  };
};