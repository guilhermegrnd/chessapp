import React from 'react';
import { View, Text } from 'react-native';

const Modal: React.FC = (props:any) => {
  if(!props.show) return null;
  
  return (
    <View
      style={{
        backgroundColor: 'rgba(127, 255, 0, 0.5)',
        // elevation: 3,
        // position: 'absolute', 
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 50,
        display: 'flex',
        // marginTop: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        transition: '0.7s'
      }}
    >
      <Text 
        style={{
          fontSize: 24
        }}
      >
        {props.children}
      </Text>
    </View>
  )
}

export default Modal;