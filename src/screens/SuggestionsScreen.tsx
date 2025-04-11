import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const EmptyPlate = () => (
  <View style={styles.emptyPlateContainer}>
    <View style={styles.emptyPlate}>
      <Text style={styles.emptyPlateText}>Meal image</Text>
    </View>
  </View>
);

const SuggestionsScreen = () => {
  const [mealType, setMealType] = useState('balanced');

  // Mock data for meal suggestions with specific food images or fallback to empty plate
  const mealSuggestions = {
    balanced: [
      {
        id: 'b1',
        name: 'Grilled Chicken Salad',
        calories: 350,
        protein: 30,
        carbs: 20,
        fat: 12,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
        description: 'A nutritious salad with lean protein from grilled chicken, mixed greens, and a light vinaigrette.',
        useEmptyPlate: false
      },
      {
        id: 'b2',
        name: 'Quinoa Bowl with Roasted Vegetables',
        calories: 420,
        protein: 15,
        carbs: 65,
        fat: 10,
        image: 'https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7',
        description: 'Protein-rich quinoa with a colorful mix of roasted vegetables and tahini dressing.',
        useEmptyPlate: false
      },
      {
        id: 'b3',
        name: 'Salmon with Sweet Potato',
        calories: 480,
        protein: 32,
        carbs: 45,
        fat: 15,
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288',
        description: 'Omega-3 rich salmon fillet with baked sweet potato and steamed broccoli.',
        useEmptyPlate: false
      },
    ],
    lowCalorie: [
      {
        id: 'l1',
        name: 'Vegetable Soup with Lentils',
        calories: 180,
        protein: 12,
        carbs: 30,
        fat: 2,
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd',
        description: 'A hearty, low-calorie soup packed with vegetables and protein-rich lentils.',
        useEmptyPlate: false
      },
      {
        id: 'l2',
        name: 'Greek Yogurt with Berries',
        calories: 150,
        protein: 15,
        carbs: 20,
        fat: 0,
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777',
        description: 'Protein-rich Greek yogurt topped with fresh berries and a touch of honey.',
        useEmptyPlate: false
      },
      {
        id: 'l3',
        name: 'Egg White Omelette with Spinach',
        calories: 165,
        protein: 18,
        carbs: 8,
        fat: 7,
        image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71',
        description: 'Fluffy egg white omelette with fresh spinach, tomatoes, and feta cheese.',
        useEmptyPlate: false
      },
    ],
    highProtein: [
      {
        id: 'h1',
        name: 'Steak with Roasted Brussels Sprouts',
        calories: 540,
        protein: 40,
        carbs: 15,
        fat: 30,
        image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba',
        description: 'Lean steak cooked to perfection with a side of roasted brussels sprouts.',
        useEmptyPlate: false
      },
      {
        id: 'h2',
        name: 'Protein Smoothie Bowl',
        calories: 320,
        protein: 35,
        carbs: 30,
        fat: 5,
        image: 'https://images.unsplash.com/photo-1494597564530-871f2b93ac55',
        description: 'A thick, creamy smoothie bowl with protein powder, banana, and a variety of toppings.',
        useEmptyPlate: false
      },
      {
        id: 'h3',
        name: 'Tuna Steak with Quinoa',
        calories: 410,
        protein: 42,
        carbs: 25,
        fat: 12,
        image: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7',
        description: 'Seared tuna steak with a side of fluffy quinoa and steamed asparagus.',
        useEmptyPlate: true // Using empty plate placeholder for demonstration
      },
    ],
  };

  // Function to decide which meals to show based on the selected type
  const getMealsToShow = () => {
    return mealSuggestions[mealType];
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Meal Suggestions</Text>
        <Text style={styles.headerSubtext}>
          Personalized recommendations based on your nutritional needs
        </Text>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, mealType === 'balanced' && styles.activeFilterButton]}
          onPress={() => setMealType('balanced')}
        >
          <Text style={[styles.filterText, mealType === 'balanced' && styles.activeFilterText]}>
            Balanced
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, mealType === 'lowCalorie' && styles.activeFilterButton]}
          onPress={() => setMealType('lowCalorie')}
        >
          <Text style={[styles.filterText, mealType === 'lowCalorie' && styles.activeFilterText]}>
            Low Calorie
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterButton, mealType === 'highProtein' && styles.activeFilterButton]}
          onPress={() => setMealType('highProtein')}
        >
          <Text style={[styles.filterText, mealType === 'highProtein' && styles.activeFilterText]}>
            High Protein
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mealsContainer}>
        {getMealsToShow().map((meal) => (
          <View key={meal.id} style={styles.mealCard}>
            {meal.useEmptyPlate ? (
              <EmptyPlate />
            ) : (
              <Image
                source={{ uri: meal.image }}
                style={styles.mealImage}
                defaultSource={require('../../assets/icon.png')}
                onError={(e) => {
                  console.log('Image failed to load');
                }}
              />
            )}
            
            <View style={styles.mealInfo}>
              <Text style={styles.mealName}>{meal.name}</Text>
              <Text style={styles.mealDescription}>{meal.description}</Text>
              
              <View style={styles.macroContainer}>
                <View style={styles.macroItem}>
                  <Text style={styles.macroValue}>{meal.calories}</Text>
                  <Text style={styles.macroLabel}>Calories</Text>
                </View>
                
                <View style={styles.macroItem}>
                  <Text style={styles.macroValue}>{meal.protein}g</Text>
                  <Text style={styles.macroLabel}>Protein</Text>
                </View>
                
                <View style={styles.macroItem}>
                  <Text style={styles.macroValue}>{meal.carbs}g</Text>
                  <Text style={styles.macroLabel}>Carbs</Text>
                </View>
                
                <View style={styles.macroItem}>
                  <Text style={styles.macroValue}>{meal.fat}g</Text>
                  <Text style={styles.macroLabel}>Fat</Text>
                </View>
              </View>
              
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>Add to Meal Plan</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.nutritionTipsCard}>
        <Text style={styles.tipsTitle}>Nutrition Tips</Text>
        
        <View style={styles.tipItem}>
          <Text style={styles.tipNumber}>1</Text>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Maintain a Calorie Balance</Text>
            <Text style={styles.tipText}>
              To maintain weight, consume calories equal to what you burn. To lose weight, create a moderate deficit of 500-750 calories per day.
            </Text>
          </View>
        </View>
        
        <View style={styles.tipItem}>
          <Text style={styles.tipNumber}>2</Text>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Focus on Protein Intake</Text>
            <Text style={styles.tipText}>
              Aim for 1.6-2.2g of protein per kg of body weight to support muscle recovery and maintenance.
            </Text>
          </View>
        </View>
        
        <View style={styles.tipItem}>
          <Text style={styles.tipNumber}>3</Text>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Stay Hydrated</Text>
            <Text style={styles.tipText}>
              Drink at least 2-3 liters of water daily. Proper hydration improves performance and helps regulate appetite.
            </Text>
          </View>
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
    backgroundColor: '#FF5722',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 5,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF5722',
  },
  activeFilterButton: {
    backgroundColor: '#FF5722',
  },
  filterText: {
    fontSize: 14,
    color: '#FF5722',
  },
  activeFilterText: {
    color: 'white',
  },
  mealsContainer: {
    paddingHorizontal: 15,
  },
  mealCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  mealImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  mealInfo: {
    padding: 15,
  },
  mealName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  mealDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  macroContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  macroLabel: {
    fontSize: 12,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  nutritionTipsCard: {
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
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  tipNumber: {
    width: 25,
    height: 25,
    backgroundColor: '#FF5722',
    borderRadius: 12.5,
    color: 'white',
    textAlign: 'center',
    lineHeight: 25,
    fontWeight: 'bold',
    marginRight: 10,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
  },
  emptyPlateContainer: {
    width: '100%',
    height: 150,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  emptyPlate: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyPlateText: {
    color: '#999',
    fontSize: 12,
  },
});

export default SuggestionsScreen;