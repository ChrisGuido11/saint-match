import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../constants/spacing';

interface NovenaInfoModalProps {
  visible: boolean;
  onClose: () => void;
}

export function NovenaInfoModal({ visible, onClose }: NovenaInfoModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose} />
        <View style={styles.container}>
          <Text style={styles.title}>What's a Novena?</Text>
          <Text style={styles.body}>
            A novena is 9 consecutive days of prayer to a saint, asking for their intercession. The word comes from the Latin "novem," meaning nine.
          </Text>
          <Text style={styles.body}>
            This ancient practice dates back to the early Church, when the apostles prayed together for nine days between the Ascension and Pentecost. It's a beautiful way to deepen your relationship with a patron saint while bringing a specific intention before God.
          </Text>
          <Text style={styles.body}>
            Each day includes an opening prayer, a unique daily prayer, and a closing prayer. Simply set your intention, show up each day, and trust in God's timing.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={onClose}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Got it"
          >
            <Text style={styles.buttonText}>Got It</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    width: '85%',
    maxWidth: 400,
    ...Shadows.card,
  },
  title: {
    ...Typography.h2,
    color: Colors.charcoal,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  body: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    marginBottom: Spacing.sm,
    lineHeight: 24,
  },
  button: {
    backgroundColor: Colors.sage,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.sm + 2,
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  buttonText: {
    ...Typography.button,
    color: Colors.white,
  },
});
