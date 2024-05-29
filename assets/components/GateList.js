import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteGate } from '../store/gateSlice';
import AddGateForm from './AddGateForm'; 
const GateList = () => {
  const gates = useSelector(state => state.gates);
  const dispatch = useDispatch();
  const [editGateId, setEditGateId] = React.useState(null);

  const handleEdit = (gateId) => {
    setEditGateId(gateId);
  };

  const handleCancelEdit = () => {
    setEditGateId(null);
  };

  return (
    <View style={styles.container}>
      {editGateId !== null && (
        <View style={styles.editForm}>
          <AddGateForm gate={gates.find(gate => gate.id === editGateId)} onCancel={handleCancelEdit} />
        </View>
      )}
      <ScrollView style={styles.scrollContainer}>
        {gates.map(gate => (
          <View key={gate.id} style={[styles.card, { opacity: gate.deleted ? 0.5 : 1 }]}>
            <Text style={styles.text}>{gate.gateName}</Text>
            <Text style={styles.text}>{gate.numberOfGuards} Guards</Text>
            <Text style={styles.text}>Type: {gate.gateType}</Text>
            <Text style={styles.text}>Shift: {gate.shiftTime}</Text>
            {gate.shiftTime !== '24 hours' && (
              <>
                <Text style={styles.text}>Start Time: {gate.startTime}</Text>
                <Text style={styles.text}>End Time: {gate.endTime}</Text>
              </>
            )}
            <View style={styles.buttonContainer}>
              <Button title="Edit" onPress={() => handleEdit(gate.id)} />
              <Button title="Delete" onPress={() => dispatch(deleteGate(gate.id))} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  editForm: {
    marginBottom: 20,
  },
});

export default GateList;
