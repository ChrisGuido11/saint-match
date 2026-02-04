import React, { useEffect, useMemo } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { Colors } from '../constants/colors';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const CONFETTI_COLORS = [
  Colors.terracotta,
  Colors.terracottaLight,
  Colors.sage,
  Colors.sageLight,
  '#F5E6D3', // warm cream
  Colors.white,
  '#E8C4A0', // gold cream
];

interface ConfettiPieceProps {
  index: number;
  onFinish?: () => void;
  isLast: boolean;
}

function ConfettiPiece({ index, onFinish, isLast }: ConfettiPieceProps) {
  const translateY = useSharedValue(-30);
  const translateX = useSharedValue(0);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(0);

  const config = useMemo(() => {
    const startX = Math.random() * SCREEN_WIDTH;
    const drift = (Math.random() - 0.5) * 200;
    const size = 6 + Math.random() * 8;
    const isCircle = Math.random() > 0.5;
    const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
    const duration = 2000 + Math.random() * 1500;
    const delay = Math.random() * 400;

    return { startX, drift, size, isCircle, color, duration, delay };
  }, []);

  useEffect(() => {
    const { drift, duration, delay } = config;

    scale.value = withDelay(delay, withTiming(1, { duration: 200 }));

    translateY.value = withDelay(
      delay,
      withTiming(SCREEN_HEIGHT + 50, {
        duration,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      })
    );

    translateX.value = withDelay(
      delay,
      withTiming(drift, {
        duration,
        easing: Easing.inOut(Easing.ease),
      })
    );

    rotate.value = withDelay(
      delay,
      withTiming(360 * (Math.random() > 0.5 ? 1 : -1) * 3, {
        duration,
        easing: Easing.linear,
      })
    );

    opacity.value = withDelay(
      delay + duration * 0.7,
      withTiming(0, { duration: duration * 0.3 }, (finished) => {
        if (finished && isLast && onFinish) {
          runOnJS(onFinish)();
        }
      })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { rotate: `${rotate.value}deg` },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: config.startX,
          top: -20,
          width: config.size,
          height: config.isCircle ? config.size : config.size * 2.5,
          backgroundColor: config.color,
          borderRadius: config.isCircle ? config.size / 2 : 2,
        },
        animatedStyle,
      ]}
    />
  );
}

interface ConfettiAnimationProps {
  count?: number;
  onFinish?: () => void;
}

export function ConfettiAnimation({ count = 50, onFinish }: ConfettiAnimationProps) {
  return (
    <View style={styles.container} pointerEvents="none">
      {Array.from({ length: count }).map((_, i) => (
        <ConfettiPiece
          key={i}
          index={i}
          isLast={i === count - 1}
          onFinish={onFinish}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
    overflow: 'hidden',
  },
});
