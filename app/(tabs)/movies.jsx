import { View, ScrollView, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { getTrendingMovies, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '../../services/api';
import HeroBanner from '../../components/HeroBanner';
import MovieRow from '../../components/MovieRow';

export default function MoviesScreen() {
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
            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
                <HeroBanner item={heroMovie} />

                <View className="mt-8">
                    <MovieRow title="Trending Movies" data={trending} type="movie" />
                    <MovieRow title="Popular Movies" data={popular} type="movie" />
                    <MovieRow title="Top Rated Movies" data={topRated} type="movie" />
                    <MovieRow title="Upcoming Movies" data={upcoming} type="movie" />
                </View>
            </ScrollView>
        </View>
    );
}
