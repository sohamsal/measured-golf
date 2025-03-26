import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import GolfQuiz from "./Quiz";

const AssessmentScreen = () => {
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);
  const [quizSkillLevel, setQuizSkillLevel] = useState("");

  // Called when user completes the quiz
  const handleQuizCompletion = (skillLevel) => {
    setQuizSkillLevel(skillLevel);
    setHasCompletedQuiz(true);
  };

  // Restart the quiz
  const handleRestartQuiz = () => {
    setHasCompletedQuiz(false);
    setQuizSkillLevel("");
  };

  return (
    <SafeAreaView style={styles.container}>
      {!hasCompletedQuiz ? (
        <View style={styles.quizContainer}>
          <Text style={styles.quizTitle}>Golf Skill Assessment</Text>
          <Text style={styles.quizSubtitle}>
            Let's determine your current skill level to personalize your
            learning journey.
          </Text>
          <GolfQuiz onComplete={handleQuizCompletion} />
        </View>
      ) : (
        <View style={styles.completionContainer}>
          <Text style={styles.completionTitle}>Assessment Complete!</Text>
          <Text style={styles.skillLevelText}>
            Your Skill Level:{" "}
            <Text style={styles.highlightText}>{quizSkillLevel}</Text>
          </Text>
          <Text style={styles.completionMessage}>
            Based on your answers, we've determined your current golf skill
            level. This will help us personalize your learning experience.
          </Text>
          <TouchableOpacity
            style={styles.restartButton}
            onPress={handleRestartQuiz}
          >
            <Text style={styles.restartButtonText}>Restart Assessment</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

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
  completionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
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
  completionTitle: {
    fontSize: 32,
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
  },
  skillLevelText: {
    fontSize: 22,
    color: "#FFF",
    textAlign: "center",
    marginBottom: 25,
  },
  highlightText: {
    color: "#FE7201",
    fontWeight: "bold",
  },
  completionMessage: {
    fontSize: 16,
    color: "#CCC",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  restartButton: {
    backgroundColor: "#FE7201",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
  },
  restartButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AssessmentScreen;
