import { Stack } from 'expo-router';
import { GlobalProvider } from '../context/GlobalContext';
import '../global.css';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import AnimatedSplash from '../components/AnimatedSplash';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [appIsReady, setAppIsReady] = useState(false);
    const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await new Promise(resolve => setTimeout(resolve, 500));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = async () => {
        if (appIsReady) {

            await SplashScreen.hideAsync();
        }
    };

    if (!appIsReady) {
        return null;
    }

    return (
        <GlobalProvider>
            <View style={{ flex: 1, backgroundColor: 'black' }} onLayout={onLayoutRootView}>
                <StatusBar style="light" />

                {!splashAnimationFinished && (
                    <AnimatedSplash onFinish={() => setSplashAnimationFinished(true)} />
                )}

                {/* 
            
        */}
                <Stack screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: 'black' },
                    animation: 'fade'
                }}>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="movie/[id]" options={{ presentation: 'modal', headerShown: false }} />
                </Stack>
            </View>
        </GlobalProvider>
    );
}
