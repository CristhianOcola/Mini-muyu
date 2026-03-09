import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronRight, Shield, FileText, PhoneCall, UserCircle, Bell, Moon } from 'lucide-react-native';
import { useAuthStore } from '../store/useAuthStore';

import HeaderScreen from './HeaderScreen';

export default function ProfileScreen() {
    const { logout, user } = useAuthStore();
    const navigation = useNavigation();

    async function handleSignOut() {
        await logout();
    }

    const MenuRow = ({ icon: Icon, title, isToggle, isLast, onPress }) => (
        <TouchableOpacity
            className={`flex-row items-center p-4 bg-gray-50 border-gray-100 ${isLast ? '' : 'border-b'}`}
            onPress={onPress}
            activeOpacity={isToggle ? 1 : 0.7}
        >
            <View className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm mr-4">
                <Icon color="#f97316" size={20} />
            </View>
            <Text className="text-gray-700 font-medium flex-1 text-base">{title}</Text>

            {isToggle ? (
                <View className={`w-14 h-7 rounded-full flex-row items-center px-1 ${title === 'Modo Oscuro' ? 'bg-gray-300' : 'bg-naranja-500 justify-end'}`}>
                    <View className="w-5 h-5 bg-white rounded-full shadow-sm" />
                </View>
            ) : (
                <ChevronRight color="#9ca3af" size={20} />
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-naranja-600" edges={['top', 'left', 'right']}>
            <HeaderScreen title="Mi Perfil" description="Administra tu cuenta de Mini Muyu" />

            <View className="flex-1 bg-white rounded-t-3xl mt-2 overflow-hidden">
                <ScrollView
                    className="flex-1 p-6"
                    contentContainerStyle={{ paddingBottom: 40 }}
                    showsVerticalScrollIndicator={false}
                >
                    {/*Detalles de Usuario */}
                    <View className="items-center justify-center mt-6 mb-10">
                        <View className="w-24 h-24 bg-naranja-100 rounded-full mb-4 items-center justify-center">
                            <Text className="text-4xl">👤</Text>
                        </View>
                        <Text className="text-2xl font-bold text-gray-800">Usuario Demo</Text>
                        <Text className="text-gray-500 mt-1 mb-2">{user.email}</Text>
                        <TouchableOpacity className="bg-naranja-100 px-4 py-2 rounded-full">
                            <Text className="text-naranja-700 font-bold text-sm">Editar Perfil</Text>
                        </TouchableOpacity>
                    </View>

                    {/*Configuración */}
                    <Text className="text-gray-800 font-bold text-lg mb-3 mx-2">Configuración</Text>
                    <View className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 mb-8">
                        <MenuRow icon={UserCircle} title="Mi Cuenta" />
                        <MenuRow icon={Bell} title="Permitir notificaciones" isToggle />
                        <MenuRow icon={Moon} title="Modo Oscuro" isToggle isLast />
                    </View>

                    {/*Soporte y Legales */}
                    <Text className="text-gray-800 font-bold text-lg mb-3 mx-2">Soporte y Legales</Text>
                    <View className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 mb-10">
                        <MenuRow icon={PhoneCall} title="Contáctanos" onPress={() => navigation.navigate('Contact')} />
                        <MenuRow icon={Shield} title="Políticas de Privacidad" />
                        <MenuRow icon={FileText} title="Términos y Condiciones" isLast />
                    </View>

                    {/*Cuenta */}
                    <TouchableOpacity
                        className="bg-red-50/50 p-4 rounded-3xl flex-row items-center border border-red-100 mb-6"
                        onPress={() => handleSignOut()}
                    >
                        <Text className="text-red-500 font-bold flex-1 text-center text-lg">Cerrar Sesión</Text>
                    </TouchableOpacity>

                    <Text className="text-center text-gray-400 text-sm">Mini Muyu v1.0.0</Text>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
