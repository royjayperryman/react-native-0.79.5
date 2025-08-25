// MyTestSheet.tsx
import React from 'react';
import { Text, Button } from 'react-native';
import BottomSheetScreen from './BottomSheetScreen';

export default function MyTestSheet() {
    return (
        <BottomSheetScreen snapPoints={['50%']}>
            <Text style={{ fontSize: 18, marginBottom: 12 }}>This is My Test Sheet 🎉</Text>
        </BottomSheetScreen>
    );
}