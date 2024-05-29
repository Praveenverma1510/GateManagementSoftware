import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { assignGuard } from '../store/guardSlice';
import { Picker } from '@react-native-picker/picker';


const AssignGuardForm = () => {
  const [guardCode, setGuardCode] = useState('');
  const [selectedGate, setSelectedGate] = useState('');

  const dispatch = useDispatch();
  const gates = useSelector(state => state.gates.filter(gate => !gate.deleted));

  useEffect(() => {
    console.log('Gates:', gates);
  }, [gates]);

  const handleSubmit = () => {
    const isAssigned = gates.find(gate => gate.id === selectedGate && gate.guards?.includes(guardCode));
    if (isAssigned) {
      alert('Guard already assigned to this gate');
    } else {
      dispatch(assignGuard({
        guardCode,
        gateId: selectedGate,
      }));
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Guard Code"
        value={guardCode}
        onChangeText={setGuardCode}
      />
      <Picker
        style={styles.input}
        selectedValue={selectedGate}
        onValueChange={setSelectedGate}
      >
        {gates.map(gate => (
          <Picker.Item key={gate.id} label={gate.gateName} value={gate.id} />
        ))}
      </Picker>
      <Button title="Assign Guard" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AssignGuardForm;
