import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import VideoPlayer from './VideoPlayer';
import { WebView } from 'react-native-webview';

const LessonsScreen = ({ route }) => {
  const { lessonName } = route.params;

  const youtubeLink = "https://www.youtube.com/watch?v=Xj0Jtjg3lHQ";
  const videoId = youtubeLink.split('v=')[1]; // Extracts "VIDEO_ID"
  console.log(videoId)
  
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#FF6F00" />
        </TouchableOpacity>
        <Icon name="bookmark-outline" size={24} color="#FF6F00" style={styles.bookmarkIcon} />
      </View>

      {/* Video Player */}

      <View style={styles.videoContainer}>
        <VideoPlayer videoId={videoId} />
      </View>

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
        {[
          { title: 'Backhand Grip', duration: '01:37' },
          { title: 'Generating Power', duration: '05:49', highlighted: true },
          { title: 'Practice Drills', duration: '09:21' },
          { title: 'Course Applications', duration: '11:32' },
        ].map((lesson, index) => (
          <View
            key={index}
            style={[
              styles.lessonSubItem,
              lesson.highlighted && styles.highlightedItem,
            ]}
          >
            <Icon
              name="play-circle-outline"
              size={20}
              color={lesson.highlighted ? '#FF6F00' : '#C4C4C4'}
            />
            <Text
              style={[
                styles.subLessonTitle,
                lesson.highlighted && styles.highlightedText,
              ]}
            >
              {lesson.title}
            </Text>
            <Text
              style={[
                styles.duration,
                lesson.highlighted && styles.highlightedText,
              ]}
            >
              {lesson.duration}
            </Text>
          </View>
        ))}
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
  videoContainer: {
    width: '100%',
    aspectRatio: 16 / 9, // Ensures 16:9 aspect ratio
    backgroundColor: 'black', // Placeholder for video loading
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
  highlightedItem: {
    backgroundColor: '#FFF6E5',
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  highlightedText: {
    color: '#FF6F00',
    fontWeight: 'bold',
  },
});

export default LessonsScreen;
