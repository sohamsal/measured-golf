import {React, useCallback} from 'react';
import { View, StyleSheet } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';

const VideoPlayer = ({ videoId }) => {
  return (
    <View style={styles.container}>
      <YoutubeIframe
        height={250} // Adjust height as needed
        videoId={videoId}
        play={true} // Automatically play video
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 250, // Adjust height for your needs
  },
});

export default VideoPlayer;
