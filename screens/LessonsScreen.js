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
        tag: ["Putting", "Driving"],
      },
      {
        id: "v2",
        title: "Difference Between Sway and Horizontal Force",
        description:
          "Join The Force Plate Guy ... create more speed ... control low point ...",
        video_url: "jytxx04llcI",
        watched_fully: false,
        tag: ["Putting"],
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
        description:
          "Join The Force Plate Guy ... more speed ... reactionary environment ...",
        video_url: "zOFV00KZIRI",
        watched_fully: false,
        tag: ["Driving"],
      },
      {
        id: "v4",
        title: "Using the Lead Side for More Power",
        description:
          "Join The Force Plate Guy ... how the lead side of the body is used to create power ...",
        video_url: "Gf08Mp68fXc",
        watched_fully: false,
        tag: ["Driving"],
      },
    ],
  },
];

const getAllVideos = (sections) => {
  return sections.flatMap((section) =>
    section.videos.map((video) => ({
      ...video,
      sectionId: section.id,
    }))
  );
};

const LessonsScreen = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [sections, setSections] = useState(SAMPLE_SECTIONS);
  const [completedVideos, setCompletedVideos] = useState({});
  const [modalVisible, setModalVisible] = useState(false);

  const handleSectionPress = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleVideoSelect = (video) => {
    setCurrentVideo(video);
  };

  function markVideoAsWatched() {
    if (currentVideo) {
      let updatedVideos = { ...completedVideos };
      if (!updatedVideos[currentVideo.sectionId]) {
        updatedVideos[currentVideo.sectionId] = new Set();
      }
      updatedVideos[currentVideo.sectionId].add(currentVideo.id);
      setCompletedVideos(updatedVideos);
      setModalVisible(false);
      setCurrentVideo(null);
    }
  }

  const renderAllVideosSection = () => {
    const allVideos = getAllVideos(sections);

    return (
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Icon name="film-outline" size={24} color="#FE7201" />
            <Text style={styles.sectionTitle}>Recommended</Text>
          </View>
        </View>

        <View style={styles.videosContainer}>
          {allVideos.map((video) => (
            <TouchableOpacity
              key={video.id}
              style={styles.videoItem}
              onPress={() => {
                setExpandedSection(video.sectionId);
                handleVideoSelect(video);
              }}
            >
              <View style={styles.videoThumbnail}>
                <Icon name="play" size={30} color="#FE7201" />
              </View>
              <View style={styles.videoInfo}>
                <Text style={styles.videoTitle}>{video.title}</Text>
                <Text style={styles.videoDescription}>{video.description}</Text>
                <View style={styles.tagsContainer}>
                  {video.tag.map((tag, index) => (
                    <View key={index} style={styles.tagBubble}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

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
            {section.videos.map((video) => (
              <TouchableOpacity
                key={video.id}
                style={styles.videoItem}
                onPress={() => handleVideoSelect({ ...video, sectionId: section.id })}
              >
                <View style={styles.videoThumbnail}>
                  <Icon name="play" size={30} color="#FE7201" />
                </View>
                <View style={styles.videoInfo}>
                  <Text style={styles.videoTitle}>{video.title}</Text>
                  <Text style={styles.videoDescription}>{video.description}</Text>
                  <View style={styles.tagsContainer}>
                    {video.tag.map((tag, index) => (
                      <View key={index} style={styles.tagBubble}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>
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
      <Text style={styles.mainTitle}>Lessons</Text>

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

      <ScrollView style={styles.scrollContainer}>
        {renderAllVideosSection()}
        <Text
          style={{
            marginTop: 15,
            marginBottom: 15,
            fontSize: 24,
            fontWeight: "bold",
            color: "#FFF",
          }}
        >
          All Sections
        </Text>
        {sections.map(renderSection)}
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Did you finish watching this video?</Text>
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
    </SafeAreaView>
  );
};

/* ===========================
   STYLES
=========================== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222121",
  },
  mainTitle: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFF",
    textAlign: "center",
    marginBottom: 20,
    margin: 20,
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
    zIndex: 1,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6,
  },
  tagBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#FE7201",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111",
  },
  videoPlayerContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#000",
    position: "relative",
    zIndex: 10,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 8,
    zIndex: 11,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#222",
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
    color: "#FFF",
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
