import React from "react";
import { View, StyleSheet } from "react-native";

interface SegmentedTrackerProps {
  maxSegments: number;      // total segments
  currentValue: number;     // how many filled
  gap?: number;             // spacing between segments
  filledColor?: string;
  emptyColor?: string;
  height?: number;
  borderRadius?: number;
}

const SegmentedTracker: React.FC<SegmentedTrackerProps> = ({
  maxSegments,
  currentValue,
  gap = 4,
  filledColor = "#4CAF50",
  emptyColor = "#E0E0E0",
  height = 16,
  borderRadius = 8,
}) => {
  return (
    <View style={[styles.container, { height, borderRadius }]}>
      {Array.from({ length: maxSegments }).map((_, i) => {
        const isFilled = i < currentValue;
        return (
          <View
            key={i}
            style={[
              styles.segment,
              {
                flex: 1,
                marginRight: i === maxSegments - 1 ? 0 : gap,
                backgroundColor: isFilled ? filledColor : emptyColor,
                borderRadius: borderRadius, // keeps edges round
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    overflow: "hidden",
  },
  segment: {
    height: "100%",
  },
});

export default SegmentedTracker;
