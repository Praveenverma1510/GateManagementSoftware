import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

const GuardAssignmentList = () => {
  const guards = useSelector(state => state.guards);
  const gates = useSelector(state => state.gates);

  return (
    <View>
      {guards.map(guard => {
        const gate = gates.find(gate => gate.id === guard.gateId);
        return (
          <View key={guard.guardCode}>
            <Text>Guard Code: {guard.guardCode}</Text>
            <Text>Assigned to Gate: {gate?.gateName}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default GuardAssignmentList;
