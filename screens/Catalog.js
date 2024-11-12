import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Block from './Block';

const topics = [
    { name: 'Swing Mechanics', progress: 12 },
    { name: 'Course Management', progress: 54 },
    { name: 'Putting Techniques', progress: 76 },
    { name: 'Bunker Tips', progress: 38 },
    { name: 'Stance and Posture', progress: 22 },
    { name: 'Chipping Techniques', progress: 25 },
    { name: 'Green Reading', progress: 98 },
    { name: 'Ball Positioning', progress: 84 },
    { name: 'Grip Technique', progress: 43 },
    { name: 'Shot Shaping', progress: 5 },
  ];

const Catalog = ({}) => {

    return (
        <SafeAreaView style={styles.safeContainer}>
          <View style={styles.contentContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>Driving Range</Text>
              <Text style={styles.subtitle}>Find tips & tricks to improve your scores</Text>
            </View>
            <TextInput style={styles.searchBar} placeholder="Search Topics" />
            <ScrollView contentContainerStyle={styles.blocksContainer} showsVerticalScrollIndicator={false}>
              {topics.map((topic, index) => (
                  <Block topic={topic} />
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    safeContainer: {
      flex: 1,
      backgroundColor: '#FF6F00',
    },
    contentContainer: {
      flex: 1,
      paddingTop: 10,
      paddingHorizontal: 10, // Padding to ensure content is away from the edges
    },
    header: {
        marginBottom: 20,
    },
    title: {
      fontSize: 40,
      fontWeight: 'bold',
      color: 'white',
    },
    subtitle: {
      fontSize: 20,
      color: 'white',
      marginTop: 5,
    },
    searchBar: {
      backgroundColor: 'white',
      borderRadius: 10,
      height: 50,
      padding: 10,
      marginVertical: 5,
    },
    blocksContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    touchableBlock: {
        width: '90%',           // Ensure TouchableOpacity takes up only 48% of the width (2 per row)
        marginBottom: 10,       // Adds space between rows
    },
  });
  

export default Catalog