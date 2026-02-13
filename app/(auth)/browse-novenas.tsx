import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { hapticSelection } from '@/lib/haptics';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { Typography, FontFamily } from '../../constants/typography';
import { Spacing, BorderRadius, Shadows } from '../../constants/spacing';
import { fetchNovenaCatalog, getCachedCatalog, NovenaEntry } from '../../lib/novenaCatalog';
import { resolveSaintName } from '../../lib/novenaMatch';
import { IconChevronLeft } from '../../components/icons';

type CategoryFilter = 'all' | 'saints' | 'marian' | 'holy-days' | 'intentions';

const CATEGORIES: { key: CategoryFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'saints', label: 'Saints' },
  { key: 'marian', label: 'Marian' },
  { key: 'holy-days', label: 'Holy Days' },
  { key: 'intentions', label: 'Intentions' },
];

const CATEGORY_COLORS: Record<string, string> = {
  saints: Colors.sage,
  marian: '#8BA8A0',
  'holy-days': Colors.terracotta,
  intentions: '#C49A6C',
  other: Colors.charcoalSubtle,
};

function deriveSaintName(entry: NovenaEntry): string {
  return resolveSaintName(entry);
}

function deriveSaintId(slug: string): string {
  return slug;
}

export default function BrowseNovenasScreen() {
  const [catalog, setCatalog] = useState<NovenaEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  useEffect(() => {
    let mounted = true;

    // Load cached first for instant UI
    getCachedCatalog().then((cached) => {
      if (mounted) {
        setCatalog(cached);
        setLoading(false);
      }
    });

    // Then fetch fresh data
    fetchNovenaCatalog().then((fresh) => {
      if (mounted) {
        setCatalog(fresh);
        setLoading(false);
      }
    });

    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    let items = catalog;

    if (activeCategory !== 'all') {
      items = items.filter((n) => n.category === activeCategory);
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      items = items.filter((n) => n.title.toLowerCase().includes(q));
    }

    return items;
  }, [catalog, activeCategory, search]);

  const handleSelect = useCallback((entry: NovenaEntry) => {
    hapticSelection();
    const saintName = deriveSaintName(entry);
    router.push({
      pathname: '/(auth)/start-novena',
      params: {
        saintId: deriveSaintId(entry.slug),
        saintName,
        novenaTitle: entry.title,
        novenaDescription: `Nine days of prayer: ${entry.title}`,
      },
    });
  }, []);

  const renderItem = useCallback(({ item, index }: { item: NovenaEntry; index: number }) => (
    <Animated.View entering={FadeInDown.delay(Math.min(index * 30, 300)).duration(300)}>
      <TouchableOpacity
        style={styles.novenaCard}
        onPress={() => handleSelect(item)}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel={`Start ${item.title}`}
      >
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <View style={[styles.categoryBadge, { backgroundColor: (CATEGORY_COLORS[item.category] ?? Colors.charcoalSubtle) + '18' }]}>
            <Text style={[styles.categoryBadgeText, { color: CATEGORY_COLORS[item.category] ?? Colors.charcoalSubtle }]}>
              {item.category === 'holy-days' ? 'Holy Days' : item.category.charAt(0).toUpperCase() + item.category.slice(1)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  ), [handleSelect]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <Animated.View entering={FadeIn.duration(400)} style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <IconChevronLeft size={20} color={Colors.charcoal} />
        </TouchableOpacity>
        <Text style={styles.title}>Browse Novenas</Text>
        <View style={styles.backButton} />
      </Animated.View>

      {/* Search */}
      <Animated.View entering={FadeInDown.delay(100).duration(400)} style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search novenas..."
          placeholderTextColor={Colors.charcoalSubtle}
          value={search}
          onChangeText={setSearch}
          autoCorrect={false}
          clearButtonMode="while-editing"
          accessibilityLabel="Search novenas"
        />
      </Animated.View>

      {/* Category tabs */}
      <Animated.View entering={FadeInDown.delay(150).duration(400)}>
        <FlatList
          horizontal
          data={CATEGORIES}
          keyExtractor={(item) => item.key}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryTab,
                activeCategory === item.key && styles.categoryTabActive,
              ]}
              onPress={() => {
                setActiveCategory(item.key);
                hapticSelection();
              }}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityState={{ selected: activeCategory === item.key }}
            >
              <Text
                style={[
                  styles.categoryTabText,
                  activeCategory === item.key && styles.categoryTabTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </Animated.View>

      {/* Results count */}
      <View style={styles.resultsBar}>
        <Text style={styles.resultsCount}>
          {loading ? 'Loading...' : `${filtered.length} novena${filtered.length !== 1 ? 's' : ''}`}
        </Text>
      </View>

      {/* Novena list */}
      {loading && catalog.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.sage} />
          <Text style={styles.loadingText}>Loading catalog...</Text>
        </View>
      ) : filtered.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {search.trim() ? `No novenas matching "${search}"` : 'No novenas in this category'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.slug}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          initialNumToRender={20}
          maxToRenderPerBatch={15}
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: 60,
    paddingBottom: Spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.subtle,
  },
  title: {
    ...Typography.h2,
    color: Colors.charcoal,
  },
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  searchInput: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    ...Typography.body,
    color: Colors.charcoal,
    borderWidth: 1,
    borderColor: Colors.creamDark,
  },
  categoryList: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.sm,
    gap: Spacing.xs,
  },
  categoryTab: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.creamDark,
  },
  categoryTabActive: {
    backgroundColor: Colors.sage,
    borderColor: Colors.sage,
  },
  categoryTabText: {
    ...Typography.buttonSmall,
    color: Colors.charcoalMuted,
  },
  categoryTabTextActive: {
    color: Colors.white,
  },
  resultsBar: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs,
  },
  resultsCount: {
    ...Typography.caption,
    color: Colors.charcoalSubtle,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 100,
  },
  novenaCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.xs,
    ...Shadows.subtle,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    ...Typography.body,
    color: Colors.charcoal,
    flex: 1,
    marginRight: Spacing.sm,
  },
  categoryBadge: {
    paddingVertical: 3,
    paddingHorizontal: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  categoryBadgeText: {
    fontFamily: FontFamily.sansMedium,
    fontSize: 11,
    lineHeight: 14,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl,
  },
  loadingText: {
    ...Typography.bodySmall,
    color: Colors.charcoalMuted,
    marginTop: Spacing.sm,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.xl,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.charcoalMuted,
    textAlign: 'center',
  },
});
