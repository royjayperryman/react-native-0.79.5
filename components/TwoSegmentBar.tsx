import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useTheme } from "react-native-paper";

type TwoSegmentBar = {
  min: number;
  max: number;
  gap?: number;
  filledColor?: string;
  emptyColor?: string;
  height?: number;
  curveSize?: number; // diameter of the curve bite (defaults to height)
  borderRadius?: number; // rounding for outermost edges
};

export default function TwoSegmentBar({
  min,
  max,
  gap = 0,
  filledColor = "#4CAF50",
  emptyColor = "grey",
  height = 16,
  curveSize,
  borderRadius,
}: TwoSegmentBar) {
  const diameter = curveSize ?? height;
  const radius = borderRadius ?? height / 2;
  const theme = useTheme();
  const firstPercentage = min / max;
  const remainingPercentage = 1 - firstPercentage;

  return (
    <View style={[styles.row, { height }]}>
      {Array.from({ length: 2 }).map((_, i) => {
        const isFilled = i < max;
        const isFirst = i === 0;
        const isLast = i === 2 - 1;
        const bg = isFilled ? filledColor : emptyColor;

        return (
          <View
            key={i}
            style={[
              styles.segment,
              {
                flex: i === 0 ? firstPercentage : remainingPercentage,
                marginRight: isLast ? 0 : gap,
                backgroundColor: bg,
                borderTopLeftRadius: isFirst ? radius : 0,
                borderBottomLeftRadius: isFirst ? radius : 0,
                borderTopRightRadius: radius,
                borderBottomRightRadius: radius,
              },
            ]}
          >
            {/* inward curve mask on the LEFT edge of every segment except first */}
            {!isFirst && (
              <View
                style={[
                  styles.inwardCurve,
                  {
                    width: diameter,
                    height: diameter,
                    borderRadius: diameter / 2,
                    backgroundColor: theme.colors.background, // 👈 match screen background
                    left: -(diameter / 2) + gap / 2,
                    top: (height - diameter) / 2,
                  },
                ]}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    overflow: "visible",
  },
  segment: {
    position: "relative",
    height: "100%",
    overflow: "hidden",
  },
  inwardCurve: {
    position: "absolute",
  },
});
