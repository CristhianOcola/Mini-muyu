import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import { Mic, Square } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useAudioStore } from '../store/useAudioStore';

import HeaderScreen from './HeaderScreen';

export default function HomeScreen() {
    const navigation = useNavigation();
    const {
        isRecording,
        setRecordingStatus,
        addRecording
    } = useAudioStore();

    // Referencia local para la grabación activa
    const [recordingInstance, setRecordingInstance] = React.useState(null);

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

                setRecordingInstance(recording);
                setRecordingStatus(true);
            } else {
                Alert.alert("Permission to access microphone was denied");
            }
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        if (!recordingInstance) return;

        setRecordingStatus(false);
        await recordingInstance.stopAndUnloadAsync();
        const uri = recordingInstance.getURI();

        const timestamp = new Date().toLocaleString();
        const newRecording = { uri, timestamp };

        addRecording(newRecording);
        setRecordingInstance(null);

        navigation.navigate('Recording', { uri });
    }

    return (
        <SafeAreaView className="flex-1 bg-naranja-600" edges={['top', 'left', 'right']}>
            <HeaderScreen title="Mini Muyu" description="Graba tus clases" />
            <View className="flex-1 bg-white rounded-t-3xl justify-center">
                <View className="items-center justify-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-6 mx-auto w-[80%] shadow-naranja-200">
                    <TouchableOpacity
                        className={`w-32 h-32 rounded-full items-center justify-center shadow-lg mb-6 ${isRecording ? 'bg-red-500 shadow-red-200' : 'bg-naranja-500 shadow-naranja-200'
                            }`}
                        onPress={isRecording ? stopRecording : startRecording}
                    >
                        {isRecording ? (
                            <Square color="white" size={48} strokeWidth={2.5} />
                        ) : (
                            <Mic color="white" size={48} strokeWidth={2.5} />
                        )}
                    </TouchableOpacity>

                    <Text className="text-gray-800 text-xl font-extrabold mb-2 text-center">
                        {isRecording ? 'Grabando...' : 'Listo para grabar'}
                    </Text>
                    <Text className="text-gray-400 text-sm text-center px-2">
                        Toca el botón para {isRecording ? 'detener la grabación' : 'empezar a grabar'}.
                    </Text>

                    <View className="flex-row items-center justify-center mt-8 h-12" style={{ gap: 4 }}>
                        {visualizerBars.map((height, i) => (
                            <View
                                key={i}
                                className={`w-1.5 rounded-full ${isRecording ? 'bg-red-400' : 'bg-gray-200'}`}
                                style={{ height: isRecording ? height : Math.max(8, height * 0.4) }}
                            />
                        ))}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

