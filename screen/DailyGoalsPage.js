import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const theme = {
  colors: {
    primary: "rgb(0, 103, 131)",
    surface: "rgb(251, 252, 254)",
  }
};

const DailyGoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState('');
  const currentDate = new Date().toDateString(); // Get current date in a readable format

  const handleAddGoal = () => {
    if (newGoal.trim() !== '') {
      setGoals([...goals, { text: newGoal, achieved: false, date: currentDate }]);
      setNewGoal('');
    }
  };

  const handleToggleAchievement = (index) => {
    const updatedGoals = goals.map((goal, i) => {
      if (i === index) {
        return { ...goal, achieved: !goal.achieved };
      }
      return goal;
    });
    setGoals(updatedGoals);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new goal..."
          value={newGoal}
          onChangeText={setNewGoal}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddGoal}>
          <FontAwesome5 name="plus" size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Goals for {currentDate}</Text>
      <ScrollView style={styles.goalsContainer}>
        {goals.map((goal, index) => (
          <View
            key={index}
            style={[
              styles.goalItem,
              {
                backgroundColor: goal.achieved ? '#D3D3D3' : '#FFFFFF',
                // Conditional rendering of background color
              }
            ]}
          >
            <Text style={[styles.goalText, { color: goal.achieved ? '#000' : '#888' }]}>
              {goal.text}
            </Text>
            <TouchableOpacity onPress={() => handleToggleAchievement(index)}>
              <FontAwesome5
                name={goal.achieved ? 'check-circle' : 'times-circle'}
                size={20}
                color={goal.achieved ? 'black' : '#888'}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
  },
  goalsContainer: {
    flex: 1,
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    borderWidth: 0.5,
    padding: 18,
    borderRadius: 18,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 25,
    shadowRadius: 3.84,
    elevation: 8, // Para sa Android
  },
  goalText: {
    fontSize: 16,
    flex: 1,
  },
  achievedGoalText: {
    textDecorationLine: 'line-through',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    position: 'relative', 
  },
  input: {
    flex: 1,
    borderWidth: 0.3,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginRight: 10, // Space sa tunga sa input ug addButton
  },
  addButton: {
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0, // Ibutang sa right side sa input text
    top: '50%', // I-align sa vertical center sa input text
    marginTop: -30, // Mag-adjust aron ma-align sa vertical center
  },
});

export default DailyGoalsPage;
