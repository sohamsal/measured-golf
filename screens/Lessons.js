import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const LessonsScreen = ( { route } ) => {
    const { lessonName } = route.params;

    return (
        <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#FF6F00" />
            </TouchableOpacity>
            <Icon name="bookmark-outline" size={24} color="#FF6F00" style={styles.bookmarkIcon} />
        </View>

        {/* Video/Image Section */}
        <Image
            source={{ uri: 'https://via.placeholder.com/500x250' }}
            style={styles.image}
        />

        {/* Title and Description */}
        <View style={styles.infoContainer}>
            <Text style={styles.title}>Backhand Mechanics</Text>
            <Text style={styles.description}>
            Learn the different styles of swinging: backhand, fronthand, and how to effectively swing
            </Text>
        </View>

        {/* Up Next Section */}
        <View style={styles.upNextContainer}>
            <Text style={styles.upNextTitle}>Up Next</Text>

            {/* List of Lessons */}
            <View style={styles.lessonItem}>
            <View style={styles.lessonInfo}>
                <Text style={styles.lessonTitle}>Lesson 2 - Swing Mechanics</Text>
                <Icon name="chevron-forward-outline" size={20} color="#FF6F00" />
            </View>
            </View>

            {["Backhand Grip", "Generating Power", "Practice Drills", "Course Applications"].map(
            (title, index) => (
                <View key={index} style={styles.lessonSubItem}>
                <Icon name="play-circle-outline" size={20} color={title === "Generating Power" ? "#FF6F00" : "#C4C4C4"} />
                <Text style={[styles.subLessonTitle, title === "Generating Power" && styles.highlighted]}>
                    {title}
                </Text>
                <Text style={[styles.duration, title === "Generating Power" && styles.highlighted]}>0{index + 1}:{(index + 1) * 30}</Text>
                </View>
            )
            )}
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  backButton: {
    padding: 5,
  },
  bookmarkIcon: {
    padding: 5,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  upNextContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  upNextTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  lessonItem: {
    backgroundColor: '#F7F7F7',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lessonInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  lessonSubItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DDD',
  },
  subLessonTitle: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  duration: {
    fontSize: 12,
    color: '#777',
  },
  highlighted: {
    color: '#FF6F00',
    fontWeight: 'bold',
  },
});

export default LessonsScreen;
