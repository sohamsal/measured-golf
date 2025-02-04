import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import VideoPlayer from './VideoPlayer';
// import { supabase } from '../lib/supabase'; // Import your existing Supabase client
import { useNavigation } from '@react-navigation/native';

const LessonsScreen = ({ route }) => {

  const navigation = useNavigation();

  const topic = route.params.lessonName; // The topic passed to this screen
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [error, setError] = useState(null);

  const handlePress = ( route ) => {
    console.log(topic.name)
    navigation.navigate('Lessons', { lessonName: topic.name });
};

  const getVideoId = (url) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/);
    return match ? match[1] : null;
  };

  // Fetch videos based on the topic
//   async function fetchVideos() {
//     try {
//       const { data, error } = await supabase
//         .from('videos')
//         .select('id, video_title, video_link, duration, watched_fully')
//         .eq('topic', topic)
//         .order('video_title', { ascending: true });

//       if (error) {
//         console.error('Error fetching videos:', error);
//         setError('Failed to load videos. Please try again later.');
//         return [];
//       }
//       return data;
//     } catch (err) {
//       console.error('Unexpected error fetching videos:', err);
//       setError('An unexpected error occurred.');
//       return [];
//     }
//   }

  useEffect(() => {
    const loadVideos = async () => {
      const fetchedVideos = await fetchVideos();
      setVideos(fetchedVideos);
      if (fetchedVideos.length > 0) {
        setSelectedVideo(fetchedVideos[0]); // Set the first video as default
      }
    };

    loadVideos();
  }, [topic]);

  // Update `watched_fully` to true in the database
//   const markAsWatched = async (videoId) => {
//     try {
//       const { error } = await supabase
//         .from('videos')
//         .update({ watched_fully: true })
//         .eq('id', videoId);

//       if (error) {
//         console.error('Error updating watched_fully:', error);
//         setError('Failed to update video status.');
//       } else {
//         // Update the local state
//         setVideos((prevVideos) =>
//           prevVideos.map((video) =>
//             video.id === videoId ? { ...video, watched_fully: true } : video
//           )
//         );
//       }
//     } catch (err) {
//       console.error('Unexpected error updating watched_fully:', err);
//       setError('An unexpected error occurred.');
//     }
//   };

  // Handle video selection and mark as watched
  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    markAsWatched(video.id); // Mark the video as watched
  };

  return (
    <ScrollView style={styles.container}>

    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Catalog')}>
          <Icon name="arrow-back" size={24} color="#FF6F00" />
        </TouchableOpacity>
        <Icon name="bookmark-outline" size={24} color="#FF6F00" style={styles.bookmarkIcon} />
      </View>

      <View>
        {selectedVideo ? (
          <VideoPlayer videoId={getVideoId(selectedVideo.video_link)} />
        ) : (
          <Text style={styles.placeholderText}>{error || 'Select a video to play'}</Text>
        )}
      </View>

      <View style={styles.infoContainer}>
        {selectedVideo ? (
          <>
            <Text style={styles.title}>{selectedVideo.video_title}</Text>
            <Text style={styles.description}>Duration: {selectedVideo.duration}</Text>
          </>
        ) : (
          <Text style={styles.placeholderText}>No video selected</Text>
        )}
      </View>

      <View style={styles.upNextContainer}>
        <Text style={styles.upNextTitle}>Videos in {topic}</Text>
        {videos.map((video, index) => (
          <TouchableOpacity
            key={index}
            style={styles.videoItem}
            onPress={() => handleVideoSelect(video)}
          >
            <Icon name="play-circle-outline" size={20} color={video.watched_fully ? 'green' : '#FF6F00'} />
            <Text style={[styles.videoTitle, video.watched_fully && styles.watchedText]}>
              {video.video_title}
            </Text>
            <Text style={styles.duration}>{video.duration}</Text>
          </TouchableOpacity>
        ))}
      </View>
      </SafeAreaView>
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
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  backButton: {
    padding: 5,
  },
  bookmarkIcon: {
    padding: 5,
  },
  videoContainer: {
    width: '100%',
    height: 200,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
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
  videoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DDD',
  },
  videoTitle: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  watchedText: {
    color: 'green',
  },
  duration: {
    fontSize: 12,
    color: '#777',
  },
});

export default LessonsScreen;
