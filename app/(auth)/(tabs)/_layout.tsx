import React from 'react';
import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../../constants/colors';
import { FontFamily } from '../../../constants/typography';
import {
  IconNavHome,
  IconNavNovenas,
  IconNavPortfolio,
  IconNavSettings,
} from '../../../components/icons';

type TabName = 'Home' | 'Novenas' | 'Portfolio' | 'Settings';

function TabIcon({ name, focused }: { name: TabName; focused: boolean }) {
  const color = focused ? Colors.terracotta : Colors.charcoalMuted;

  const renderIcon = () => {
    switch (name) {
      case 'Home':
        return <IconNavHome size={22} color={color} />;
      case 'Novenas':
        return <IconNavNovenas size={22} color={color} />;
      case 'Portfolio':
        return <IconNavPortfolio size={22} color={color} />;
      case 'Settings':
        return <IconNavSettings size={22} color={color} />;
    }
  };

  return (
    <View style={[
      styles.tabIconContainer,
      focused && styles.tabIconContainerActive
    ]}>
      {renderIcon()}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.terracotta,
        tabBarInactiveTintColor: Colors.charcoalMuted,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon name="Home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="novenas"
        options={{
          title: 'Novenas',
          tabBarIcon: ({ focused }) => <TabIcon name="Novenas" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="portfolio"
        options={{
          title: 'Portfolio',
          tabBarIcon: ({ focused }) => <TabIcon name="Portfolio" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => <TabIcon name="Settings" focused={focused} />,
        }}
      />
      {/* Hide the old calendar tab if the file still exists */}
      <Tabs.Screen
        name="calendar"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    borderTopWidth: 0,
    height: 88,
    paddingTop: 8,
    paddingBottom: 24,
    elevation: 8,
    shadowColor: Colors.charcoal,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  tabBarLabel: {
    fontFamily: FontFamily.sansMedium,
    fontSize: 11,
    marginTop: 2,
  },
  tabBarItem: {
    gap: 2,
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 32,
    borderRadius: 16,
  },
  tabIconContainerActive: {
    backgroundColor: Colors.terracottaMuted,
  },
});
