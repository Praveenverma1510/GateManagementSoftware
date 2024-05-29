// AddGateForm.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addGate } from '../store/gateSlice';
import { Picker } from '@react-native-picker/picker';

const AddGateForm = ({ gate, onCancel }) => {
  const [gateName, setGateName] = useState(gate ? gate.gateName : '');
  const [numberOfGuards, setNumberOfGuards] = useState(gate ? String(gate.numberOfGuards) : '');
  const [gateType, setGateType] = useState(gate ? gate.gateType : 'Entry');
  const [shiftTime, setShiftTime] = useState(gate ? gate.shiftTime : '24 hours');
  const [startTime, setStartTime] = useState(gate ? gate.startTime : '');
  const [endTime, setEndTime] = useState(gate ? gate.endTime : '');

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(addGate({
      id: gate ? gate.id : Date.now(),
      gateName,
      numberOfGuards: parseInt(numberOfGuards),
      gateType,
      shiftTime,
      startTime,
      endTime,
      deleted: false
    }));
    setGateName('');
    setNumberOfGuards('');
    setStartTime('');
    setEndTime('');
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Gate Name"
        value={gateName}
        onChangeText={setGateName}
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Guards"
        value={numberOfGuards}
        onChangeText={setNumberOfGuards}
        keyboardType="numeric"
      />
      <Picker
        style={styles.input}
        selectedValue={gateType}
        onValueChange={setGateType}
      >
        <Picker.Item label="Entry" value="Entry" />
        <Picker.Item label="Exit" value="Exit" />
        <Picker.Item label="Both" value="Both" />
      </Picker>
      <Picker
        style={styles.input}
        selectedValue={shiftTime}
        onValueChange={setShiftTime}
      >
        <Picker.Item label="24 hours" value="24 hours" />
        <Picker.Item label="12 hours" value="12 hours" />
        <Picker.Item label="8 hours" value="8 hours" />
      </Picker>
      {(shiftTime !== '24 hours') && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Start Time"
            value={startTime}
            onChangeText={setStartTime}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="End Time"
            value={endTime}
            onChangeText={setEndTime}
            keyboardType="numeric"
          />
        </>
      )}
      <Button title="Add Gate" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
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

export default AddGateForm;
