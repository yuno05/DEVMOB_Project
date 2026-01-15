import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Play, Plus, Check } from 'lucide-react-native';
import { Link } from 'expo-router';
import { useGlobalContext } from '../context/GlobalContext';
import { useEffect, useState } from 'react';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

export default function HeroBanner({ item }) {
    const { isInWatchlist, toggleWatchlist } = useGlobalContext();
    const [inList, setInList] = useState(false);

    useEffect(() => {
        if (item) {
            setInList(isInWatchlist(item.id));
        }
    }, [item, isInWatchlist]);

    const handleListToggle = () => {
        if (item) {
            toggleWatchlist(item);
            setInList(!inList);
        }
    };

    if (!item) return <View className="h-[60vh] bg-netflixBlack w-full" />;

    return (
        <View className="relative w-full h-[60vh]">
            <Image
                source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
                className="w-full h-full"
                resizeMode="cover"
            />

            <LinearGradient
                colors={['transparent', '#000000']}
                style={{ position: 'absolute', bottom: 0, width: '100%', height: '50%' }}
            />

            <View className="absolute bottom-0 w-full flex-row justify-center items-center space-x-8 pb-10 gap-8">
                <TouchableOpacity
                    onPress={handleListToggle}
                    className="items-center justify-center -mb-2"
                >
                    {inList ? (
                        <Check color="#ffffff" size={24} />
                    ) : (
                        <Plus color="#ffffff" size={24} />
                    )}
                    <Text className="text-white text-xs mt-1">My List</Text>
                </TouchableOpacity>

                <Link href={`/movie/${item.id}?type=${item.media_type || (item.name ? 'tv' : 'movie')}`} asChild>
                    <TouchableOpacity className="flex-row items-center bg-white px-6 py-2 rounded-md">
                        <Play fill="black" color="black" size={20} className="mr-2" />
                        <Text className="text-black font-bold text-lg">Play</Text>
                    </TouchableOpacity>
                </Link>

                <TouchableOpacity className="items-center justify-center">
                    { }
                    { }
                </TouchableOpacity>
            </View>
        </View>
    );
}
