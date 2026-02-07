import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { IconCheckCircle } from './icons';

interface NovenaProgressDotsProps {
  completedDays: boolean[];
  currentDay: number;
}

export function NovenaProgressDots({ completedDays, currentDay }: NovenaProgressDotsProps) {
  return (
    <View style={styles.container}>
      {completedDays.map((completed, index) => {
        const dayNumber = index + 1;
        const isCurrent = dayNumber === currentDay && !completed;

        return (
          <View key={index} style={styles.dotWrapper}>
            {completed ? (
              <IconCheckCircle size={20} color={Colors.sage} />
            ) : (
              <View
                style={[
                  styles.dot,
                  isCurrent && styles.dotCurrent,
                ]}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  dotWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: Colors.charcoalSubtle,
    backgroundColor: 'transparent',
  },
  dotCurrent: {
    borderColor: Colors.terracotta,
    backgroundColor: Colors.terracottaMuted,
  },
});
