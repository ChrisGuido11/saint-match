import React from 'react';
import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../../constants/colors';
import { FontFamily } from '../../../constants/typography';
import {
  IconNavHome,
  IconNavCalendar,
  IconNavPortfolio,
  IconNavSettings,
} from '../../../components/icons';

type TabName = 'Home' | 'Calendar' | 'Portfolio' | 'Settings';

function TabIcon({ name, focused }: { name: TabName; focused: boolean }) {
  const color = focused ? Colors.terracotta : Colors.charcoalMuted;

  const renderIcon = () => {
    switch (name) {
      case 'Home':
        return <IconNavHome size={22} color={color} />;
      case 'Calendar':
        return <IconNavCalendar size={22} color={color} />;
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
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ focused }) => <TabIcon name="Calendar" focused={focused} />,
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
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.creamDark,
    height: 88,
    paddingTop: 8,
    paddingBottom: 24,
    elevation: 0,
    shadowOpacity: 0,
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
    backgroundColor: Colors.sageMuted,
  },
});
