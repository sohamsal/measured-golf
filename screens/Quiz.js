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

  const isValidInput = () => {
    if (currentQuestion === 6) {
      // 18-hole score question
      return answers[currentQuestion] >= 18 && answers[currentQuestion] <= 126;
    }
    if (currentQuestion === 7) {
      // handicap question
      return answers[currentQuestion] >= 0 && answers[currentQuestion] <= 54;
    }
    return answers[currentQuestion] !== null;
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(answers);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.stepText}>
        Question {currentQuestion + 1}/{questions.length}
      </Text>
      <Text style={styles.questionText}>{questions[currentQuestion]}</Text>

      {currentQuestion < 6 ? (
        // Rating options for first 6 questions
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
        // Number input for last 2 questions
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
              {currentQuestion === 6 ? "score (18-126)" : "handicap (0-54)"}
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
  nextButton: {
    backgroundColor: "#FC7108",
    padding: 12,
    borderRadius: 30,
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
    width: "100%",
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
  disabledButton: {
    backgroundColor: "#666",
    opacity: 0.5,
  },
});

export default GolfQuiz;
