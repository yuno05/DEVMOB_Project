import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { searchContent } from '../../services/api';
import ContentCard from '../../components/ContentCard';
import { Search, X } from 'lucide-react-native';

export default function SearchScreen() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (text) => {
        setQuery(text);
        if (text.length > 2) {
            setLoading(true);
            const data = await searchContent(text);
            setResults(data);
            setLoading(false);
        } else {
            setResults([]);
        }
    };

    const clearSearch = () => {
        setQuery('');
        setResults([]);
    };

    return (
        <SafeAreaView className="flex-1 bg-black px-4" edges={['top']}>
            <View className="flex-row items-center bg-[#2b2b2b] rounded-md px-4 py-3 mb-4 mt-2">
                <Search color="#B3B3B3" size={20} className="mr-3" />
                <TextInput
                    className="flex-1 text-white text-base"
                    placeholder="Search movies, TV shows..."
                    placeholderTextColor="#B3B3B3"
                    value={query}
                    onChangeText={handleSearch}
                    autoFocus={true}
                />
                {query.length > 0 && (
                    <TouchableOpacity onPress={clearSearch}>
                        <X color="#B3B3B3" size={20} />
                    </TouchableOpacity>
                )}
            </View>

            <FlatList
                data={results}
                renderItem={({ item }) => (
                    <ContentCard item={item} type={item.media_type || 'movie'} style="mb-4 w-[30%]" />
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                ListEmptyComponent={
                    query.length > 2 && !loading ? (
                        <Text className="text-gray-500 text-center mt-10">No results found.</Text>
                    ) : null
                }
            />
        </SafeAreaView>
    );
}
