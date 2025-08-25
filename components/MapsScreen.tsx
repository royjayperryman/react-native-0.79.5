import React, { useRef, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';
import Animated, { useAnimatedStyle, interpolate } from 'react-native-reanimated';
import { Button, Card, Icon, IconButton, MD3Colors, Searchbar } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SAMPLE_DATA = Array.from({ length: 15 }).map((_, i) => ({
    id: i.toString(),
    title: `Property #${i + 1}`,
    lat: 37.78825 + i * 0.01,
    lng: -122.4324 + i * 0.01,
}));

export default function ZillowMapScreen() {
    const sheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ['12%', '50%', '90%'], []);
    const [searchQuery, setSearchQuery] = React.useState('');
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            {/* Map behind */}
            <MapView
                style={[StyleSheet.absoluteFill, { marginBottom: 44 }]}
                onPress={() => { sheetRef.current?.snapToIndex(0) }}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5,
                }}
            >
                {SAMPLE_DATA.map(item => (
                    <Marker
                        key={item.id}
                        coordinate={{ latitude: item.lat, longitude: item.lng }}
                        title={item.title}
                    />
                ))}
            </MapView>

            {/* Bottom Sheet */}
            <BottomSheet
                ref={sheetRef}
                index={1}
                backgroundStyle={{ backgroundColor: 'transparent' }}
                enableDynamicSizing={false}
                enableOverDrag={false}
                handleComponent={() => <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent', marginBottom: 8, marginStart: 8, gap: 8 }}>
                        <View style={styles.fab}>
                            <Text>Filter</Text>
                        </View>
                        <View style={styles.fab}>
                            <Text>Sort</Text>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8, backgroundColor: 'white', borderTopEndRadius: 16, borderTopStartRadius: 16, alignItems: 'center' }}>
                        <View style={{ width: 40, backgroundColor: 'grey', borderRadius: 15, height: 4, marginBottom: 8 }} />
                        <Text>54 Results</Text>
                    </View>
                </View>}
                snapPoints={snapPoints}
            >
                <View style={{ backgroundColor: 'white' }}>
                    <FlatList
                        data={SAMPLE_DATA}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ padding: 16, gap: 8 }}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Card mode='contained' style={{ backgroundColor: 'rgba(246, 246, 246, 1)' }}>
                                <View style={{ padding: 8 }}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.title}>{item.title}</Text>
                                </View>
                            </Card>
                        )}
                    />
                </View>
            </BottomSheet>

            <View style={{ flexDirection: 'row', padding: 16, paddingTop: insets.top, backgroundColor: 'rgba(91, 118, 89, 0.9)', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => {}} style={{ paddingStart: 16, backgroundColor: 'rgba(220, 220, 220, 1)', width: '90%', height: 35, borderRadius: 16, alignItems: 'flex-start', justifyContent: 'center' }}>
                    <Text style={{ color: 'grey', fontSize: 18 }}>Search for provider</Text>
                </TouchableOpacity>
                <IconButton icon="filter"
                    iconColor={'grey'}
                    size={18}
                    style={{ backgroundColor: 'white' }}
                    onPress={() => console.log('Pressed')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    listItem: { padding: 16, borderBottomWidth: StyleSheet.hairlineWidth },
    title: { fontWeight: '600' },

    fabContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
    },
    fab: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 4,
    },
});
