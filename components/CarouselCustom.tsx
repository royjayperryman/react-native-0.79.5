import React, { useRef, useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { runOnJS } from "react-native-reanimated";

interface CardProps {
  cardWidth: number;
  cardHeight: number;
  data?: { title: string; value: string }[];
}

const DEFAULT_DATA = [
  { title: "Steps", value: "8,542" },
  { title: "Avg BPM", value: "72" },
  { title: "Calories", value: "320 kcal" },
  { title: "Sleep", value: "7h 15m" },
];

export default function VerticalPagingCard({
  cardWidth,
  cardHeight,
  data = DEFAULT_DATA,
}: CardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const listRef = useRef<FlatList>(null);

  // auto paginate every 3s
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     let nextIndex = (currentIndex + 1) % data.length;
  //     listRef.current?.scrollToIndex({ index: nextIndex, animated: true });
  //     setCurrentIndex(nextIndex);
  //   }, 5000);
  //   return () => clearInterval(timer);
  // }, [currentIndex, data.length]);

  // inside useAnimatedScrollHandler
  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      const index = Math.round(e.contentOffset.y / cardHeight);
      if (index !== currentIndex) {
        runOnJS(setCurrentIndex)(index);
      }
    },
  });

  const renderItem = ({ item }: { item: { title: string; value: string } }) => (
    <View style={[styles.page, { height: cardHeight, width: cardWidth }]}>
      <Text style={styles.metricTitle}>{item.title}</Text>
      <Text style={styles.metricValue}>{item.value}</Text>
    </View>
  );

  return (
    <View style={[styles.card, { width: cardWidth, height: cardHeight }]}>
      <Animated.FlatList
        ref={listRef}
        data={data}
        nestedScrollEnabled
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />

      {/* Pagination dots aligned right */}
      <View style={styles.pagination}>
        {data.map((_, i) => {
          const animatedDot = useAnimatedStyle(() => {
            const active = currentIndex === i;
            return {
              width: withTiming(active ? 10 : 6),
              height: withTiming(active ? 10 : 6),
              backgroundColor: active ? "#4CAF50" : "#ccc",
            };
          });
          return <Animated.View key={i} style={[styles.dot, animatedDot]} />;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    overflow: "hidden",
    flexDirection: "row",
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  metricTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  metricValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111",
    marginTop: 6,
  },
  pagination: {
    position: "absolute",
    right: 8,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    borderRadius: 50,
  },
});
