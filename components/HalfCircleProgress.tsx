import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Svg, {Path, G} from 'react-native-svg';

const HALF_CIRCLE_RADIUS = 100;

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 180) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const describeArc = (x, y, radius, startAngle, endAngle) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  const d = [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(' ');

  return d;
};

export const HalfCircleProgress = ({percentage = 50}) => {
  const radius = HALF_CIRCLE_RADIUS;
  const center = radius;
  const strokeWidth = 20;

  const angle = (percentage / 100) * 180;

  return (
    <View style={styles.container}>
      <Svg width={radius * 2} height={radius + strokeWidth}>
        <G rotation="180" origin={`${center}, ${center}`}>
          {/* Background Arc */}
          <Path
            d={describeArc(center, center, radius, 0, 180)}
            stroke="#e0e0e0"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
          />
          {/* Foreground Arc based on percentage */}
          <Path
            d={describeArc(center, center, radius, 0, angle)}
            stroke="#00bfff"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <Text style={styles.label}>{percentage}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 40,
  },
  label: {
    position: 'absolute',
    top: 40,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
