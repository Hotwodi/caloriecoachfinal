import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { incrementSteps } from '../store';
import { calculateCaloriesFromSteps } from '../utils/fitness';

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const { steps, caloriesBurned, caloriesConsumed, weight, fitnessGoals } = useSelector((state: RootState) => state.fitness);
  const [subscription, setSubscription] = useState(null);
  
  // Get the user's daily calorie goal from Redux
  const dailyCalorieGoal = fitnessGoals?.dailyCalories || 2000;
  const dailyStepsGoal = fitnessGoals?.dailySteps || 10000;

  // Calculate progress percentages
  const stepsPercentage = Math.min(100, Math.round((steps / dailyStepsGoal) * 100));

  const startStepTracking = () => {
    // Use accelerometer as a simple step counter simulation
    Accelerometer.setUpdateInterval(1000);
    const subscription = Accelerometer.addListener(accelerometerData => {
      const { x, y, z } = accelerometerData;
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      
      // Simplified step detection - in a real app this would be more sophisticated
      if (magnitude > 1.2) {
        // Dispatch an action to increment steps in Redux
        dispatch(incrementSteps(1));
      }
    });
    
    setSubscription(subscription);
  };
  
  const stopStepTracking = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };
  
  useEffect(() => {
    startStepTracking();
    
    return () => {
      stopStepTracking();
    };
  }, []);
  
  const chartData = {
    labels: ['Burned', 'Consumed'],
    datasets: [
      {
        data: [caloriesBurned, caloriesConsumed],
      },
    ],
  };
  
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
  };

  const caloriesRemaining = dailyCalorieGoal - caloriesConsumed + caloriesBurned;
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Health Dashboard</Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Steps</Text>
          <Text style={styles.statValue}>{steps}</Text>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${stepsPercentage}%` }]} />
            <Text style={styles.progressText}>{stepsPercentage}% of daily goal</Text>
          </View>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Calories Burned</Text>
          <Text style={styles.statValue}>{caloriesBurned}</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Calories: Burned vs Consumed</Text>
        <BarChart
          data={chartData}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          style={styles.chart}
        />
      </View>
      
      <View style={styles.calorieInfo}>
        <Text style={styles.calorieTitle}>
          Daily Calorie Budget: {dailyCalorieGoal} calories
        </Text>
        <Text style={styles.calorieSubtext}>
          Remaining: {caloriesRemaining} calories
        </Text>
      </View>
      
      <View style={styles.goalInfo}>
        <Text style={styles.goalTitle}>Your Fitness Goals</Text>
        <View style={styles.goalRow}>
          <Text style={styles.goalText}>Daily Steps: {dailyStepsGoal}</Text>
          <Text style={styles.goalProgress}>{stepsPercentage}%</Text>
        </View>
        <View style={[styles.goalProgressBar, { width: `${stepsPercentage}%` }]} />
        
        <View style={styles.goalRow}>
          <Text style={styles.goalText}>Target Weight: {fitnessGoals?.targetWeight} kg</Text>
          {fitnessGoals?.targetWeight < weight ? (
            <Text style={styles.goalDelta}>-{(weight - fitnessGoals.targetWeight).toFixed(1)} kg to go</Text>
          ) : fitnessGoals?.targetWeight > weight ? (
            <Text style={styles.goalDelta}>+{(fitnessGoals.targetWeight - weight).toFixed(1)} kg to go</Text>
          ) : (
            <Text style={styles.goalAchieved}>Achieved!</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, 
    shadowRadius: 3,
    elevation: 3,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  calorieInfo: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  calorieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  calorieSubtext: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  progressContainer: {
    marginTop: 8,
    width: '100%',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  goalInfo: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    margin: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 30,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  goalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  goalText: {
    fontSize: 14,
    color: '#666',
  },
  goalProgress: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  goalProgressBar: {
    height: 6,
    backgroundColor: '#4CAF50',
    borderRadius: 3,
    marginBottom: 15,
  },
  goalDelta: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  goalAchieved: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

export default DashboardScreen;