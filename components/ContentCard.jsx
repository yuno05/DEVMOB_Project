import { View, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { cssInterop } from 'nativewind';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function ContentCard({ item, type = 'movie', style }) {
    if (!item.poster_path) return null;

    const mediaType = item.media_type || (item.name ? 'tv' : type);

    return (
        <Link href={`/movie/${item.id}?type=${mediaType}`} asChild>
            <TouchableOpacity className={`mr-4 rounded-md overflow-hidden ${style}`}>
                <Image
                    source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
                    className="w-32 h-48 rounded-md"
                    resizeMode="cover"
                />
            </TouchableOpacity>
        </Link>
    );
}
