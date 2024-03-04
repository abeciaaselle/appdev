import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomePage = ({ navigation }) => {
  const categories = [
    { name: 'Personal', icon: 'account' },
    { name: 'Ideas', icon: 'lightbulb-outline' },
    { name: 'Long-Term Goals', icon: 'target' },
    { name: 'Work', icon: 'briefcase-variant' },
    { name: 'Inspiration', icon: 'star' },
    { name: 'Daily Goals', icon: 'calendar-check' },
  ];

  const renderCategories = () => {
    // Divide the categories array into two separate arrays
    const halfLength = Math.ceil(categories.length / 2);
    const firstHalf = categories.slice(0, halfLength);
    const secondHalf = categories.slice(halfLength);

    return (
      <View style={styles.categoriesContainer}>
        <View style={styles.column}>
          {firstHalf.map(category => (
            <TouchableOpacity
              key={category.name}
              style={styles.categoryButton}
              onPress={() => navigation.navigate(category.name)}
            >
              <MaterialCommunityIcons name={category.icon} size={24} color="white" />
              <Text style={styles.categoryButtonText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.column}>
          {secondHalf.map(category => (
            <TouchableOpacity
              key={category.name}
              style={styles.categoryButton}
              onPress={() => navigation.navigate(category.name)}
            >
              <MaterialCommunityIcons name={category.icon} size={24} color="white" />
              <Text style={styles.categoryButtonText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Organize Your Thoughts: Select a Category</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {renderCategories()}
      </ScrollView>
    </View>
  );
};

const theme = {
  colors: {
    primary: "rgb(0, 103, 131)",
    surface: "rgb(251, 252, 254)",
  }
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
    marginVertical: 20,
    textAlign: 'center',
  },
  scrollViewContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  categoriesContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 10, 
  },
  column: {
    flex: 1, 
    paddingHorizontal: 5, 
  },
  categoryButton: {
    width: windowWidth * 0.45, 
    height: 90, 
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row', 
    paddingHorizontal: 20, 
    shadowColor: '#888', 
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5, 
    shadowRadius: 5,
    elevation: 6, 
  },
  categoryButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10, 
  },
});

export default HomePage;
