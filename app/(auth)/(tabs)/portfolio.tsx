import React, { useMemo, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { format } from 'date-fns';
import { Colors } from '../../../constants/colors';
import { Typography, FontFamily } from '../../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../../constants/spacing';
import { useApp } from '../../../context/AppContext';
import { SAINTS } from '../../../constants/saints';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { IconChart } from '../../../components/icons';

export default function PortfolioScreen() {
  const { completions, streak } = useApp();
  const [isExporting, setIsExporting] = useState(false);

  const saintCompletionMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const c of completions) {
      map.set(c.saintId, (map.get(c.saintId) ?? 0) + 1);
    }
    return map;
  }, [completions]);

  const uniqueSaintsCount = useMemo(() => saintCompletionMap.size, [saintCompletionMap]);
  const totalChallenges = completions.length;

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const exportDate = format(new Date(), 'MMMM d, yyyy');

      const saintsHtml = SAINTS.map((saint) => {
        const count = saintCompletionMap.get(saint.id) ?? 0;
        return `<div class="saint-item ${count > 0 ? '' : 'dimmed'}">
          <div class="saint-initials">${saint.initials}</div>
          <div class="saint-info">
            <strong>${saint.name}</strong>
            ${count > 0 ? `<span class="saint-count">${count} challenge${count !== 1 ? 's' : ''}</span>` : '<span class="saint-count">Not yet met</span>'}
          </div>
        </div>`;
      }).join('');

      const completionsHtml = completions.length > 0
        ? completions.map(c =>
            `<div class="entry">
              <div class="entry-date">${format(new Date(c.completedAt), 'MMM d, yyyy')}</div>
              <div class="entry-action">${c.actionText}</div>
              <div class="entry-saint">Inspired by ${c.saintName}</div>
            </div>`
          ).join('')
        : '<p class="empty">No completed challenges yet.</p>';

      const html = `
        <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body {
              font-family: Georgia, 'Times New Roman', serif;
              background: #FAF8F5;
              color: #2D2D2D;
              padding: 40px;
              max-width: 700px;
              margin: 0 auto;
            }
            h1 {
              color: #8B9D83;
              font-size: 28px;
              margin-bottom: 4px;
            }
            .export-date {
              color: #999;
              font-size: 13px;
              margin-bottom: 32px;
            }
            h2 {
              color: #D4735E;
              font-size: 20px;
              border-bottom: 2px solid #E8E4DF;
              padding-bottom: 6px;
              margin-top: 32px;
            }
            .streak-summary {
              display: flex;
              gap: 32px;
              margin: 16px 0;
            }
            .streak-box {
              background: #fff;
              border-radius: 8px;
              padding: 16px 24px;
              box-shadow: 0 1px 3px rgba(0,0,0,0.08);
            }
            .streak-label { color: #999; font-size: 13px; }
            .streak-value { font-size: 28px; color: #8B9D83; font-weight: bold; }
            .saint-item {
              display: flex;
              align-items: center;
              gap: 12px;
              padding: 8px 0;
              border-bottom: 1px solid #E8E4DF;
            }
            .saint-item.dimmed { opacity: 0.4; }
            .saint-initials {
              width: 36px;
              height: 36px;
              border-radius: 50%;
              background: #8B9D83;
              color: #fff;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              font-weight: bold;
              text-align: center;
              line-height: 36px;
            }
            .saint-info { flex: 1; }
            .saint-count { color: #999; font-size: 13px; margin-left: 8px; }
            .entry {
              background: #fff;
              border-radius: 8px;
              padding: 14px 16px;
              margin-bottom: 10px;
              box-shadow: 0 1px 3px rgba(0,0,0,0.06);
            }
            .entry-date { color: #999; font-size: 12px; margin-bottom: 4px; }
            .entry-action { color: #2D2D2D; font-size: 15px; line-height: 1.4; }
            .entry-saint { color: #8B9D83; font-size: 13px; margin-top: 6px; font-style: italic; }
            .empty { color: #999; font-style: italic; }
          </style>
        </head>
        <body>
          <h1>Saint Match — Virtue Portfolio</h1>
          <p class="export-date">Exported ${exportDate}</p>

          <h2>Streak</h2>
          <div class="streak-summary">
            <div class="streak-box">
              <div class="streak-label">Current Streak</div>
              <div class="streak-value">${streak.currentStreak} day${streak.currentStreak !== 1 ? 's' : ''}</div>
            </div>
            <div class="streak-box">
              <div class="streak-label">Longest Streak</div>
              <div class="streak-value">${streak.longestStreak} day${streak.longestStreak !== 1 ? 's' : ''}</div>
            </div>
          </div>

          <h2>Saints Collection (${uniqueSaintsCount} of ${SAINTS.length})</h2>
          ${saintsHtml}

          <h2>Challenge History (${completions.length} ${completions.length === 1 ? 'entry' : 'entries'})</h2>
          ${completionsHtml}
        </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(uri);
    } catch {
      Alert.alert('Error', 'Could not export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Animated.View entering={FadeIn.duration(500)} style={styles.header}>
        <Text style={styles.title}>Virtue Portfolio</Text>
        <Text style={styles.subtitle}>Your spiritual growth at a glance</Text>
      </Animated.View>

      {/* Saints Collection */}
      <Animated.View entering={FadeInDown.delay(100).duration(500)}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>YOUR SAINTS</Text>
          <Text style={styles.sectionSubtitle}>{uniqueSaintsCount} of {SAINTS.length} saints</Text>
        </View>
        <View style={styles.saintsGrid}>
          {SAINTS.map((saint) => {
            const count = saintCompletionMap.get(saint.id) ?? 0;
            const encountered = count > 0;
            return (
              <View
                key={saint.id}
                style={[styles.saintCard, !encountered && styles.saintCardDimmed]}
              >
                <View style={[styles.saintInitials, !encountered && styles.saintInitialsDimmed]}>
                  <Text style={[styles.saintInitialsText, !encountered && styles.saintInitialsTextDimmed]}>
                    {saint.initials}
                  </Text>
                </View>
                <Text style={[styles.saintName, !encountered && styles.saintNameDimmed]} numberOfLines={2}>
                  {saint.name}
                </Text>
                {encountered && (
                  <View style={styles.saintCountBadge}>
                    <Text style={styles.saintCountText}>{count}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </Animated.View>

      {/* Journey Stats */}
      <Animated.View entering={FadeInDown.delay(200).duration(500)}>
        <Text style={styles.sectionTitle}>YOUR JOURNEY</Text>
        {totalChallenges > 0 ? (
          <View style={styles.statsCard}>
            <View style={styles.statsGrid}>
              <View style={styles.statBlock}>
                <Text style={styles.statNumber}>{totalChallenges}</Text>
                <Text style={styles.statLabel}>Challenges{'\n'}Completed</Text>
              </View>
              <View style={styles.statBlock}>
                <Text style={styles.statNumber}>{streak.currentStreak}</Text>
                <Text style={styles.statLabel}>Current{'\n'}Streak</Text>
              </View>
              <View style={styles.statBlock}>
                <Text style={styles.statNumber}>{streak.longestStreak}</Text>
                <Text style={styles.statLabel}>Longest{'\n'}Streak</Text>
              </View>
              <View style={styles.statBlock}>
                <Text style={styles.statNumber}>{uniqueSaintsCount}</Text>
                <Text style={styles.statLabel}>Saints{'\n'}Met</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <IconChart size={48} color={Colors.sage} />
            <Text style={styles.emptyText}>
              Complete your first challenge to start building your Virtue Portfolio.
            </Text>
          </View>
        )}
      </Animated.View>

      {/* Challenge History */}
      <Animated.View entering={FadeInDown.delay(300).duration(500)} style={styles.historySection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>CHALLENGE HISTORY</Text>
          {completions.length > 0 && (
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>{completions.length}</Text>
            </View>
          )}
        </View>

        {completions.length > 0 ? (
          completions.slice(0, 20).map((completion, index) => (
            <Animated.View
              key={completion.id}
              entering={FadeInDown.delay(400 + index * 50).duration(300)}
              style={styles.historyCard}
            >
              <Text style={styles.historyDate}>
                {format(new Date(completion.completedAt), 'MMM d, yyyy')}
              </Text>
              <Text style={styles.historyAction}>{completion.actionText}</Text>
              <Text style={styles.historySaint}>
                Inspired by {completion.saintName}
              </Text>
            </Animated.View>
          ))
        ) : (
          <View style={styles.emptyCard}>
            <IconChart size={48} color={Colors.sage} />
            <Text style={styles.emptyText}>
              Your challenge history will appear here after you complete your first challenge.
            </Text>
          </View>
        )}
      </Animated.View>

      {/* Export PDF */}
      <Animated.View entering={FadeInDown.delay(500).duration(500)}>
        <TouchableOpacity
          style={[styles.exportButton, isExporting && styles.exportButtonDisabled]}
          onPress={handleExport}
          activeOpacity={0.85}
          disabled={isExporting}
          accessibilityRole="button"
          accessibilityLabel="Export portfolio as PDF"
        >
          <Text style={styles.exportButtonText}>
            {isExporting ? 'Exporting...' : 'Export Portfolio as PDF'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  contentContainer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: 60,
    paddingBottom: 120,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.h1,
    color: Colors.charcoal,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    marginTop: 4,
  },

  // Section headers
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    ...Typography.label,
    color: Colors.charcoalMuted,
    marginBottom: Spacing.sm,
  },
  sectionSubtitle: {
    ...Typography.bodySmall,
    color: Colors.charcoalSubtle,
    marginBottom: Spacing.sm,
  },

  // Saints Collection
  saintsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  saintCard: {
    width: '30%',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    alignItems: 'center',
    ...Shadows.card,
  },
  saintCardDimmed: {
    backgroundColor: Colors.creamDark,
    opacity: 0.35,
    shadowOpacity: 0,
    elevation: 0,
  },
  saintInitials: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.sageMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xs,
  },
  saintInitialsDimmed: {
    backgroundColor: Colors.creamWarm,
  },
  saintInitialsText: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 16,
    color: Colors.sage,
  },
  saintInitialsTextDimmed: {
    color: Colors.charcoalSubtle,
  },
  saintName: {
    ...Typography.caption,
    color: Colors.charcoal,
    textAlign: 'center',
    fontFamily: FontFamily.sansMedium,
  },
  saintNameDimmed: {
    color: Colors.charcoalSubtle,
  },
  saintCountBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: Colors.terracotta,
    borderRadius: BorderRadius.round,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  saintCountText: {
    fontFamily: FontFamily.sansBold,
    fontSize: 11,
    color: Colors.white,
  },

  // Journey Stats
  statsCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    ...Shadows.card,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statBlock: {
    width: '50%',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  statNumber: {
    ...Typography.statNumber,
    color: Colors.sage,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.charcoalMuted,
    textAlign: 'center',
    marginTop: 4,
  },

  // Challenge History
  historySection: {
    marginBottom: Spacing.lg,
  },
  countBadge: {
    backgroundColor: Colors.sageMuted,
    borderRadius: BorderRadius.round,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: Spacing.sm,
  },
  countBadgeText: {
    fontFamily: FontFamily.sansSemiBold,
    fontSize: 12,
    color: Colors.sage,
  },
  historyCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.card,
  },
  historyDate: {
    ...Typography.caption,
    color: Colors.charcoalSubtle,
    marginBottom: 4,
  },
  historyAction: {
    ...Typography.body,
    color: Colors.charcoalLight,
    lineHeight: 22,
  },
  historySaint: {
    ...Typography.bodySmall,
    color: Colors.sage,
    marginTop: Spacing.xs,
    fontFamily: FontFamily.sansMedium,
  },

  // Empty states
  emptyCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.xl,
    ...Shadows.card,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    textAlign: 'center',
    marginTop: Spacing.md,
  },

  // Export
  exportButton: {
    width: '100%',
    paddingVertical: 18,
    backgroundColor: Colors.sage,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    ...Shadows.button,
  },
  exportButtonDisabled: {
    opacity: 0.6,
  },
  exportButtonText: {
    ...Typography.button,
    color: Colors.white,
  },
});
