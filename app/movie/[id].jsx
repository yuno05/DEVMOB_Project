import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { getDetails } from '../../services/api';
import { useGlobalContext } from '../../context/GlobalContext';
import { LinearGradient } from 'expo-linear-gradient';
import { X, Plus, Check, Play } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

export default function DetailsScreen() {
    const { id, type } = useLocalSearchParams();
    const router = useRouter();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const { isInWatchlist, toggleWatchlist } = useGlobalContext();
    const [inList, setInList] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            if (id) {
                const data = await getDetails(type || 'movie', id);
                setDetails(data);
                setLoading(false);
                setInList(isInWatchlist(data.id));
            }
        };
        fetchDetails();
    }, [id, type]);

    useEffect(() => {
        if (details) {
            setInList(isInWatchlist(details.id));
        }
    }, [details, isInWatchlist]);

    const handleToggle = () => {
        if (details) {
            toggleWatchlist(details);
        }
    };

    if (loading) {
        return (
            <View className="flex-1 bg-black justify-center items-center">
                <ActivityIndicator size="large" color="#E50914" />
            </View>
        );
    }

    if (!details) return (
        <View className="flex-1 bg-black justify-center items-center pt-20">
            <Text className="text-white text-lg mb-4">Content not found</Text>
            <TouchableOpacity onPress={() => router.back()} className="bg-[#E50914] px-4 py-2 rounded">
                <Text className="text-white font-bold">Go Back</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View className="flex-1 bg-black">
            <ScrollView className="flex-1">
                <View className="relative">
                    <Image
                        source={{ uri: `${IMAGE_BASE_URL}${details.poster_path}` }}
                        style={{ width, height: width * 1.5 }}
                        resizeMode="cover"
                    />
                    <LinearGradient
                        colors={['transparent', '#000000']}
                        style={{ position: 'absolute', bottom: 0, width: '100%', height: '30%' }}
                    />

                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="absolute top-12 right-4 bg-[#181818] p-2 rounded-full"
                    >
                        <X color="white" size={24} />
                    </TouchableOpacity>
                </View>

                <View className="px-4 -mt-10 pb-20">
                    <Text className="text-white text-3xl font-bold mb-2">{details.title || details.name}</Text>

                    <View className="flex-row items-center space-x-4 mb-6 gap-4">
                        <Text className="text-green-500 font-bold">{Math.round(details.vote_average * 10)}% Match</Text>
                        <Text className="text-gray-400">{details.release_date?.split('-')[0] || details.first_air_date?.split('-')[0]}</Text>
                        <View className="bg-gray-700 px-1 rounded">
                            <Text className="text-white text-xs">HD</Text>
                        </View>
                    </View>

                    <TouchableOpacity className="flex-row justify-center items-center bg-white py-3 rounded-md mb-4">
                        <Play fill="black" color="black" size={24} className="mr-2" />
                        <Text className="text-black font-bold text-lg">Play</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleToggle} className="flex-row justify-center items-center bg-[#2b2b2b] py-3 rounded-md mb-6">
                        {inList ? <Check color="white" size={24} className="mr-2" /> : <Plus color="white" size={24} className="mr-2" />}
                        <Text className="text-white font-bold text-lg">{inList ? 'My List' : 'My List'}</Text>
                    </TouchableOpacity>

                    <Text className="text-white text-base leading-6 mb-6">{details.overview}</Text>

                    <Text className="text-gray-400 text-sm">
                        <Text className="font-bold text-gray-500">Cast: </Text>
                        {details.credits?.cast?.slice(0, 3).map(c => c.name).join(', ')} ...
                    </Text>
                    <Text className="text-gray-400 text-sm mt-1">
                        <Text className="font-bold text-gray-500">Genres: </Text>
                        {details.genres?.map(g => g.name).join(', ')}
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}
