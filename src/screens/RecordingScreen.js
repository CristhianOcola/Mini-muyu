import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';
import { Play, Pause, RotateCcw, Check } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import HeaderScreen from './HeaderScreen';

export default function RecordingScreen({ route }) {
    const navigation = useNavigation();
    const { uri } = route.params;
    const [sound, setSound] = useState();
    const [playingUri, setPlayingUri] = useState(null);

    // Ondas de audio fijas para estética visual
    const visualizerBars = [12, 24, 16, 32, 20, 40, 28, 16, 24, 36, 18, 28, 14, 22, 12];

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    async function playSound() {
        if (sound && playingUri === uri) {
            await sound.stopAsync();
            await sound.unloadAsync();
            setPlayingUri(null);
            setSound(undefined);
            return;
        }

        if (sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
        }

        try {
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
                    setPlayingUri(null);
                    setSound(undefined);
                }
            });
        } catch (error) {
            console.error('Failed to play sound', error);
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-naranja-600" edges={['top', 'left', 'right']}>
            <HeaderScreen title="Revisión" description="Escucha tu grabación antes de guardar" />

            <View className="flex-1 bg-plomo-100 rounded-t-3xl mt-2 overflow-hidden">
                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, justifyContent: 'center' }}>

                    {/* Tarjeta del Reproductor Central */}
                    <View className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 items-center justify-center mb-10 mx-auto w-[90%] shadow-naranja-200">

                        <View className="w-24 h-24 bg-naranja-50 rounded-full items-center justify-center mb-6">
                            <TouchableOpacity
                                className={`w-20 h-20 rounded-full items-center justify-center shadow-lg ${sound && playingUri === uri ? 'bg-plomo-500 shadow-plomo-200' : 'bg-naranja-500 shadow-naranja-200'
                                    }`}
                                onPress={() => playSound()}
                            >
                                {sound && playingUri === uri ? (
                                    <Pause color="white" size={32} fill="white" />
                                ) : (
                                    <Play color="white" size={32} fill="white" style={{ marginLeft: 4 }} />
                                )}
                            </TouchableOpacity>
                        </View>

                        <Text className="text-gray-800 text-xl font-extrabold mb-2">
                            {sound && playingUri === uri ? 'Reproduciendo...' : 'Grabación Lista'}
                        </Text>
                        <Text className="text-gray-400 text-sm text-center px-2">
                            Presiona el botón para escuchar lo que acabas de grabar.
                        </Text>

                        <View className="flex-row items-center justify-center mt-8 h-12" style={{ gap: 4 }}>
                            {visualizerBars.map((height, i) => (
                                <View
                                    key={i}
                                    className={`w-1.5 rounded-full ${sound && playingUri === uri ? 'bg-naranja-400' : 'bg-gray-200'}`}
                                    style={{ height: sound && playingUri === uri ? height : Math.max(8, height * 0.4) }}
                                />
                            ))}
                        </View>
                    </View>

                    {/* Botones de Acción Primario / Secundario */}
                    <View className="flex-row items-center justify-between w-[90%] mx-auto">
                        <TouchableOpacity
                            className="bg-white border-2 border-naranja-200 rounded-2xl py-4 flex-1 mr-3 items-center flex-row justify-center shadow-sm"
                            onPress={() => navigation.goBack()}
                        >
                            <RotateCcw color="#ea580c" size={20} />
                            <Text className="text-naranja-600 text-md font-bold ml-2">Reintentar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="bg-naranja-600 rounded-2xl py-4 flex-1 ml-3 items-center flex-row justify-center shadow-md shadow-naranja-200"
                            onPress={() => {
                                Alert.alert('¡Éxito!', 'El audio se guardó correctamente.', [
                                    { text: 'OK', onPress: () => navigation.navigate('Main') }
                                ]);
                            }}
                        >
                            <Check color="white" size={20} />
                            <Text className="text-white text-md font-bold ml-2">Guardar</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
