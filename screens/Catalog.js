import React, { useState, useEffect, useCallback } from 'react';
import { View, ImageBackground, Text, TextInput, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Block from './Block';
// import { supabase } from '../lib/supabase'; // Import the existing Supabase client

const Catalog = () => {
  const [topics, setTopics] = useState([]); // State to hold all topics
  const [searchQuery, setSearchQuery] = useState(''); // State for the search bar input
  const [filteredTopics, setFilteredTopics] = useState([]); // State for topics matching the search query

  // Fetch topics from Supabase
  // async function fetchTopics() {
  //   const { data, error } = await supabase
  //     .from('videos')
  //     .select('topic, watched_fully')
  //     .order('topic', { ascending: true });

  //   if (error) {
  //     console.error('Error fetching topics:', error);
  //     return [];
  //   }

  //   // Group videos by topic and calculate progress
  //   const topicMap = {};
  //   data.forEach((item) => {
  //     if (!topicMap[item.topic]) {
  //       topicMap[item.topic] = { total: 0, fullyWatched: 0 };
  //     }
  //     topicMap[item.topic].total += 1;
  //     if (item.watched_fully) {
  //       topicMap[item.topic].fullyWatched += 1;
  //     }
  //   });

  //   return Object.keys(topicMap).map((topic) => ({
  //     name: topic,
  //     progress: Math.round((topicMap[topic].fullyWatched / topicMap[topic].total) * 100),
  //   }));
  // }

  // Re-fetch data when the component is focused
  // useFocusEffect(
  //   useCallback(() => {
  //     const loadTopics = async () => {
  //       const fetchedTopics = await fetchTopics();
  //       setTopics(fetchedTopics); // Store all topics
  //       setFilteredTopics(fetchedTopics); // Update filtered topics
  //     };

  //     loadTopics();
  //   }, [])
  // );

  // Filter topics whenever `searchQuery` changes
  // useEffect(() => {
  //   const filtered = topics.filter((topic) =>
  //     topic.name.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  //   setFilteredTopics(filtered);
  // }, [searchQuery, topics]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ImageBackground source={require('./images/BackgroundClub.png')} style={styles.background} resizeMode="cover">
        <View style={styles.contentContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Driving Range</Text>
            <Text style={styles.subtitle}>Find tips & tricks to improve your scores</Text>
          </View>

          {/* Search Bar */}
          <TextInput
            style={styles.searchBar}
            placeholder="Search Topics"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />

          {/* Scrollable Topics List */}
          <ScrollView contentContainerStyle={styles.blocksContainer} showsVerticalScrollIndicator={false}>
            {filteredTopics.map((topic, index) => (
              <Block key={index} topic={topic} />
            ))}
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, // Makes the image fill the entire screen
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  safeContainer: {
    flex: 1,
    backgroundColor: '#FF6F00',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
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
});

export default Catalog;
