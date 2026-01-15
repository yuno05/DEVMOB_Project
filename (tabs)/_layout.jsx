import { Tabs } from 'expo-router';
import { Home, Tv, Search, List, Clapperboard } from 'lucide-react-native';
import { View } from 'react-native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#000000',
                    borderTopColor: '#121212',
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: '#E50914',
                tabBarInactiveTintColor: '#B3B3B3',
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '600',
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <Home size={24} color={color} strokeWidth={1.5} />,
                }}
            />
            <Tabs.Screen
                name="movies"
                options={{
                    title: 'Movies',
                    tabBarIcon: ({ color }) => <Clapperboard size={24} color={color} strokeWidth={1.5} />,
                }}
            />
            <Tabs.Screen
                name="tv"
                options={{
                    title: 'TV Shows',
                    tabBarIcon: ({ color }) => <Tv size={24} color={color} strokeWidth={1.5} />,
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    title: 'My Onyx',
                    tabBarIcon: ({ color }) => <List size={24} color={color} strokeWidth={1.5} />,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'Search',
                    tabBarIcon: ({ color }) => <Search size={24} color={color} strokeWidth={1.5} />,
                }}
            />
        </Tabs>
    );
}
