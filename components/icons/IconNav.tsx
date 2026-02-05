import React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { Colors } from '../../constants/colors';

interface IconProps {
  size?: number;
  color?: string;
  filled?: boolean;
}

// Home icon - representing hearth/home
export function IconNavHome({ size = 24, color = Colors.sage, filled = false }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 10L12 4L20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={filled ? color : 'none'}
        opacity={filled ? 0.2 : 1}
      />
      <Path
        d="M9 21V12H15V21"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// Calendar icon
export function IconNavCalendar({ size = 24, color = Colors.sage, filled = false }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
        fill={filled ? color : 'none'}
        opacity={filled ? 0.2 : 1}
      />
      <Path
        d="M16 3V7M8 3V7M3 11H21"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Circle cx="8" cy="15" r="1" fill={color} />
      <Circle cx="12" cy="15" r="1" fill={color} />
      <Circle cx="16" cy="15" r="1" fill={color} />
    </Svg>
  );
}

// Portfolio/Chart icon
export function IconNavPortfolio({ size = 24, color = Colors.sage, filled = false }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 20V10M12 20V4M6 20V14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M3 20H21"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {filled && (
        <Path
          d="M6 14L6 20H18V10L12 4L6 14Z"
          fill={color}
          opacity={0.2}
        />
      )}
    </Svg>
  );
}

// Settings icon - cross/rosary inspired
export function IconNavSettings({ size = 24, color = Colors.sage, filled = false }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx="12"
        cy="12"
        r="3"
        stroke={color}
        strokeWidth="1.5"
        fill={filled ? color : 'none'}
        opacity={filled ? 0.3 : 1}
      />
      <Path
        d="M12 3V5M12 19V21M3 12H5M19 12H21"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Path
        d="M5.6 5.6L7 7M17 17L18.4 18.4M5.6 18.4L7 17M17 7L18.4 5.6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity={0.6}
      />
    </Svg>
  );
}

// Fire/Streak icon for calendar
export function IconFire({ size = 24, color = Colors.terracotta }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3C12 3 6 8 6 13C6 17 9 20 12 20C15 20 18 17 18 13C18 8 12 3 12 3Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M12 8C12 8 9 11 9 14C9 16 10.5 17.5 12 17.5C13.5 17.5 15 16 15 14C15 11 12 8 12 8Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={0.6}
      />
    </Svg>
  );
}

// Trophy icon for achievements
export function IconTrophy({ size = 24, color = Colors.terracotta }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 21H16M12 17V21M7 4H17V8C17 11.3137 14.7614 14 12 14C9.23858 14 7 11.3137 7 8V4Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M7 6H4V8C4 10 5.5 11.5 7 12"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17 6H20V8C20 10 18.5 11.5 17 12"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// Checkmark circle for completed
export function IconCheckCircle({ size = 24, color = Colors.sage }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx="12"
        cy="12"
        r="9"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <Path
        d="M8 12L11 15L16 9"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// Chart/Graph icon for portfolio empty state
export function IconChart({ size = 48, color = Colors.sage }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <Rect
        x="6"
        y="6"
        width="36"
        height="36"
        rx="4"
        stroke={color}
        strokeWidth="2"
        fill="none"
        opacity={0.3}
      />
      <Path
        d="M12 36L20 24L28 30L36 14"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 40H42"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M40 6V42"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

// Lock icon for pro features
export function IconLock({ size = 16, color = Colors.charcoalMuted }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="5"
        y="11"
        width="14"
        height="10"
        rx="2"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      <Path
        d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Circle cx="12" cy="16" r="1.5" fill={color} />
    </Svg>
  );
}

// Chevron left/right for navigation
export function IconChevronLeft({ size = 24, color = Colors.charcoal }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 18L9 12L15 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function IconChevronRight({ size = 24, color = Colors.charcoal }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 18L15 12L9 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// Chevron for settings rows
export function IconChevron({ size = 20, color = Colors.charcoalSubtle }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 18L15 12L9 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
