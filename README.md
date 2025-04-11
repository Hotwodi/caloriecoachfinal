# Fitness App

A comprehensive React Native fitness application with step tracking, meal analysis, and nutritional guidance.

## Features

- **Step Tracking**: Real-time step counting using device accelerometer
- **Calorie Calculation**: Automatic calculation of calories burned based on steps
- **Meal Analysis**: Camera integration to analyze meals and retrieve nutritional data
- **Progress Tracking**: Track fitness progress with interactive charts
- **Nutritional Guidance**: Get personalized meal suggestions based on your goals

## Tech Stack

- **React Native**: Cross-platform mobile framework
- **TypeScript**: Type-safe JavaScript
- **Expo**: Development platform for React Native
- **Redux Toolkit**: State management
- **React Navigation**: Bottom tab navigation with home button in the middle
- **Victory Native & React Native Chart Kit**: Data visualization
- **Expo Camera & Media Library**: Camera integration for meal photos

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- Android Studio or Xcode (for emulators)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

### Running the App

- Use `npm run android` to run on Android
- Use `npm run ios` to run on iOS (requires macOS)
- Use `npm run web` to run in web browser

## App Structure

- **Dashboard**: Track steps and calories, view daily calorie budget
- **Progress**: View historical fitness data with interactive charts
- **Home**: Quick access to main dashboard
- **Meal Analysis**: Take photos of meals to get nutritional information
- **Suggestions**: Get personalized meal suggestions and nutrition tips

## Core Functionality

### Step Tracking

```typescript
// Using accelerometer for step detection
Accelerometer.setUpdateInterval(1000);
Accelerometer.addListener(data => {
  const { x, y, z } = data;
  const magnitude = Math.sqrt(x * x + y * y + z * z);
  
  if (magnitude > 1.2) {
    // Increment steps
    dispatch(incrementSteps(1));
  }
});
```

### Meal Analysis

Using camera integration to capture meal photos and analyze nutritional content:

```typescript
const takePicture = async () => {
  const photo = await cameraRef.current.takePictureAsync();
  // Analyze meal (integrate with nutrition API in production)
};
```

### Redux Store

Centralized state management for tracking fitness data:

```typescript
// Store structure
interface FitnessState {
  steps: number;
  caloriesBurned: number;
  caloriesConsumed: number;
  weight: number;
  meals: Array<{
    id: string;
    name: string;
    calories: number;
    timestamp: number;
  }>;
}
```

## Planned Enhancements

1. User authentication and profile management
2. Cloud synchronization for progress data
3. Social sharing features
4. Integration with fitness wearables
5. Customizable workout plans

## License

MIT