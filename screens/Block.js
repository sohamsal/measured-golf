import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CircularProgress from './CircularProgress';
import { useNavigation } from '@react-navigation/native';

const Block = ({ topic }) => {

    const navigation = useNavigation();

    const handlePress = ( route ) => {
        console.log(topic.name)
        navigation.navigate('Lessons', { lessonName: topic.name });
    };

    return (
      <TouchableOpacity style={styles.block} onPress={() => handlePress(topic)}>
        <CircularProgress percent={topic.progress} />
        <Text style={styles.topicText}>{topic.name}</Text>
      </TouchableOpacity>
    );
  };
  
  const styles = StyleSheet.create({
    block: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 15,
      width: '47%',
      height: 150,
      marginVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      position: 'relative', // To make absolute positioning work inside this container
      borderRadius: 16,
    },
    topicText: {
      fontSize: 20,
      fontWeight: 'bold',
      position: 'absolute',
      bottom: 10, // Aligns the text to the bottom
      left: 10, // Aligns the text to the left
      textAlign: 'left',
    },
  });
  
  export default Block;