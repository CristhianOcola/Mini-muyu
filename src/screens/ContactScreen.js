import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Phone, Mail, MapPin } from 'lucide-react-native';
import HeaderScreen from './HeaderScreen';

export default function ContactScreen() {
    return (
        <SafeAreaView className="flex-1 bg-naranja-600" edges={['top', 'left', 'right']}>
            <HeaderScreen title="Contáctanos" description="Estamos aquí para ayudarte" showBack={true} />

            <View className="flex-1 bg-white rounded-t-3xl mt-2 overflow-hidden">
                <ScrollView
                    className="flex-1 p-6"
                    contentContainerStyle={{ paddingBottom: 40 }}
                    showsVerticalScrollIndicator={false}
                >
                    <Text className="text-gray-800 text-lg font-bold mb-4 mx-2">Ponte en contacto</Text>
                    <Text className="text-gray-500 mb-8 mx-2 text-base">
                        Si tienes algún problema con Mini Muyu o necesitas asistencia, no dudes en comunicarte con nosotros por los siguientes medios.
                    </Text>

                    <TouchableOpacity className="bg-gray-50 p-4 rounded-3xl flex-row items-center border border-gray-100 mb-4">
                        <View className="w-12 h-12 bg-naranja-100 rounded-full items-center justify-center mr-4">
                            <Phone color="#f97316" size={24} />
                        </View>
                        <View className="flex-1">
                            <Text className="text-gray-800 font-bold mb-1">Llámanos</Text>
                            <Text className="text-gray-500">+1 234 567 890</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-gray-50 p-4 rounded-3xl flex-row items-center border border-gray-100 mb-4">
                        <View className="w-12 h-12 bg-naranja-100 rounded-full items-center justify-center mr-4">
                            <Mail color="#f97316" size={24} />
                        </View>
                        <View className="flex-1">
                            <Text className="text-gray-800 font-bold mb-1">Escríbenos</Text>
                            <Text className="text-gray-500">soporte@minimuyu.com</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-gray-50 p-4 rounded-3xl flex-row items-center border border-gray-100 mb-8">
                        <View className="w-12 h-12 bg-naranja-100 rounded-full items-center justify-center mr-4">
                            <MapPin color="#f97316" size={24} />
                        </View>
                        <View className="flex-1">
                            <Text className="text-gray-800 font-bold mb-1">Encuéntranos</Text>
                            <Text className="text-gray-500">Lima, Perú</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
