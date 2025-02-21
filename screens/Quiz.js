import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const questions = [
  "Rate your overall golf swing technique",
  "Rate your driving accuracy and distance",
  "Rate your iron play precision",
  "Rate your short game proficiency",
  "Rate your putting performance",
  "Rate your swing mechanics and weight transfer",
  "Enter your typical 18-hole score on a Par-72 course (18-126)",
  "Enter your golf handicap score (0-54)",
];

// Convert Q7: Typical 18-Hole Score (18-126) to a rating (1-5)
const convertScoreToRating = (score) => {
  if (score >= 18 && score <= 75) return 5;
  if (score >= 76 && score <= 85) return 4;
  if (score >= 86 && score <= 95) return 3;
  if (score >= 96 && score <= 105) return 2;
  if (score >= 106 && score <= 126) return 1;
  return 0; // invalid
};

// Convert Q8: Handicap (0-54) to a rating (1-5)
const convertHandicapToRating = (handicap) => {
  if (handicap >= 0 && handicap <= 5) return 5;
  if (handicap >= 6 && handicap <= 10) return 4;
  if (handicap >= 11 && handicap <= 20) return 3;
  if (handicap >= 21 && handicap <= 30) return 2;
  if (handicap >= 31 && handicap <= 54) return 1;
  return 0; // invalid
};

const GolfQuiz = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleSelect = (value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = value;
    setAnswers(updatedAnswers);
  };

  const handleNumberInput = (value) => {
    const numValue = value === "" ? null : Number(value);
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = numValue;
    setAnswers(updatedAnswers);
  };

  // Check that the current question has a valid input
  const isValidInput = () => {
    if (currentQuestion === 6) {
      // 18-hole score question
      const val = answers[currentQuestion];
      return val >= 18 && val <= 126;
    }
    if (currentQuestion === 7) {
      // handicap question
      const val = answers[currentQuestion];
      return val >= 0 && val <= 54;
    }
    // For questions 1-6, just ensure they are not null
    return answers[currentQuestion] !== null;
  };

  // Move to the next question, or finalize if it’s the last
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Compute final skill level with weighting

      // aliases for better readability
      const q1 = answers[0];
      const q2 = answers[1];
      const q3 = answers[2];
      const q4 = answers[3];
      const q5 = answers[4];
      const q6 = answers[5];
      const q7 = answers[6];
      const q8 = answers[7];

      // convert them to numeric
      const numQ1 = Number(q1);
      const numQ2 = Number(q2);
      const numQ3 = Number(q3);
      const numQ4 = Number(q4);
      const numQ5 = Number(q5);
      const numQ6 = Number(q6);
      const numQ7 = Number(q7);
      const numQ8 = Number(q8);

      // Weights
      const weightQ1 = 2; // Q1
      const weightQ2 = 3; // Q2
      const weightQ3 = 2; // Q3
      const weightQ4 = 3; // Q4
      const weightQ5 = 3; // Q5
      const weightQ6 = 2; // Q6
      const weightQ7 = 3; // Q7
      const weightQ8 = 3; // Q8

      // Score for Q1-Q6 (1-5 scale)
      const score1 = numQ1 * weightQ1;
      const score2 = numQ2 * weightQ2;
      const score3 = numQ3 * weightQ3;
      const score4 = numQ4 * weightQ4;
      const score5 = numQ5 * weightQ5;
      const score6 = numQ6 * weightQ6;

      // Convert Q7 (score) and Q8 (handicap) to a rating, then multiply by weight
      const ratingQ7 = convertScoreToRating(numQ7);
      const weightedQ7 = ratingQ7 * weightQ7;

      const ratingQ8 = convertHandicapToRating(numQ8);
      const weightedQ8 = ratingQ8 * weightQ8;

      // Total
      const totalScore =
        score1 + score2 + score3 + score4 + score5 + score6 + weightedQ7 + weightedQ8;

      // Determine skill level
      let skillLevel = "";
      if (totalScore >= 21 && totalScore <= 49) {
        skillLevel = "Beginner";
      } else if (totalScore >= 50 && totalScore <= 77) {
        skillLevel = "Intermediate";
      } else if (totalScore >= 78 && totalScore <= 105) {
        skillLevel = "Advanced";
      } else {
        skillLevel = "Invalid Score";
      }

      // Pass skillLevel to parent
      onComplete(skillLevel);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.stepText}>
        Question {currentQuestion + 1}/{questions.length}
      </Text>
      <Text style={styles.questionText}>{questions[currentQuestion]}</Text>

      {currentQuestion < 6 ? (
        // Rating options (1-5) for first 6 questions
        <View style={styles.optionContainer}>
          {[1, 2, 3, 4, 5].map((num) => (
            <TouchableOpacity
              key={num}
              style={[
                styles.option,
                answers[currentQuestion] === num && styles.selectedOption,
              ]}
              onPress={() => handleSelect(num)}
            >
              <Text style={styles.optionText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        // Number input for questions 7 & 8
        <View style={styles.numberInputContainer}>
          <TextInput
            style={styles.numberInput}
            keyboardType="numeric"
            value={answers[currentQuestion]?.toString() || ""}
            onChangeText={handleNumberInput}
            placeholder={currentQuestion === 6 ? "18-126" : "0-54"}
            placeholderTextColor="#666"
          />
          {answers[currentQuestion] !== null && !isValidInput() && (
            <Text style={styles.errorText}>
              Please enter a valid{" "}
              {currentQuestion === 6
                ? "score (18-126)"
                : "handicap (0-54)"}
            </Text>
          )}
        </View>
      )}

      <TouchableOpacity
        style={[styles.nextButton, !isValidInput() && styles.disabledButton]}
        onPress={handleNext}
        disabled={!isValidInput()}
      >
        <Ionicons name="arrow-forward" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default GolfQuiz;

// =========== STYLES ===========

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    width: 300,
  },
  stepText: {
    color: "#bbb",
    fontSize: 14,
    marginBottom: 10,
  },
  questionText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  option: {
    backgroundColor: "#444",
    padding: 10,
    borderRadius: 20,
    width: 40,
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#FC7108",
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
  },
  numberInputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  numberInput: {
    backgroundColor: "#444",
    color: "#fff",
    padding: 15,
    borderRadius: 10,
    fontSize: 18,
    textAlign: "center",
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
  nextButton: {
    backgroundColor: "#FC7108",
    padding: 12,
    borderRadius: 30,
  },
  disabledButton: {
    backgroundColor: "#666",
    opacity: 0.5,
  },
});
