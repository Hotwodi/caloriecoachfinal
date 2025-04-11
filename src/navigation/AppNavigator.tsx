import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Screens
import DashboardScreen from '../screens/DashboardScreen';
import MealAnalysisScreen from '../screens/MealAnalysisScreen';
import ProgressScreen from '../screens/ProgressScreen';
import SuggestionsScreen from '../screens/SuggestionsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={styles.customTabButton}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.customTabButtonInner}>
      {children}
    </View>
  </TouchableOpacity>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 15,
            left: 15,
            right: 15,
            elevation: 0,
            backgroundColor: '#ffffff',
            borderRadius: 15,
            height: 60,
            ...styles.shadow
          }
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="stats-chart"
                size={24}
                color={focused ? '#4CAF50' : '#748c94'}
              />
            ),
            headerShown: false
          }}
        />
        
        <Tab.Screen
          name="Progress"
          component={ProgressScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="trending-up"
                size={24}
                color={focused ? '#9C27B0' : '#748c94'}
              />
            ),
            headerShown: false
          }}
        />
        
        <Tab.Screen
          name="Home"
          component={DashboardScreen} // Duplicate of dashboard as main home
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons name="home" size={24} color="#fff" />
            ),
            tabBarButton: (props) => (
              <CustomTabBarButton {...props} />
            ),
            headerShown: false
          }}
        />
        
        <Tab.Screen
          name="MealAnalysis"
          component={MealAnalysisScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="camera"
                size={24}
                color={focused ? '#4CAF50' : '#748c94'}
              />
            ),
            headerShown: false
          }}
        />
        
        <Tab.Screen
          name="Suggestions"
          component={SuggestionsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="restaurant"
                size={24}
                color={focused ? '#FF5722' : '#748c94'}
              />
            ),
            headerShown: false
          }}
        />

        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="settings-outline"
                size={24}
                color={focused ? '#2196F3' : '#748c94'}
              />
            ),
            headerShown: false
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  },
  customTabButton: {
    top: -25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customTabButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5
  }
});

export default AppNavigator;