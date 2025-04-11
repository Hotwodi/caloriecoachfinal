import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { useDispatch } from 'react-redux';
import { addMeal } from '../store';

const MealAnalysisScreen = () => {
  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [nutritionData, setNutritionData] = useState(null);
  const cameraRef = useRef(null);
  
  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      
      await MediaLibrary.requestPermissionsAsync();
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setImageUri(photo.uri);
      setCameraVisible(false);
      analyzeMeal(photo.uri);
    }
  };
  
  const analyzeMeal = async (uri) => {
    setAnalyzing(true);
    
    // In a real app, this would call Google Cloud Vision + Nutrition API
    // For demo purposes, we'll simulate a response after a delay
    setTimeout(() => {
      // Mock nutrition data
      const mockNutritionData = {
        calories: 520,
        protein: 25,
        carbs: 60,
        fat: 12,
        name: 'Chicken Salad with Quinoa'
      };
      
      setNutritionData(mockNutritionData);
      setAnalyzing(false);
    }, 2000);
  };

  // Function to add the analyzed meal to Redux store
  const addMealToTracker = () => {
    if (nutritionData) {
      dispatch(addMeal({
        name: nutritionData.name,
        calories: nutritionData.calories
      }));
      
      // Reset the screen to take another photo
      setImageUri(null);
      setNutritionData(null);
    }
  };

  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  };
  
  const pieData = nutritionData ? [
    {
      name: 'Protein',
      population: nutritionData.protein,
      color: '#4CAF50',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Carbs',
      population: nutritionData.carbs,
      color: '#2196F3',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Fat',
      population: nutritionData.fat,
      color: '#FFC107',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ] : [];
  
  if (hasPermission === null) {
    return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
  }
  
  if (hasPermission === false) {
    return <View style={styles.container}><Text>No access to camera</Text></View>;
  }

  return (
    <View style={styles.container}>
      {cameraVisible ? (
        <View style={styles.cameraContainer}>
          <Camera 
            style={styles.camera} 
            type={Camera.Constants.Type.back}
            ref={cameraRef}
          >
            <View style={styles.cameraButtonContainer}>
              <TouchableOpacity 
                style={styles.captureButton} 
                onPress={takePicture}
              />
            </View>
          </Camera>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <Text style={styles.headerText}>Meal Analysis</Text>
          
          {!imageUri ? (
            <TouchableOpacity 
              style={styles.cameraButton} 
              onPress={() => setCameraVisible(true)}
            >
              <Text style={styles.cameraButtonText}>Take a photo of your meal</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.resultContainer}>
              <Image source={{ uri: imageUri }} style={styles.mealImage} />
              
              {analyzing ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#4CAF50" />
                  <Text style={styles.loadingText}>Analyzing your meal...</Text>
                </View>
              ) : nutritionData ? (
                <View style={styles.nutritionContainer}>
                  <Text style={styles.mealName}>{nutritionData.name}</Text>
                  
                  <View style={styles.calorieContainer}>
                    <Text style={styles.calorieLabel}>Calories:</Text>
                    <Text style={styles.calorieValue}>{nutritionData.calories}</Text>
                  </View>
                  
                  <Text style={styles.macrosTitle}>Macronutrients (grams)</Text>
                  
                  <PieChart
                    data={pieData}
                    width={Dimensions.get('window').width - 40}
                    height={200}
                    chartConfig={chartConfig}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                  />
                  
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                      style={styles.addButton}
                      onPress={addMealToTracker}
                    >
                      <Text style={styles.addButtonText}>Add to Daily Tracking</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={[styles.newButton, { marginTop: 10 }]}
                      onPress={() => {
                        setImageUri(null);
                        setNutritionData(null);
                      }}
                    >
                      <Text style={styles.newButtonText}>Analyze Another Meal</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : null}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4CAF50',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraButtonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
    alignItems: 'flex-end',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  cameraButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  cameraButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  mealImage: {
    width: Dimensions.get('window').width - 40,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  nutritionContainer: {
    width: '100%',
    alignItems: 'center',
  },
  mealName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  calorieContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  calorieLabel: {
    fontSize: 18,
    color: '#666',
    marginRight: 5,
  },
  calorieValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  macrosTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  newButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  newButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 15,
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MealAnalysisScreen;