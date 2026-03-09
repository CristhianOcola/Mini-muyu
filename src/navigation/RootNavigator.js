import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, User, Library } from 'lucide-react-native';
import { useAuthStore } from '../store/useAuthStore';
import { View, ActivityIndicator } from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RecordingScreen from '../screens/RecordingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ContactScreen from '../screens/ContactScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LibraryRecordingScreen from '../screens/LibraryRecordingScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ProfileStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Contact" component={ContactScreen} />
        </Stack.Navigator>
    );
}

function MainTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#f97316' }}>
            <Tab.Screen
                name="HomeTab"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Inicio',
                    tabBarIcon: ({ color, size }) => <Home color={color} size={size} />
                }}
            />
            <Tab.Screen
                name="LibraryTab"
                component={LibraryRecordingScreen}
                options={{
                    tabBarLabel: 'Biblioteca',
                    tabBarIcon: ({ color, size }) => <Library color={color} size={size} />
                }}
            />
            <Tab.Screen
                name="ProfileTab"
                component={ProfileStack}
                options={{
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({ color, size }) => <User color={color} size={size} />
                }}
            />
        </Tab.Navigator>
    );
}

export default function RootNavigator() {
    const { isAuthenticated, isLoading, initialize } = useAuthStore();

    useEffect(() => {
        const unsubscribe = initialize();
        return () => unsubscribe;
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f1f5f9' }}>
                <ActivityIndicator size="large" color="#f97316" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!isAuthenticated ? (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Register" component={RegisterScreen} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Main" component={MainTabs} />
                        <Stack.Screen name="Recording" component={RecordingScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
