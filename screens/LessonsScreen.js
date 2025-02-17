import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
  Pressable
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import VideoPlayer from "./VideoPlayer";
// import { supabase } from "../lib/supabase";
import { useNavigation } from "@react-navigation/native";
import CircularProgress from './CircularProgress'

const SAMPLE_SECTIONS = [
  {
    id: 1,
    title: "Putting Fundamentals",
    videos: [
      {
        id: "v1",
        title: "Grip and Stance",
        description: "Learn the proper putting grip and stance fundamentals",
        video_url: "dQw4w9WgXcQ",
        watched_fully: false,
      },
      {
        id: "v2",
        title: "Reading Greens",
        description: "Master the art of reading putting greens",
        video_url: "dQw4w9WgXcQ",
        watched_fully: true,
      },
    ],
  },
  {
    id: 2,
    title: "Driver Techniques",
    videos: [
      {
        id: "v3",
        title: "Tee Height",
        description: "Proper tee height for maximum distance",
        video_url: "dQw4w9WgXcQ",
        watched_fully: false,
      },
      {
        id: "v4",
        title: "Swing Path",
        description: "Correct swing path for straighter drives",
        video_url: "dQw4w9WgXcQ",
        watched_fully: false,
      },
    ],
  },
];

const LessonsScreen = ({ route }) => {
  const navigation = useNavigation();
  const [expandedSection, setExpandedSection] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [sections, setSections] = useState([]);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleQuiz, setModalVisibleQuiz] = useState(false);
  const [videoComplete, setVideoComplete] = useState(false)
  const [percent, setPercent] = useState(0)
  const [completedVideos, setcompletedVideos] = useState({})

  //TODO: put this into the db

  // Fetch course sections and videos from Supabase
  async function fetchCourseSections() {
    try {
      // const { data, error } = await supabase
      //   .from("course_sections")
      //   .select(
      //     `
      //     id,
      //     title,
      //     videos (
      //       id,
      //       title,
      //       description,
      //       video_url,
      //       watched_fully
      //     )
      //   `
      //   )
      //   .order("section_order", { ascending: true });
      await new Promise(resolve => setTimeout(resolve, 500));
      setSections(SAMPLE_SECTIONS);

      if (error) {
        setError("Failed to load course content");
        return;
      }

      setSections(data);
    } catch (err) {
      setError("An unexpected error occurred");
    }
  }

  useEffect(() => {
    fetchCourseSections();
  }, []);

  const handleSectionPress = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleVideoSelect = (video) => {
    setCurrentVideo(video);
    // markVideoAsWatched(video.id);
  };

  // const markVideoAsWatched = async (videoId) => {
  //   try {
  //     const { error } = await supabase
  //       .from("videos")
  //       .update({ watched_fully: true })
  //       .eq("id", videoId);

  //     if (error) {
  //       console.error("Error marking video as watched:", error);
  //     }
  //   } catch (err) {
  //     console.error("Unexpected error:", err);
  //   }
  // };

  function openModal() {
    setModalVisible(true);
  }
  function makeProgress() {
    console.log(expandedSection)
    var copyState = { ...completedVideos}; //create a new copy
    if (!copyState.hasOwnProperty(expandedSection)) {
      copyState[expandedSection] = new Set()
    }
    console.log(currentVideo.id)
    if (!copyState[expandedSection].has(currentVideo.id)) {
      copyState[expandedSection].add(currentVideo.id);
    }
    setcompletedVideos(copyState);
    closeVideo();
    //TODO: hardcoded 2 videos per section, to change later to be more flexible
    if (copyState[expandedSection].size == 2) {
      setModalVisibleQuiz(true);
    }
  }

  function closeVideo() {
    setCurrentVideo(null);
    setModalVisible(!modalVisible)
  }


  // Render a single section
  const renderSection = (section) => {
    const isExpanded = expandedSection === section.id;

    return (
      <View key={section.id} style={styles.sectionContainer}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Did you finish watching this video?</Text>
              <View style={styles.modalOptions}>
                <Pressable
                  style={[styles.button, styles.buttonCloseNo]}
                  onPress={() => closeVideo()}>
                  <Text style={styles.textStyle}>No</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonCloseYes]}
                  onPress={() => makeProgress(section.id)}>
                  <Text style={styles.textStyle}>Yes</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleQuiz}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Congrats! You have finished {section.title}!</Text>
              <Text style={styles.modalText}>Want to take a quick quiz to test your knowledge?</Text>
              <View style={styles.modalOptions}>
                <Pressable
                  style={[styles.button, styles.buttonCloseNo]}
                  onPress={() => setModalVisibleQuiz(false)}>
                  <Text style={styles.textStyle}>No</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonCloseYes]}
                  onPress={() => setModalVisibleQuiz(false)}>
                  <Text style={styles.textStyle}>Yes</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
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
            <CircularProgress progress={completedVideos.hasOwnProperty(section.id) ? (completedVideos[section.id].size / 2) * 100: 0} />
          </View>
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
                  <Text style={styles.videoTitle}>Video {index + 1}</Text>
                  <Text style={styles.videoDescription}>
                    {video.description}
                  </Text>
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
      <View>
        <Text style={styles.mainTitle}>
          Lessons
        </Text>
      </View>
      {currentVideo && (
        <View style={styles.videoPlayerContainer}>
          <VideoPlayer videoId={currentVideo.video_url} />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={openModal}
          >
            <Icon name="close" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.scrollContainer}>
        {sections.map(renderSection)}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 52,
    color: '#FFF',
    marginLeft: '5%',
    marginTop: '10%',
    fontWeight: 'bold',
    marginBottom: '5%',
  },
  container: {
    flex: 1,
    backgroundColor: '#222121',
  },
  scrollContainer: {
    flex: 1,
    padding: 16,
  },
  sectionContainer: {
    marginBottom: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#222121",
    overflow: "hidden",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#111",
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
  clickContainer: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#FF0000",
    padding: 4,
    paddingHorizontal: 8,
  },
  clickText: {
    color: "#FF0000",
    fontSize: 12,
  },
  videosContainer: {
    padding: 16,
    backgroundColor: "#111111",
  },
  videoItem: {
    flexDirection: "row",
    backgroundColor: "#222121",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#000000",
  },
  videoThumbnail: {
    width: 80,
    height: 80,
    backgroundColor: "#333",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  videoInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
    color: '#FFF'
  },
  videoDescription: {
    fontSize: 14,
    color: "#CCCCCC",
  },
  videoPlayerContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#000",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 8,
  },


  centeredView: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    //alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    elevation: 2,
    marginLeft: 5,
    marginRight: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonCloseNo: {
    //backgroundColor: '#2196F3',
    backgroundColor: "gray",
  },
  buttonCloseYes: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    //alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  containerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  nextButton: {
    flex: 1,
    alignItems: "flex-end",
    color: "blue",
    fontSize: 52
  },

  modalOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
  }

});

export default LessonsScreen;
