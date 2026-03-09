import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAudioStore } from '../store/useAudioStore';
import { Play, Calendar, Music, Pause } from 'lucide-react-native';
import { Audio } from 'expo-av';
import HeaderScreen from './HeaderScreen';

export default function LibraryRecordingScreen() {
    const { recordings } = useAudioStore();
    const [sound, setSound] = useState(null);
    const [playingUri, setPlayingUri] = useState(null);

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    async function playSound(uri) {
        try {
            if (sound && playingUri === uri) {
                await sound.stopAsync();
                await sound.unloadAsync();
                setSound(null);
                setPlayingUri(null);
                return;
            }

            if (sound) {
                await sound.stopAsync();
                await sound.unloadAsync();
            }

            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                playsInSilentModeIOS: true,
            });

            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri },
                { shouldPlay: true }
            );

            setSound(newSound);
            setPlayingUri(uri);

            newSound.setOnPlaybackStatusUpdate((status) => {
                if (status.didJustFinish) {
                    setSound(null);
                    setPlayingUri(null);
                }
            });
        } catch (error) {
            console.error('Error al reproducir audio:', error);
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-naranja-600" edges={['top', 'left', 'right']}>
            <HeaderScreen title="Mis Grabaciones" description="Tu biblioteca de audios" />

            <View className="flex-1 bg-white rounded-t-3xl mt-2 overflow-hidden">
                {recordings.length === 0 ? (
                    <View className="flex-1 items-center justify-center p-10">
                        <View className="w-20 h-20 bg-gray-100 rounded-full items-center justify-center mb-4">
                            <Music color="#9ca3af" size={40} />
                        </View>
                        <Text className="text-gray-500 text-lg font-bold text-center">No hay grabaciones aún</Text>
                        <Text className="text-gray-400 text-center mt-2">Tus clases grabadas aparecerán aquí.</Text>
                    </View>
                ) : (
                    <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
                        {recordings.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                className={`p-4 rounded-2xl mb-4 flex-row items-center border ${playingUri === item.uri ? 'bg-naranja-50 border-naranja-200' : 'bg-gray-50 border-gray-100'}`}
                                onPress={() => playSound(item.uri)}
                            >
                                <View className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${playingUri === item.uri ? 'bg-naranja-500' : 'bg-naranja-100'}`}>
                                    {playingUri === item.uri ? (
                                        <Pause color="white" size={24} fill="white" />
                                    ) : (
                                        <Play color="#f97316" size={24} fill="#f97316" />
                                    )}
                                </View>
                                <View className="flex-1">
                                    <Text className={`font-bold text-base ${playingUri === item.uri ? 'text-naranja-700' : 'text-gray-800'}`} numberOfLines={1}>
                                        Grabación #{recordings.length - index}
                                    </Text>
                                    <View className="flex-row items-center mt-1">
                                        <Calendar color="#9ca3af" size={14} />
                                        <Text className="text-gray-400 text-xs ml-1">{item.timestamp}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
            </View>
        </SafeAreaView>
    );
}
