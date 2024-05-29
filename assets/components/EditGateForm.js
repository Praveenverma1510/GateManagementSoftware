import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateGate } from '../store/gateSlice';
import { Picker } from '@react-native-picker/picker';


const EditGateForm = ({ gateId, onClose }) => {
  const dispatch = useDispatch();
  const gate = useSelector(state => state.gates.find(gate => gate.id === gateId));

  const [gateName, setGateName] = useState(gate.gateName);
  const [numberOfGuards, setNumberOfGuards] = useState(gate.numberOfGuards);
  const [gateType, setGateType] = useState(gate.gateType);
  const [shiftTime, setShiftTime] = useState(gate.shiftTime);
  const [startTime, setStartTime] = useState(gate.startTime);
  const [endTime, setEndTime] = useState(gate.endTime);

  const handleSubmit = () => {
    dispatch(updateGate({
      id: gateId,
      gateName,
      numberOfGuards,
      gateType,
      shiftTime,
      startTime,
      endTime,
      deleted: false
    }));
    onClose();
  };

  return (
    <View>
      <TextInput placeholder="Gate Name" value={gateName} onChangeText={setGateName} />
      <TextInput placeholder="Number of Guards" value={numberOfGuards} onChangeText={setNumberOfGuards} keyboardType="numeric" />
      <Picker selectedValue={gateType} onValueChange={setGateType}>
        <Picker.Item label="Entry" value="Entry" />
        <Picker.Item label="Exit" value="Exit" />
        <Picker.Item label="Both" value="Both" />
      </Picker>
      <Picker selectedValue={shiftTime} onValueChange={setShiftTime}>
        <Picker.Item label="24 hours" value="24 hours" />
        <Picker.Item label="12 hours" value="12 hours" />
        <Picker.Item label="8 hours" value="8 hours" />
      </Picker>
      {(shiftTime !== '24 hours') && (
        <>
          <TextInput placeholder="Start Time" value={startTime} onChangeText={setStartTime} />
          <TextInput placeholder="End Time" value={endTime} onChangeText={setEndTime} />
        </>
      )}
      <Button title="Save Changes" onPress={handleSubmit} />
      <Button title="Cancel" onPress={onClose} />
    </View>
  );
};

export default EditGateForm;
