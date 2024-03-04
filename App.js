import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './screen/LandingPage';
import HomePage from './screen/HomePage';
import WorkPage from './screen/WorkPage';
import PersonalPage from './screen/PersonalPage';
import IdeasPage from './screen/IdeasPage';
import GoalsPage from './screen/GoalsPage';
import InspirationPage from './screen/InspirationPage';
import DailyGoalsPage from './screen/DailyGoalsPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MoodPad">
        <Stack.Screen name="MoodPad" component={LandingPage} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Work" component={WorkPage} />
        <Stack.Screen name="Personal" component={PersonalPage} />
        <Stack.Screen name="Ideas" component={IdeasPage} />
        <Stack.Screen name="Long-Term Goals" component={GoalsPage} />
        <Stack.Screen name="Inspiration" component={InspirationPage} />
        <Stack.Screen name="Daily Goals" component={DailyGoalsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
