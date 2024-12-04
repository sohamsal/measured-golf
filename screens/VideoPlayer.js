import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { WebView } from 'react-native-webview';

const VideoPlayer = ({ videoId }) => {
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`;

  const [playing, setPlaying] = useState(false);

  return (
    <WebView
    source={{ uri: youtubeEmbedUrl }}
    style={styles.webview}
    javaScriptEnabled={true}
    allowsFullscreenVideo={true}
  />

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VideoPlayer;
