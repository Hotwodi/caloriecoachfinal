import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateWeight, updateStrideLength, updateFitnessGoals } from '../store';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const { weight, strideLength, fitnessGoals } = useSelector((state: RootState) => state.fitness);
  
  const [userWeight, setUserWeight] = useState(weight.toString());
  const [userStrideLength, setUserStrideLength] = useState(strideLength.toString());
  const [dailyStepsGoal, setDailyStepsGoal] = useState(fitnessGoals?.dailySteps?.toString() || '10000');
  const [calorieGoal, setCalorieGoal] = useState(fitnessGoals?.dailyCalories?.toString() || '2000');
  const [weightGoal, setWeightGoal] = useState(fitnessGoals?.targetWeight?.toString() || weight.toString());
  const [useMetricSystem, setUseMetricSystem] = useState(true);
  
  const handleSaveSettings = () => {
    // Validate inputs
    const weightValue = parseFloat(userWeight);
    const strideLengthValue = parseFloat(userStrideLength);
    const dailyStepsValue = parseInt(dailyStepsGoal, 10);
    const calorieGoalValue = parseInt(calorieGoal, 10);
    const weightGoalValue = parseFloat(weightGoal);
    
    if (isNaN(weightValue) || weightValue <= 0) {
      Alert.alert('Invalid Weight', 'Please enter a valid weight value.');
      return;
    }
    
    if (isNaN(strideLengthValue) || strideLengthValue <= 0) {
      Alert.alert('Invalid Stride Length', 'Please enter a valid stride length.');
      return;
    }
    
    if (isNaN(dailyStepsValue) || dailyStepsValue <= 0) {
      Alert.alert('Invalid Steps Goal', 'Please enter a valid daily steps goal.');
      return;
    }
    
    if (isNaN(calorieGoalValue) || calorieGoalValue <= 0) {
      Alert.alert('Invalid Calorie Goal', 'Please enter a valid daily calorie goal.');
      return;
    }
    
    if (isNaN(weightGoalValue) || weightGoalValue <= 0) {
      Alert.alert('Invalid Weight Goal', 'Please enter a valid target weight.');
      return;
    }
    
    // Update settings in Redux store
    dispatch(updateWeight(weightValue));
    dispatch(updateStrideLength(strideLengthValue));
    dispatch(updateFitnessGoals({
      dailySteps: dailyStepsValue,
      dailyCalories: calorieGoalValue,
      targetWeight: weightGoalValue
    }));
    
    Alert.alert('Settings Saved', 'Your personal settings have been updated successfully.');
  };
  
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>User Settings</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Weight</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={userWeight}
                onChangeText={setUserWeight}
                keyboardType="numeric"
                placeholder="Enter weight"
              />
              <Text style={styles.inputUnit}>{useMetricSystem ? 'kg' : 'lbs'}</Text>
            </View>
          </View>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Stride Length</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={userStrideLength}
                onChangeText={setUserStrideLength}
                keyboardType="numeric"
                placeholder="Enter stride length"
              />
              <Text style={styles.inputUnit}>{useMetricSystem ? 'm' : 'ft'}</Text>
            </View>
          </View>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Use Metric System</Text>
            <Switch
              value={useMetricSystem}
              onValueChange={setUseMetricSystem}
              trackColor={{ false: '#ccc', true: '#81b0ff' }}
              thumbColor={useMetricSystem ? '#4CAF50' : '#f4f3f4'}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fitness Goals</Text>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Daily Steps Goal</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={dailyStepsGoal}
                onChangeText={setDailyStepsGoal}
                keyboardType="numeric"
                placeholder="Enter daily steps goal"
              />
              <Text style={styles.inputUnit}>steps</Text>
            </View>
          </View>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Daily Calorie Goal</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={calorieGoal}
                onChangeText={setCalorieGoal}
                keyboardType="numeric"
                placeholder="Enter daily calorie goal"
              />
              <Text style={styles.inputUnit}>calories</Text>
            </View>
          </View>
          
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Target Weight</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={weightGoal}
                onChangeText={setWeightGoal}
                keyboardType="numeric"
                placeholder="Enter target weight"
              />
              <Text style={styles.inputUnit}>{useMetricSystem ? 'kg' : 'lbs'}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveSettings}
          >
            <Text style={styles.saveButtonText}>Save Settings</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Why These Settings Matter</Text>
          <Text style={styles.infoText}>
            Your weight and stride length are used to calculate calories burned during step tracking. 
            Setting accurate fitness goals helps personalize your experience and track progress more effectively.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
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
  section: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingLabel: {
    fontSize: 16,
    color: '#555',
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
  },
  inputUnit: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
    width: 40,
  },
  buttonContainer: {
    margin: 15,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#e8f5e9',
    borderRadius: 10,
    padding: 15,
    margin: 15,
    marginBottom: 30,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});

export default SettingsScreen;