
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TodayScreen from '../screens/TodayScreen'
import YesterdayScreen from '../screens/YesterdayScreen'
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Bugün') {
            iconName = focused ? 'hourglass-start' : 'hourglass-start';
          } else if (route.name === 'Dün') {
            iconName = focused ? 'hourglass-end' : 'hourglass-end';
          }

          // You can return any component that you like here!
          return <Fontisto name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}

      >
        <Tab.Screen name="Bugün" component={TodayScreen} />
        <Tab.Screen name="Dün" component={YesterdayScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}