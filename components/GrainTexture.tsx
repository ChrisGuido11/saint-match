import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Filter, FeTurbulence, FeComposite, Rect } from 'react-native-svg';

// Subtle grain overlay using SVG noise
export function GrainTexture({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <View style={[StyleSheet.absoluteFill, { opacity }]} pointerEvents="none">
      <Svg width="100%" height="100%">
        <Filter id="grain">
          <FeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
          <FeComposite operator="in" in2="SourceGraphic" />
        </Filter>
        <Rect width="100%" height="100%" filter="url(#grain)" fill="#8B7355" />
      </Svg>
    </View>
  );
}

// Simple noise dots pattern fallback (works everywhere)
export function GrainDots({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <View style={[StyleSheet.absoluteFill, { opacity }]} pointerEvents="none">
      {Array.from({ length: 80 }).map((_, i) => (
        <View
          key={i}
          style={{
            position: 'absolute',
            width: 1,
            height: 1,
            borderRadius: 0.5,
            backgroundColor: '#8B7355',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </View>
  );
}
