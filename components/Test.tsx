import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';

const RainbowProgress = ({ currentProgress, maxProgress, size = 200, strokeWidth = 20 }) => {
    // Default size, we use 'size' prop for dynamic resizing
    const radius = size / 2 - strokeWidth; // Calculate radius based on size
    const progressPercentage = (currentProgress / maxProgress) * 100;

    // Calculate the full arc length (half circle)
    const arcLength = Math.PI * radius; // Circumference of the half-circle

    // Calculate how much of the arc should be filled based on the progress
    const progressDashArray = (progressPercentage / 100) * arcLength;

    // Dynamic SVG dimensions based on the size prop and strokeWidth
    const svgWidth = size; // Width of the SVG container
    const svgHeight = size; // Height of the SVG container

    // Arc path for a half-circle (from left to right on the bottom)
    const arcPath = `M ${strokeWidth},${svgHeight - strokeWidth} A ${radius} ${radius} 0 0,1 ${svgWidth - strokeWidth},${svgHeight - strokeWidth}`;

    // Outer border arc (to create the rainbow effect)
    const borderArcPath = `M ${strokeWidth - 2},${(svgHeight + 2) - strokeWidth} A ${radius} ${radius} 0 0,1 ${(svgWidth + 2) - strokeWidth},${(svgHeight - 2) - strokeWidth}`;

    return (
        <View style={[styles.container, { width: size, height: size }]}>
            {/* SVG Arc with progress */}
            <Svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                {/* Outer Border (complete border around the arc) */}
                <Path
                    d={borderArcPath}
                    fill="none"
                    stroke="rgb(100, 100, 255)" // Border color (can be adjusted)
                    strokeWidth={20} // Border thickness around the arc
                    strokeLinecap="round"
                />
                {/* Background Arc */}
                <Path
                    d={arcPath}
                    fill="none"
                    stroke="#ddd" // Light gray for the background arc
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />
                {/* Progress Arc */}
                <Path
                    d={arcPath}
                    fill="none"
                    stroke="rgb(255, 100, 150)" // Progress arc color (can be adjusted)
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${progressDashArray} ${arcLength}`} // Creates the progress effect
                    strokeLinecap="round"
                />
            </Svg>

            {/* Icon and Text in the Middle */}
            <View style={styles.centerContent}>
                <MaterialIcons name="accessibility" size={40} color="black" />
                <Text style={styles.progressText}>
                    {currentProgress} / {maxProgress}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        position: 'relative',
    },
    centerContent: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressText: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default RainbowProgress;
