import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from "react-native";
import GolfQuiz from "./Quiz"; // Import the GolfQuiz component
import VideoPlayer from "./VideoPlayer";
import CircularProgress from "./CircularProgress";
import Icon from "react-native-vector-icons/Ionicons";

// Sample Lesson Data
const SAMPLE_SECTIONS = [
  {
    id: 1,
    title: "Putting Fundamentals",
    videos: [
      {
        id: "v1",
        title: "Grip and Stance",
        description: "Learn the proper putting grip and stance fundamentals",
        video_url: "vmG6WkRQx2c",
        watched_fully: false,
      },
      {
        id: "v2",
        title: "Difference Between Sway and Horizontal Force",
        description: "Join The Force Plate Guy ... create more speed ... control low point ...",
        video_url: "jytxx04llcI",
        watched_fully: false,
      },
    ],
  },
  {
    id: 2,
    title: "Driver Techniques",
    videos: [
      {
        id: "v3",
        title: "Triggering The Action Forces",
        description: "Join The Force Plate Guy ... more speed ... reactionary environment ...",
        video_url: "zOFV00KZIRI",
        watched_fully: false,
      },
      {
        id: "v4",
        title: "Using the Lead Side for More Power",
        description: "Join The Force Plate Guy ... how the lead side of the body is used to create power ...",
        video_url: "Gf08Mp68fXc",
        watched_fully: false,
      },
    ],
  },
];

const LessonsScreen = () => {
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [sections, setSections] = useState(SAMPLE_SECTIONS);
  const [completedVideos, setCompletedVideos] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  // Called when user completes the quiz
  const handleQuizCompletion = () => {
    setHasCompletedQuiz(true);
  };

  // Toggle expansion of a section
  const handleSectionPress = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  // Select a video to watch
  const handleVideoSelect = (video) => {
    setCurrentVideo(video);
    // setModalVisible(true);
  };

  // Mark the current video as fully watched
  function markVideoAsWatched() {
    if (currentVideo) {
      let updatedVideos = { ...completedVideos };
      if (!updatedVideos[expandedSection]) {
        updatedVideos[expandedSection] = new Set();
      }
      updatedVideos[expandedSection].add(currentVideo.id);
      setCompletedVideos(updatedVideos);
      setModalVisible(false);
      setCurrentVideo(null);
    }
  }

  // Render each lesson section and its videos
  const renderSection = (section) => {
    const isExpanded = expandedSection === section.id;

    return (
      <View key={section.id} style={styles.sectionContainer}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => handleSectionPress(section.id)}
        >
          <View style={styles.sectionTitleContainer}>
            <Icon
              name={isExpanded ? "chevron-down" : "chevron-forward"}
              size={24}
              color="#FE7201"
            />
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
          <CircularProgress
                progress={
                  completedVideos[section.id]
                    ? (completedVideos[section.id].size / section.videos.length) * 100
                    : 0
                }
              />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.videosContainer}>
            {section.videos.map((video, index) => (
              <TouchableOpacity
                key={video.id}
                style={styles.videoItem}
                onPress={() => handleVideoSelect(video)}
              >
                <View style={styles.videoThumbnail}>
                  <Icon name="play" size={30} color="#FE7201" />
                </View>
                <View style={styles.videoInfo}>
                  <Text style={styles.videoTitle}>{video.title}</Text>
                  <Text style={styles.videoDescription}>{video.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* If quiz not completed, show quiz */}
      {!hasCompletedQuiz ? (
        <View style={styles.quizContainer}>
          <Text style={styles.quizTitle}>Golf Skill Assessment</Text>
          <Text style={styles.quizSubtitle}>
            Let's determine your current skill level to personalize your learning journey.
          </Text>
          <GolfQuiz onComplete={handleQuizCompletion} />
        </View>
      ) : (
        <>
          <Text style={styles.mainTitle}>Lessons</Text>

          {/* Show selected video at the top, then list of lessons */}
          {currentVideo && (
            <View style={styles.videoPlayerContainer}>
              <VideoPlayer videoId={currentVideo.video_url} />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(true)}
              >
                <Icon name="close" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>
          )}

          <Text style={{ marginTop: 15, marginLeft: 20, fontSize: 24, fontWeight: 'bold', color: '#FFF' }}>All sections</Text>
          <ScrollView style={styles.scrollContainer}>
            {sections.map(renderSection)}
          </ScrollView>

          {/* Modal for marking video as watched */}
          <Modal animationType="slide" transparent={true} visible={modalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  Did you finish watching this video?
                </Text>
                <View style={styles.modalOptions}>
                  <Pressable
                    style={[styles.button, styles.buttonCloseNo]}
                    onPress={markVideoAsWatched}
                  >
                    <Text style={styles.textStyle}>Yes</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonCloseYes]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.textStyle}>No</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
    </SafeAreaView>
  );
};

/* ===========================
   STYLES
   (Added zIndex to videoPlayerContainer and closeButton
    so clicks/taps can occur while video is playing)
=========================== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222121",
  },
  quizContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  quizTitle: {
    fontSize: 28,
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: 10,
  },
  quizSubtitle: {
    fontSize: 16,
    color: "#CCC",
    textAlign: "center",
    marginBottom: 30,
  },
  mainTitle: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 20,
    margin: 20,
  },
  /* Scroll container that holds the sections */
  scrollContainer: {
    flex: 1,
    padding: 16,
    zIndex: 1, // keep it below the video container
  },
  /* Sections + videos layout */
  sectionContainer: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between", 
    alignItems: "center",
    // flexDirection: "row",
    // alignItems: "center",
    padding: 16,
    backgroundColor: "#111",
    borderRadius: 8,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#FFF",
    marginLeft: 8,
  },
  videosContainer: {
    padding: 16,
    backgroundColor: "#111",
    borderRadius: 8,
    marginTop: -2,
  },
  videoItem: {
    flexDirection: "row",
    padding: 12,
    marginBottom: 8,
  },
  videoThumbnail: {
    width: 80,
    height: 60,
    backgroundColor: "#333",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  videoInfo: {
    marginLeft: 12,
    flex: 1,
    justifyContent: "center",
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFF",
    marginBottom: 4,
  },
  videoDescription: {
    fontSize: 14,
    color: "#CCC",
  },
  /* Video player container + close button */
  videoPlayerContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#000",
    position: "relative",
    zIndex: 10, // bring the video container above scroll
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 8,
    zIndex: 11, // ensure the close button is above the video
  },
  /* Modal styling */
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#222",
    color: '#FFF',
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: '#FFF'
  },
  modalOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
    marginHorizontal: 5,
  },
  buttonCloseYes: {
    backgroundColor: "gray",
  },
  buttonCloseNo: {
    backgroundColor: "#FE7201",
  },
  textStyle: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default LessonsScreen;
