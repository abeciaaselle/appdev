import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const LandingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/Landingpage.png')} style={styles.logo} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const theme = {
  colors: {
    primary: "rgb(0, 103, 131)",
    background: "rgb(251, 252, 254)",
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  logo: {
    width: 300,
    height: 300,
    marginTop: -150,
    marginBottom: 10,
    // tintColor: '#808080', // Gray color for logo
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 10,
    width: '80%', 
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    // fontWeight: 'bold',
  },
});

export default LandingPage;
