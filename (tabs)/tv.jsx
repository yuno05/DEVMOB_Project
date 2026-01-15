import { View, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { getTVShows } from '../../services/api';
import HeroBanner from '../../components/HeroBanner';
import MovieRow from '../../components/MovieRow';

export default function TVScreen() {
    const [airingToday, setAiringToday] = useState([]);
    const [onTheAir, setOnTheAir] = useState([]);
    const [popular, setPopular] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [heroShow, setHeroShow] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [airing, onAir, pop, top] = await Promise.all([
                    getTVShows('airing_today'),
                    getTVShows('on_the_air'),
                    getTVShows('popular'),
                    getTVShows('top_rated'),
                ]);

                setAiringToday(airing);
                setOnTheAir(onAir);
                setPopular(pop);
                setTopRated(top);

                if (pop.length > 0) {
                    const random = pop[Math.floor(Math.random() * pop.length)];
                    setHeroShow(random);
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
                <HeroBanner item={heroShow} />

                <View className="mt-8">
                    <MovieRow title="Popular TV Shows" data={popular} type="tv" />
                    <MovieRow title="Airing Today" data={airingToday} type="tv" />
                    <MovieRow title="On The Air" data={onTheAir} type="tv" />
                    <MovieRow title="Top Rated TV" data={topRated} type="tv" />
                </View>
            </ScrollView>
        </View>
    );
}
