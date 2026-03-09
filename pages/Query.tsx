import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, ScrollView, View, Text } from 'react-native';
import SpeechToText from 'react-native-voice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import QueryHeader from '../components/Query/QueryHeader';
import QueryInput from '../components/Query/QueryInput';
import QueryResponse from '../components/Query/QueryResponse';
import SubmitButton from '../components/Query/SubmitButton';
import CasePopup from '../components/Query/CasePopup';
import CaseModal from '../components/Query/CaseModal';

const GROQ_API_KEY = "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";
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

interface CaseDetails {
  caseHeading: string;
  userQuery: string;
  tags: string;
  description: string;
  caseStatus: string;
}

interface ResponseData {
  acts?: Record<string, string>;
  description?: string;
  [key: string]: any;
}

const Query: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [response, setResponse] = useState<ResponseData | string>('Response will appear here...');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [caseDetails, setCaseDetails] = useState<CaseDetails>({
    caseHeading: '',
    userQuery: '',
    tags: '',
    description: '',
    caseStatus: 'closed',
  });

  const handleMicClick = async (): Promise<void> => {
    try {
      if (isListening) {
        await SpeechToText.stopListening();
        setIsListening(false);
      } else {
        await SpeechToText.startListening();
        setIsListening(true);
      }
    } catch (error) {
      setIsListening(false);
    }
  };

  const handleQuerySubmit = async (): Promise<void> => {
    setIsLoading(true);
    setError('');

    try {
      const prompt = `You are an expert Indian Legal Assistant. Analyze the following legal query and provide a response in JSON format.
      The JSON should have two fields:
      1. "acts": A dictionary where keys are relevant Sections/Articles of Indian Law (IPC, BNS, CrPC, etc.) and values are brief explanations of why they apply.
      2. "description": A comprehensive summary of the legal situation and advice.

      Query: ${query}

      Return ONLY the JSON string.`;

      const response = await axios.post(
        GROQ_API_URL,
        {
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: 1024,
          temperature: 0.7,
          top_p: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY.trim()}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const text = response.data.choices[0].message.content;
      const jsonStr = text.replace(/```json|```/g, '').trim();
      const data: ResponseData = JSON.parse(jsonStr);

      setResponse(data);

      setCaseDetails({
        caseHeading: 'Legal Analysis Result',
        userQuery: query,
        tags: Object.keys(data.acts || {}).join(', '),
        description: data.description || 'Detailed case description here.',
        caseStatus: 'under investigation',
      });

      setShowPopup(true);
    } catch (err: any) {
      console.error('API Error:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      const errorMessage = err.response?.data?.error?.message || err?.message || 'Something went wrong while fetching the response.';
      setError(errorMessage);
      setResponse('');
    }

    setIsLoading(false);
  };

  const handleSaveCase = async (): Promise<void> => {
    try {
      const storedCases = await AsyncStorage.getItem('local_cases');
      const cases = storedCases ? JSON.parse(storedCases) : [];

      const newCase = {
        id: Date.now(),
        caseHeading: caseDetails.caseHeading,
        query: caseDetails.userQuery,
        applicableArticle: caseDetails.description,
        description: caseDetails.description,
        status: caseDetails.caseStatus,
        tags: caseDetails.tags,
      };

      const updatedCases = [newCase, ...cases];
      await AsyncStorage.setItem('local_cases', JSON.stringify(updatedCases));

      Alert.alert('Success', 'Case saved successfully to local storage');
      setModalVisible(false);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Failed to save case locally');
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setCaseDetails({
      ...caseDetails,
      [key]: value,
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <QueryHeader />
      <View style={styles.tipBar}>
        <Text style={styles.tipLabel}>Tip</Text>
        <Text style={styles.tipText}>
          Include facts, timeline, and location for better legal section mapping.
        </Text>
      </View>
      <View style={styles.stack}>
        <QueryResponse response={response} isLoading={isLoading} error={error} />

        <QueryInput
          value={query}
          onChangeText={setQuery}
          onMicPress={handleMicClick}
          isListening={isListening}
        />

        <SubmitButton onPress={handleQuerySubmit} disabled={!query.trim() || isLoading} />

        <CasePopup
          visible={showPopup}
          onPress={() => {
            setShowPopup(false);
            setModalVisible(true);
          }}
        />

        <CaseModal
          visible={modalVisible}
          caseDetails={caseDetails}
          onClose={() => setModalVisible(false)}
          onSave={handleSaveCase}
          onInputChange={handleInputChange}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050A18',
  },
  content: {
    padding: 18,
    paddingBottom: 30,
    gap: 12,
  },
  tipBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: '#0D1B31',
    borderWidth: 1,
    borderColor: '#25466D',
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 8,
  },
  tipLabel: {
    color: '#F6A720',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  tipText: {
    flex: 1,
    color: '#CFE0F6',
    fontSize: 12,
    lineHeight: 17,
  },
  stack: {
    gap: 12,
  },
});

export default Query;
