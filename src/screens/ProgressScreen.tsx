import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const ProgressScreen = () => {
  // Mock data for weekly progress
  const weeklyStepsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [6500, 5200, 7800, 8900, 6700, 10200, 9100],
        color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ['Steps']
  };
  
  const weeklyCaloricData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [1800, 2100, 1950, 1750, 2300, 2500, 2100],
        color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
        strokeWidth: 2
      },
      {
        data: [1600, 1700, 1800, 1750, 1900, 2200, 1850],
        color: (opacity = 1) => `rgba(255, 193, 7, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ['Calories In', 'Calories Out']
  };

  const weightData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        data: [75.2, 74.5, 73.8, 73.2],
        color: (opacity = 1) => `rgba(156, 39, 176, ${opacity})`,
        strokeWidth: 2
      }
    ],
    legend: ['Weight (kg)']
  };
  
  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForDots: {
      r: '6',
      strokeWidth: '2',
    }
  };
  
  const screenWidth = Dimensions.get('window').width - 40;
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Progress Overview</Text>
      </View>
      
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Steps Tracking</Text>
        <LineChart
          data={weeklyStepsData}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Caloric Balance</Text>
        <LineChart
          data={weeklyCaloricData}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#2196F3' }]} />
            <Text style={styles.legendText}>Calories In</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#FFC107' }]} />
            <Text style={styles.legendText}>Calories Out</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Weight Progress</Text>
        <LineChart
          data={weightData}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>12,500</Text>
          <Text style={styles.statLabel}>Daily Step Record</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>2.5 kg</Text>
          <Text style={styles.statLabel}>Weight Lost</Text>
        </View>
      </View>
      
      <View style={styles.goalsCard}>
        <Text style={styles.goalsTitle}>Goals Progress</Text>
        <View style={styles.goalRow}>
          <Text style={styles.goalText}>Daily Steps: 10,000</Text>
          <Text style={styles.goalProgress}>65%</Text>
        </View>
        <View style={[styles.progressBar, { width: '65%' }]} />
        
        <View style={styles.goalRow}>
          <Text style={styles.goalText}>Weight Loss: 5kg</Text>
          <Text style={styles.goalProgress}>50%</Text>
        </View>
        <View style={[styles.progressBar, { width: '50%' }]} />
        
        <View style={styles.goalRow}>
          <Text style={styles.goalText}>Calorie Deficit: 3500/week</Text>
          <Text style={styles.goalProgress}>75%</Text>
        </View>
        <View style={[styles.progressBar, { width: '75%' }]} />
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
    backgroundColor: '#9C27B0',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
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
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    width: '45%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9C27B0',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  goalsCard: {
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
  goalsTitle: {
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
    color: '#9C27B0',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#9C27B0',
    borderRadius: 3,
    marginBottom: 15,
  },
});

export default ProgressScreen;