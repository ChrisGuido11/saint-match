import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { format } from 'date-fns';
import { Colors } from '../../../constants/colors';
import { Typography, FontFamily } from '../../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../../constants/spacing';
import { useApp } from '../../../context/AppContext';
import { getPatienceScores } from '../../../lib/storage';
import { PatienceScore } from '../../../types';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { IconChart } from '../../../components/icons';

function SkeletonBlock({ width, height, style }: { width: number | string; height: number; style?: any }) {
  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      style={[
        {
          width,
          height,
          borderRadius: BorderRadius.sm,
          backgroundColor: Colors.creamDark,
        },
        style,
      ]}
    />
  );
}

export default function PortfolioScreen() {
  const { completions, streak } = useApp();
  const [patienceScores, setPatienceScores] = useState<PatienceScore[] | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    getPatienceScores().then(setPatienceScores);
  }, []);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const exportDate = format(new Date(), 'MMMM d, yyyy');
      const scoresHtml = (patienceScores ?? []).length > 0
        ? `<table>
            <tr><th>Week Ending</th><th>Score</th></tr>
            ${(patienceScores ?? []).map(s =>
              `<tr><td>${format(new Date(s.weekEnding), 'MMM d, yyyy')}</td><td>${s.score} / 5</td></tr>`
            ).join('')}
          </table>`
        : '<p class="empty">No patience scores recorded yet.</p>';

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
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 16px 0;
            }
            th {
              text-align: left;
              background: #8B9D83;
              color: #fff;
              padding: 8px 12px;
              font-size: 14px;
            }
            td {
              padding: 8px 12px;
              border-bottom: 1px solid #E8E4DF;
              font-size: 14px;
            }
            tr:nth-child(even) { background: #fff; }
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

          <h2>Patience Score Trend</h2>
          ${scoresHtml}

          <h2>Micro-Vocation Log (${completions.length} ${completions.length === 1 ? 'entry' : 'entries'})</h2>
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

  const handleCheckin = () => {
    router.push('/(auth)/weekly-checkin');
  };

  const isLoadingScores = patienceScores === null;
  // Chart data (last 8 scores)
  const recentScores = (patienceScores ?? []).slice(-8);
  const maxScore = 5;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <Animated.View entering={FadeIn.duration(500)} style={styles.header}>
        <View>
          <Text style={styles.title}>Virtue Portfolio</Text>
          <Text style={styles.subtitle}>Your spiritual growth at a glance</Text>
        </View>
        <TouchableOpacity onPress={handleCheckin} style={styles.checkinButton} accessibilityRole="button" accessibilityLabel="Weekly check-in">
          <Text style={styles.checkinButtonText}>Weekly Check-in</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Patience score chart */}
      <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.chartCard}>
        <Text style={styles.chartTitle}>Patience Score Trend</Text>
        {isLoadingScores ? (
          <View style={[styles.chart, { alignItems: 'flex-end', gap: Spacing.xs }]}>
            {[0.4, 0.6, 0.3, 0.7, 0.5, 0.8].map((h, i) => (
              <View key={i} style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                <SkeletonBlock width="80%" height={160 * h} style={{ borderRadius: BorderRadius.sm }} />
              </View>
            ))}
          </View>
        ) : recentScores.length > 0 ? (
          <View style={styles.chart}>
            <View style={styles.chartYAxis}>
              {[5, 4, 3, 2, 1].map((val) => (
                <Text key={val} style={styles.chartYLabel}>
                  {val}
                </Text>
              ))}
            </View>
            <View style={styles.chartBars}>
              {recentScores.map((score, index) => (
                <View key={score.id} style={styles.chartBarContainer}>
                  <View style={styles.chartBarTrack}>
                    <Animated.View
                      entering={FadeInDown.delay(200 + index * 100).duration(400)}
                      style={[
                        styles.chartBar,
                        {
                          height: `${(score.score / maxScore) * 100}%`,
                          backgroundColor:
                            score.score >= 4
                              ? Colors.sage
                              : score.score >= 3
                                ? Colors.sageLight
                                : Colors.terracotta,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.chartXLabel}>
                    {format(new Date(score.weekEnding), 'M/d')}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.emptyChart}>
            <IconChart size={64} color={Colors.sage} />
            <Text style={styles.emptyChartText}>
              Complete your first weekly check-in to see your patience trend!
            </Text>
            <TouchableOpacity onPress={handleCheckin} style={styles.emptyChartCta} accessibilityRole="button" accessibilityLabel="Rate your week">
              <Text style={styles.emptyChartCtaText}>Rate Your Week</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>

      {/* Completions log */}
      <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.logSection}>
        <View style={styles.logHeader}>
          <Text style={styles.logTitle}>Micro-Vocation Log</Text>
          {completions.length > 0 && (
            <Text style={styles.logCount}>{completions.length} entries</Text>
          )}
        </View>

        {completions.length > 0 ? (
          completions.slice(0, 20).map((completion, index) => (
            <Animated.View
              key={completion.id}
              entering={FadeInDown.delay(300 + index * 50).duration(300)}
              style={styles.logEntry}
            >
              <View style={styles.logDot} />
              <View style={styles.logContent}>
                <Text style={styles.logDate}>
                  {format(new Date(completion.completedAt), 'MMM d, yyyy')}
                </Text>
                <Text style={styles.logAction}>{completion.actionText}</Text>
                <Text style={styles.logSaint}>
                  Inspired by {completion.saintName}
                </Text>
              </View>
            </Animated.View>
          ))
        ) : (
          <View style={styles.emptyLog}>
            <IconChart size={48} color={Colors.sage} />
            <Text style={styles.emptyLogText}>
              Complete your first challenge to start building your Virtue Portfolio.
            </Text>
          </View>
        )}
      </Animated.View>

      {/* Export button */}
      <Animated.View entering={FadeInDown.delay(400).duration(500)}>
        <TouchableOpacity
          style={[styles.exportButton, isExporting && styles.exportButtonDisabled]}
          onPress={handleExport}
          activeOpacity={0.85}
          disabled={isExporting}
          accessibilityRole="button"
          accessibilityLabel="Export portfolio as PDF"
        >
          <View style={styles.exportButtonContent}>
            <Text style={styles.exportButtonText}>
              {isExporting ? 'Exporting...' : 'Export Portfolio as PDF'}
            </Text>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  checkinButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    backgroundColor: Colors.terracotta,
    borderRadius: BorderRadius.round,
    marginTop: 4,
  },
  checkinButtonText: {
    ...Typography.buttonSmall,
    color: Colors.white,
    fontSize: 12,
  },
  chartCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.card,
  },
  chartTitle: {
    ...Typography.cardTitle,
    color: Colors.charcoal,
    marginBottom: Spacing.md,
  },
  chart: {
    flexDirection: 'row',
    height: 160,
    gap: Spacing.sm,
  },
  chartYAxis: {
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  chartYLabel: {
    ...Typography.caption,
    color: Colors.charcoalSubtle,
    width: 16,
    textAlign: 'right',
  },
  chartBars: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.xs,
  },
  chartBarContainer: {
    flex: 1,
    alignItems: 'center',
  },
  chartBarTrack: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.creamDark,
    borderRadius: BorderRadius.sm,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  chartBar: {
    width: '100%',
    borderRadius: BorderRadius.sm,
    minHeight: 8,
  },
  chartXLabel: {
    ...Typography.caption,
    color: Colors.charcoalSubtle,
    marginTop: Spacing.xxs,
    fontSize: 10,
  },
  emptyChart: {
    alignItems: 'center',
    padding: Spacing.lg,
  },
  emptyChartText: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    textAlign: 'center',
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
  },
  emptyChartCta: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.sage,
    borderRadius: BorderRadius.round,
  },
  emptyChartCtaText: {
    ...Typography.buttonSmall,
    color: Colors.white,
  },
  logSection: {
    marginBottom: Spacing.lg,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  logTitle: {
    ...Typography.cardTitle,
    color: Colors.charcoal,
  },
  logCount: {
    ...Typography.bodySmall,
    color: Colors.charcoalMuted,
  },
  logEntry: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  logDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.sage,
    marginTop: 6,
  },
  logContent: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  logDate: {
    ...Typography.caption,
    color: Colors.charcoalSubtle,
    marginBottom: 4,
  },
  logAction: {
    ...Typography.body,
    color: Colors.charcoalLight,
    lineHeight: 22,
  },
  logSaint: {
    ...Typography.bodySmall,
    color: Colors.sage,
    marginTop: Spacing.xs,
    fontFamily: FontFamily.sansMedium,
  },
  emptyLog: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    alignItems: 'center',
  },
  emptyLogText: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
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
  exportButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  exportButtonText: {
    ...Typography.button,
    color: Colors.white,
  },
});
