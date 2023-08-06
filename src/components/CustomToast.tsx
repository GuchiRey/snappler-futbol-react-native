import React from 'react';
import { View, Text } from 'react-native';

const CustomToast = (props: { message: string }) => {
  const { message } = props;
  return (
    <View style={{ height: 60, width: '100%', backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0 }}>
      <Text style={{ color: 'white' }}>{message}</Text>
    </View>
  );
};

export default CustomToast;
