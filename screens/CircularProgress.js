import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const CircularProgress = ({ progress }) => {
  return (
    <View>
      <AnimatedCircularProgress
        size={50}
        width={7}
        fill={progress} // Percentage (0-100)
        tintColor="#FC7108"
        backgroundColor="#ecf0f1"
        rotation={0} // Ensures it fills from top
      >
        {fill => <Text style={styles.text}>{`${Math.round(fill)}%`}</Text>}
      </AnimatedCircularProgress>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: "white",
  },
});

export default CircularProgress;