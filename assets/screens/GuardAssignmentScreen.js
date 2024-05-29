import React from 'react';
import { View, StyleSheet } from 'react-native';
import AssignGuardForm from '../components/AssignGuardForm';
import GuardAssignmentList from '../components/GuardAssignmentList';

const GuardAssignmentScreen = () => {
  return (
    <View style={styles.container}>
      <AssignGuardForm />
      <GuardAssignmentList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
});

export default GuardAssignmentScreen;
