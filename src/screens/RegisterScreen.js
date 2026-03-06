import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';
import { supabase } from '../lib/supabase'

export default function RegisterScreen() {
    const { setIsAuthenticated, setUser } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    async function register() {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        })

        if (error) {
            setErrorMessage(error.message)
            return
        }

        setErrorMessage('')
        setUser(data.user)
        setIsAuthenticated(true)
    }

    return (
        <SafeAreaView className="flex-1 bg-plomo-200">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1 justify-center px-8"
            >
                <View className="items-center mb-10">
                    <View className="w-24 h-24 bg-naranja-500 rounded-3xl items-center justify-center shadow-lg mb-6">
                        <Text className="text-5xl">🦙</Text>
                    </View>
                    <Text className="text-4xl font-extrabold text-gray-900 tracking-tight">Mini Muyu</Text>
                    <Text className="text-gray-500 mt-2 text-base text-center">Registrate para continuar</Text>
                </View>

                <View className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <View className="mb-4">
                        <Text className="text-sm font-semibold text-gray-700 mb-2">Correo Electrónico</Text>
                        <TextInput
                            className="bg-plomo-100 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-base focus:border-naranja-500 focus:bg-white"
                            placeholder="tu@correo.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                            placeholderTextColor="#9ca3af"
                        />
                    </View>

                    <View className="mb-8">
                        <Text className="text-sm font-semibold text-gray-700 mb-2">Contraseña</Text>
                        <TextInput
                            className="bg-plomo-100 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 text-base focus:border-naranja-500 focus:bg-white"
                            placeholder="••••••••"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            placeholderTextColor="#9ca3af"
                        />
                    </View>

                    <TouchableOpacity
                        className="bg-naranja-600 rounded-2xl py-4 items-center shadow-md"
                        onPress={register}
                    >
                        <Text className="text-white font-bold text-lg">Ingresar</Text>
                    </TouchableOpacity>

                    {errorMessage !== '' && (
                        <Text className="text-red-500 mt-4 text-center">
                            {errorMessage}
                        </Text>
                    )}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
