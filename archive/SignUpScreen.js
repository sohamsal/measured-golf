import React, { useState } from 'react';
import { Alert, StyleSheet, View, Button, TextInput, ScrollView } from 'react-native';
// import { supabase } from '../lib/supabase';
import { useNavigation } from '@react-navigation/native';

export default function Auth() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
      email: '',
      password: '',
      fullName: '',
      age: '',
      memberStatus: '',
      playerType: '',
      competitivePlay: '',
      height: '',
      armSpan: '',
      rightLeftHanded: '',
      averageScore: '',
      postStyle: '',
      injuryHistory: '',
      otherSportsHistory: '',
  });
  const navigation = useNavigation();

  const nextStep = () => {
      if (isStepCompleted(currentStep)) {
          setCurrentStep(currentStep + 1);
      } else {
          Alert.alert("Incomplete Form", "Please fill out all fields before proceeding.");
      }
  };

  const previousStep = () => {
      setCurrentStep(currentStep - 1);
  };

  const handleChange = (name, value) => {
      setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

//   const handleSubmit = async () => {
//       if (!isStepCompleted(currentStep)) {
//           Alert.alert("Incomplete Form", "Please complete all fields before submitting.");
//           return;
//       }

//       const { data: { session }, error } = await supabase.auth.signUp({
//           email: formData.email,
//           password: formData.password,
//       });

//       if (error) {
//           Alert.alert("Signup Error", error.message);
//       } else if (!session) {
//           Alert.alert('Verification', 'Please check your inbox for email verification!');
//       } else {
//           await createProfile(session.user.id);
//           navigation.navigate('Home');
//       }
//   };

  // Function to check if all fields for the current step are filled
  const isStepCompleted = (step) => {
      switch(step) {
          case 1:
              return formData.email.trim() !== '' && formData.password.trim() !== '';
          case 2:
              return formData.fullName.trim() !== '' && formData.age.trim() !== '';
          case 3:
              return formData.memberStatus.trim() !== '' && formData.playerType.trim() !== '' && formData.competitivePlay.trim() !== '';
          case 4:
              return formData.height.trim() !== '' && formData.armSpan.trim() !== '' && formData.rightLeftHanded.trim() !== '';
          case 5:
              return formData.averageScore.trim() !== '' && formData.postStyle.trim() !== '';
          case 6:
              return formData.injuryHistory.trim() !== '' && formData.otherSportsHistory.trim() !== '';
          default:
              return false;
      }
  };

    // async function createProfile(userId) {
    //     const { error } = await supabase.from('profiles').upsert({
    //         id: userId,
    //         full_name: formData.fullName,
    //         age: formData.age,
    //         player_type: formData.playerType,
    //         competitive_play: formData.competitivePlay,
    //         member_status: formData.memberStatus,
    //         average_score: formData.averageScore,
    //         height: formData.height,
    //         arm_span: formData.armSpan,
    //         right_left_handed: formData.rightLeftHanded,
    //         post_style: formData.postStyle,
    //         injury_history: formData.injuryHistory,
    //         other_sports_history: formData.otherSportsHistory,
    //     }, {
    //         returning: "minimal", // Don't return the value after inserting
    //     });

    //     if (error) {
    //         Alert.alert("Profile Update Error", error.message);
    //     }
    // };

    const renderStepContent = (step) => {
        switch(step) {
            case 1:
                return <>
                    <TextInput style={styles.input} placeholder="Email" value={formData.email} onChangeText={text => handleChange('email', text)} />
                    <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} value={formData.password} onChangeText={text => handleChange('password', text)} />
                </>;
            case 2:
                return <>
                    <TextInput style={styles.input} placeholder="Full Name" value={formData.fullName} onChangeText={text => handleChange('fullName', text)} />
                    <TextInput style={styles.input} placeholder="Age" value={formData.age} onChangeText={text => handleChange('age', text)} />
                </>;
            case 3:
                return <>
                    <TextInput style={styles.input} placeholder="Member Status" value={formData.memberStatus} onChangeText={text => handleChange('memberStatus', text)} />
                    <TextInput style={styles.input} placeholder="Player Type" value={formData.playerType} onChangeText={text => handleChange('playerType', text)} />
                    <TextInput style={styles.input} placeholder="Competitive Play" value={formData.competitivePlay} onChangeText={text => handleChange('competitivePlay', text)} />
                </>;
            case 4:
                return <>
                    <TextInput style={styles.input} placeholder="Height" value={formData.height} onChangeText={text => handleChange('height', text)} />
                    <TextInput style={styles.input} placeholder="Arm Span" value={formData.armSpan} onChangeText={text => handleChange('armSpan', text)} />
                    <TextInput style={styles.input} placeholder="Right/Left Handed" value={formData.rightLeftHanded} onChangeText={text => handleChange('rightLeftHanded', text)} />
                </>;
            case 5:
                return <>
                    <TextInput style={styles.input} placeholder="Average Score" value={formData.averageScore} onChangeText={text => handleChange('averageScore', text)} />
                    <TextInput style={styles.input} placeholder="Post Style" value={formData.postStyle} onChangeText={text => handleChange('postStyle', text)} />
                </>;
            case 6:
                return <>
                    <TextInput style={styles.input} placeholder="Injury History" value={formData.injuryHistory} onChangeText={text => handleChange('injuryHistory', text)} />
                    <TextInput style={styles.input} placeholder="Other Sports History" value={formData.otherSportsHistory} onChangeText={text => handleChange('otherSportsHistory', text)} />
                </>;
            default:
                return null;
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.formGroup}>
                {renderStepContent(currentStep)}
                <View style={styles.buttonContainer}>
                    {currentStep > 1 && (
                        <Button
                            title="Back"
                            onPress={previousStep}
                            color="#FC7108"
                        />
                    )}
                    {currentStep < 6 && (
                        <Button
                            title="Next"
                            onPress={nextStep}
                            color="#FC7108"
                        />
                    )}
                    {currentStep === 6 && (
                        <Button
                            title="Submit"
                            onPress={handleSubmit}
                            color="#FC7108"
                        />
                    )}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formGroup: {
        width: '80%',
        alignItems: 'center',
        marginBottom: 30,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});
