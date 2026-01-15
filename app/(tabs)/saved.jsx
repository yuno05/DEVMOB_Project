import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useGlobalContext } from '../../context/GlobalContext';
import ContentCard from '../../components/ContentCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Edit2 } from 'lucide-react-native';

export default function SavedScreen() {
    const { watchlist } = useGlobalContext();

    const ProfileHeader = () => (
        <View className="mb-8 items-center">
            <View className="relative mb-4">
                <View className="w-24 h-24 bg-[#E50914] rounded-full justify-center items-center shadow-lg">
                    <Text className="text-white text-4xl font-bold">O</Text>
                </View>
                <TouchableOpacity className="absolute bottom-0 right-0 bg-[#2b2b2b] p-2 rounded-full border border-black">
                    <Edit2 size={12} color="white" />
                </TouchableOpacity>
            </View>
            <Text className="text-white text-xl font-bold mb-1">Onyx Member</Text>
            <Text className="text-gray-400 text-sm">Premium Plan</Text>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-black p-4" edges={['top']}>
            <FlatList
                data={watchlist}
                ListHeaderComponent={() => (
                    <View>
                        <ProfileHeader />
                        <Text className="text-white text-2xl font-bold mb-6 mt-4">My List</Text>
                    </View>
                )}
                renderItem={({ item }) => (
                    <ContentCard item={item} type="movie" style="mb-4 w-[30%]" />
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                ListEmptyComponent={
                    <View className="flex-1 justify-center items-center py-20">
                        <Text className="text-gray-500 text-lg">Your list is empty.</Text>
                        <Text className="text-gray-700 text-sm mt-2">Add movies and shows to see them here.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}
