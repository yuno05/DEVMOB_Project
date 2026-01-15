import React, { useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSequence,
    withDelay,
    runOnJS
} from 'react-native-reanimated';

export default function AnimatedSplash({ onFinish }) {
    const scale = useSharedValue(0.8);
    const opacity = useSharedValue(1);
    const containerOpacity = useSharedValue(1);

    useEffect(() => {

        scale.value = withTiming(1.2, { duration: 1500 });

        opacity.value = withDelay(1500, withTiming(0, { duration: 800 }));
        containerOpacity.value = withDelay(1800, withTiming(0, { duration: 500 }, () => {
            runOnJS(onFinish)();
        }));
    }, []);

    const animatedTextStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
            opacity: opacity.value,
        };
    });

    const containerStyle = useAnimatedStyle(() => {
        return {
            opacity: containerOpacity.value,
        };
    });

    return (
        <Animated.View
            className="absolute inset-0 bg-black flex-1 justify-center items-center z-50"
            style={containerStyle}
        >
            <Animated.Text
                className="text-[#E50914] font-bold text-6xl tracking-widest"
                style={animatedTextStyle}
            >
                ONYX
            </Animated.Text>
        </Animated.View>
    );
}
