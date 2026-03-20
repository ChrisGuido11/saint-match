import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '../constants/colors';
import { Typography, FontFamily } from '../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../constants/spacing';
import { linkEmailToAccount, signInWithEmail, supabase } from '../lib/supabase';

type AuthMode = 'signup' | 'signin';

interface LinkAccountModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: (email: string, mode: AuthMode) => void;
}

export function LinkAccountModal({ visible, onClose, onSuccess }: LinkAccountModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<AuthMode>('signup');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSignUp = mode === 'signup';

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user?.email) {
          setError(`Account already linked to ${session.user.email}`);
          setIsLoading(false);
          return;
        }

        if (session) {
          await linkEmailToAccount(email.trim(), password);
        } else {
          const { data, error: signUpError } = await supabase.auth.signUp({
            email: email.trim(),
            password,
          });
          if (signUpError) throw signUpError;

          if (data?.user && !data.session) {
            const { error: signInError } = await supabase.auth.signInWithPassword({
              email: email.trim(),
              password,
            });
            if (signInError) throw signInError;
          }
        }
      } else {
        await signInWithEmail(email.trim(), password);
      }

      onSuccess(email.trim(), mode);
      setEmail('');
      setPassword('');
    } catch (err: unknown) {
      if (__DEV__) console.error('Link account error:', err);
      const message = (err as { message?: string })?.message ?? 'Could not complete request.';

      // Smart error nudges
      if (isSignUp && message.toLowerCase().includes('already registered')) {
        setError('This email already has an account. Try signing in.');
      } else if (!isSignUp && message.toLowerCase().includes('invalid login credentials')) {
        setError('Email or password is incorrect.');
      } else {
        setError(message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setError(null);
    setMode('signup');
    onClose();
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setError(null);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={handleClose} />
        <View style={styles.container}>
          {/* Mode toggle tabs */}
          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[styles.tab, isSignUp && styles.tabActive]}
              onPress={() => switchMode('signup')}
              activeOpacity={0.7}
              accessibilityRole="tab"
              accessibilityState={{ selected: isSignUp }}
            >
              <Text style={[styles.tabText, isSignUp && styles.tabTextActive]}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, !isSignUp && styles.tabActive]}
              onPress={() => switchMode('signin')}
              activeOpacity={0.7}
              accessibilityRole="tab"
              accessibilityState={{ selected: !isSignUp }}
            >
              <Text style={[styles.tabText, !isSignUp && styles.tabTextActive]}>Sign In</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>
            {isSignUp ? 'Link Account' : 'Welcome Back'}
          </Text>
          <Text style={styles.subtitle}>
            {isSignUp
              ? 'Add your email to sync across devices and keep your progress safe.'
              : 'Sign in to restore your saints, streaks, and progress.'}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={Colors.charcoalSubtle}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            accessibilityLabel="Email address"
          />

          <TextInput
            style={styles.input}
            placeholder="Password (min 6 characters)"
            placeholderTextColor={Colors.charcoalSubtle}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
            accessibilityLabel="Password"
          />

          {error && <Text style={styles.error}>{error}</Text>}

          <TouchableOpacity
            style={[styles.linkButton, isLoading && styles.linkButtonDisabled]}
            onPress={handleSubmit}
            disabled={isLoading}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={isSignUp ? 'Link account' : 'Sign in'}
          >
            {isLoading ? (
              <ActivityIndicator color={Colors.white} />
            ) : (
              <Text style={styles.linkButtonText}>
                {isSignUp ? 'Link Account' : 'Sign In'}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={handleClose} style={styles.cancelButton} accessibilityRole="button" accessibilityLabel="Cancel">
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  tabRow: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.cream,
    padding: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.xs + 2,
    alignItems: 'center',
    borderRadius: BorderRadius.md - 2,
  },
  tabActive: {
    backgroundColor: Colors.white,
    ...Shadows.card,
  },
  tabText: {
    ...Typography.bodySmall,
    fontFamily: FontFamily.sansMedium,
    color: Colors.charcoalMuted,
  },
  tabTextActive: {
    color: Colors.charcoal,
  },
  title: {
    ...Typography.h2,
    color: Colors.charcoal,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  input: {
    backgroundColor: Colors.cream,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    ...Typography.body,
    color: Colors.charcoal,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.creamDark,
  },
  error: {
    ...Typography.bodySmall,
    color: Colors.error,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  linkButton: {
    backgroundColor: Colors.terracotta,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.sm + 2,
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  linkButtonDisabled: {
    opacity: 0.6,
  },
  linkButtonText: {
    ...Typography.button,
    color: Colors.white,
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    marginTop: Spacing.xs,
  },
  cancelText: {
    ...Typography.body,
    color: Colors.charcoalMuted,
  },
});
