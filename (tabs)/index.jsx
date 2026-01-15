import { View, ScrollView, SafeAreaView, ActivityIndicator, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { getTrendingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '../../services/api';
import HeroBanner from '../../components/HeroBanner';
import MovieRow from '../../components/MovieRow';
import { Stack } from 'expo-router';

export default function HomeScreen() {
    const [trending, setTrending] = useState([]);
    const [popular, setPopular] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [heroMovie, setHeroMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [trendingData, popularData, topRatedData, upcomingData] = await Promise.all([
                    getTrendingMovies(),
                    getPopularMovies(),
                    getTopRatedMovies(),
                    getUpcomingMovies(),
                ]);

                setTrending(trendingData);
                setPopular(popularData);
                setTopRated(topRatedData);
                setUpcoming(upcomingData);

                if (trendingData.length > 0) {
                    const random = trendingData[Math.floor(Math.random() * trendingData.length)];
                    setHeroMovie(random);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <View className="flex-1 bg-black justify-center items-center">
                <ActivityIndicator size="large" color="#E50914" />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-black">
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
                <HeroBanner item={heroMovie} />

                <View className="mt-8">
                    <MovieRow title="Trending Now" data={trending} />
                    <MovieRow title="Popular on Netflix" data={popular} />
                    <MovieRow title="Top Rated" data={topRated} />
                    <MovieRow title="Upcoming" data={upcoming} />
                </View>
            </ScrollView>

            {/* Floating Brand Header */}
            <SafeAreaView className="absolute top-0 left-0 w-full px-4 pt-2 pointer-events-none">
                <Text className="text-[#E50914] font-bold text-3xl tracking-widest bg-transparent">ONYX</Text>
            </SafeAreaView>
        </View>
    );
}
