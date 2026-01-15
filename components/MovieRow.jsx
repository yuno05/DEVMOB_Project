import { View, Text, FlatList } from 'react-native';
import ContentCard from './ContentCard';

export default function MovieRow({ title, data, type = 'movie' }) {
    if (!data || data.length === 0) return null;

    return (
        <View className="mb-8">
            <Text className="text-white text-lg font-bold mb-3 pl-4">{title}</Text>
            <FlatList
                data={data}
                renderItem={({ item }) => <ContentCard item={item} type={type} />}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16 }}
            />
        </View>
    );
}
