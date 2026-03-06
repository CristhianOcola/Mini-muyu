import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-audio';
import { Mic, Square, Play, Pause } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import HeaderScreen from './HeaderScreen';

export default function HomeScreen() {
    const navigation = useNavigation();
    const [recording, setRecording] = useState();
    const [recordings, setRecordings] = useState([]);

    // Ondas de audio fijas para estética visual
    const visualizerBars = [12, 24, 16, 32, 20, 40, 28, 16, 24, 36, 18, 28, 14, 22, 12];

    async function startRecording() {
        try {
            const permission = await Audio.requestPermissionsAsync();

            if (permission.status === "granted") {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true,
                });

                const { recording } = await Audio.Recording.createAsync(
                    Audio.RecordingOptionsPresets.HIGH_QUALITY
                );

                setRecording(recording);
            } else {
                Alert.alert("Permission to access microphone was denied");
            }
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();

        const timestamp = new Date().toLocaleString();
        setRecordings(prev => [{ uri, timestamp }, ...prev]);
        navigation.navigate('Recording', { uri, recording });

    }

    return (
        <SafeAreaView className="flex-1 bg-naranja-600" edges={['top', 'left', 'right']}>
            <HeaderScreen title="Mini Muyu" description="Graba tus clases" />
            <View className="flex-1 bg-white rounded-t-3xl justify-center">
                <View className="items-center justify-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-6 mx-auto w-[80%] shadow-naranja-200">
                    <TouchableOpacity
                        className={`w-32 h-32 rounded-full items-center justify-center shadow-lg mb-6 ${recording ? 'bg-red-500 shadow-red-200' : 'bg-naranja-500 shadow-naranja-200'
                            }`}
                        onPress={recording ? stopRecording : startRecording}
                    >
                        {recording ? (
                            <Square color="white" size={48} strokeWidth={2.5} />
                        ) : (
                            <Mic color="white" size={48} strokeWidth={2.5} />
                        )}
                    </TouchableOpacity>

                    <Text className="text-gray-800 text-xl font-extrabold mb-2 text-center">
                        {recording ? 'Grabando...' : 'Listo para grabar'}
                    </Text>
                    <Text className="text-gray-400 text-sm text-center px-2">
                        Toca el botón para {recording ? 'detener la grabación' : 'empezar a grabar'}.
                    </Text>

                    <View className="flex-row items-center justify-center mt-8 h-12" style={{ gap: 4 }}>
                        {visualizerBars.map((height, i) => (
                            <View
                                key={i}
                                className={`w-1.5 rounded-full ${recording ? 'bg-red-400' : 'bg-gray-200'}`}
                                style={{ height: recording ? height : Math.max(8, height * 0.4) }}
                            />
                        ))}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

