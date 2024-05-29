import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AddGateForm from '../components/AddGateForm';
import GateList from '../components/GateList';

const GateManagementScreen = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editGateId, setEditGateId] = useState(null);

  const handleEditGate = (gateId) => {
    setEditGateId(gateId);
    setShowAddForm(true);
  };

  const handleCancelEdit = () => {
    setEditGateId(null);
    setShowAddForm(false);
  };

  return (
    <View style={styles.container}>
      {showAddForm && <AddGateForm gate={editGateId} onCancel={handleCancelEdit} />}
      <GateList onEdit={handleEditGate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 0,
  },
});

export default GateManagementScreen;
