import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleGateManagementPress = () => {
    navigation.navigate('Gate Management');
  };

  const handleGuardAssignmentPress = () => {
    navigation.navigate('Guard Assignment');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={1} style={styles.card} onPress={handleGateManagementPress}>
        <MaterialCommunityIcons name="gate" size={50} color="black" />
        <Text style={styles.text}>Gate Management</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={1} style={styles.card} onPress={handleGuardAssignmentPress}>
        <MaterialCommunityIcons name="security" size={50} color="black" />
        <Text style={styles.text}>Guard Assignment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    // width: '80%',
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,

    elevation: 13,
  },
  text: {
    fontSize: 24,
    marginTop: 30,
    // color:'voi'
  },
});

export default HomeScreen;
