import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Button, StatusBar, Platform } from 'react-native';
import { StackNavigator, TabNavigator, createDrawerNavigator } from 'react-navigation'; // 1.0.0-beta.27
import Icon from 'react-native-vector-icons/Ionicons'; // 4.6.0
import CountryList from './components/CountryList';

const isAndroid = Platform.OS === 'android';

const Screen1 = ({ navigation }) => (
  <SafeAreaView style={[styles.container, { backgroundColor: '#6a51ae' }]}>
    <StatusBar
      barStyle="light-content"
      backgroundColor="#6a51ae"
    />
    <Text style={[styles.paragraph, { color: '#fff' }]}>
      Light Screen
    </Text>
    <Button
      title="Next screen"
      onPress={() => navigation.navigate('Screen2')}
      color={isAndroid ? "blue" : "#fff"}
    />
  </SafeAreaView>
);

export default createDrawerNavigator({
  Screen1: {
    screen: Screen1,
  },
  Screen2: {
    screen: CountryList,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
