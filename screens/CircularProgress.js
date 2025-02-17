import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const CircularProgress = ({ progress }) => {
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={60}
        width={10}
        fill={progress} // Percentage (0-100)
        tintColor="#3498db"
        backgroundColor="#ecf0f1"
        rotation={0} // Ensures it fills from top
      >
        {fill => <Text style={styles.text}>{`${Math.round(fill)}%`}</Text>}
      </AnimatedCircularProgress>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '##222121',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "white",
  },
});

export default CircularProgress;