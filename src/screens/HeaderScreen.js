import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';

export default function HeaderScreen({ title, description, showBack = false }) {
    const navigation = useNavigation();

    return (
        <View className="bg-naranja-600 py-6 px-6 pt-10 flex-row items-center">
            {showBack && (
                <TouchableOpacity
                    className="w-6 h-6 bg-naranja-500 rounded-full items-center justify-center mr-4"
                    onPress={() => navigation.goBack()}
                >
                    <ChevronLeft color="white" size={24} />
                </TouchableOpacity>
            )}
            <View className="flex-1">
                <Text className="text-white text-3xl font-extrabold">{title}</Text>
                {description && <Text className="text-naranja-200 mt-1">{description}</Text>}
            </View>
        </View>
    );
}