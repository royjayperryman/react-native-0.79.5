import React, { useCallback, useMemo, useRef } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { BottomSheetModal, BottomSheetBackdrop, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type BottomSheetScreenProps = {
    children: React.ReactNode;
    snapPoints?: (string | number)[];
};

export default function BottomSheetScreen({ children, snapPoints = ['50%'] }: BottomSheetScreenProps) {
    const sheetRef = useRef<BottomSheetModal>(null);
    const navigation = useNavigation();

    // open when screen is focused
    useFocusEffect(
        useCallback(() => {
            sheetRef.current?.present();
        }, [])
    );

    // close handler → dismiss + go back
    const handleDismiss = useCallback(() => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    }, [navigation]);

    const renderBackdrop = useCallback(
        (props: any) => <BottomSheetBackdrop opacity={0.75} {...props} disappearsOnIndex={-1} appearsOnIndex={0} />,
        []
    );

    const insets = useSafeAreaInsets();

    return (
        <BottomSheetModal
            ref={sheetRef}
            enableDynamicSizing={false}
            snapPoints={['100%']}
            enablePanDownToClose={true}
            topInset={insets.top + 16}
            backdropComponent={renderBackdrop}
            onDismiss={handleDismiss}
        >
            <BottomSheetScrollView style={{ flex: 1 }}>
                <Button title='Close' onPress={handleDismiss} />

            </BottomSheetScrollView>
        </BottomSheetModal>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flex: 1, padding: 16 },
});