/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import React, { useCallback, useRef } from 'react';
import { Button, Dimensions, StyleSheet, View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  NavigationContainer,
  useNavigation,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { ColorCard } from './components/ColorCard';
import { GradientCard } from './components/GradientCard';
import VerticalPagingCard from './components/CarouselCustom';
import MyTestSheet from './components/MyTestSheet';
import ZillowMapScreen from './components/MapsScreen';
import RainbowProgress from './components/Test';
import SegmentedTracker from './components/SegmentedTracker';
import CurvedNextSegmentTracker from './components/CurvedNextSegmentTracker';
import { useTheme } from 'react-native-paper';
import TwoSegmentBar from './components/TwoSegmentBar';

const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator({
  screens: {},
});

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 24;
const CARD_HEIGHT = 180;

const CARDS = Array.from({ length: 6 }, (_, i) => i);

function HomeStack() {
  const navigation = useNavigation();
  return (<Stack.Navigator initialRouteName='Test'>
    <Stack.Screen name={'Test'} component={() => <View>

      <RainbowProgress currentProgress={9000} maxProgress={10000} />
      <Button title="Open Test Sheet" onPress={() => navigation.navigate('MyTestSheet')} /></View>} />
  </Stack.Navigator>)
}

function MyTabs() {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const theme = useTheme();

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
      />
      <Tab.Screen
        name="Profile"
        options={{ headerShown: false }}
        component={() => (
          <ScrollView style={{ backgroundColor: theme.colors.background }}>
            <View style={{ gap: 8 }}>
              <ColorCard />
              <GradientCard />
              <View style={{ margin: 16, gap: 16 }}>
                <SegmentedTracker maxSegments={10} currentValue={3} />
                <CurvedNextSegmentTracker maxSegments={10} currentValue={10} />
                <TwoSegmentBar min={150} max={200} />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.cardContainer}>
                  <VerticalPagingCard cardWidth={CARD_WIDTH} cardHeight={CARD_HEIGHT} />
                </View>
                <View style={styles.cardContainer}>
                  <VerticalPagingCard cardWidth={CARD_WIDTH} cardHeight={CARD_HEIGHT} />
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      />
      <Tab.Screen
        name="Test"
        component={ZillowMapScreen}
      />
    </Tab.Navigator>
  );
}

function MainDrawer() {
  return (
    <Drawer.Navigator initialRouteName="BottomNavigation" screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="BottomNavigation" component={MyTabs} />
    </Drawer.Navigator>
  )
}

function App(): React.JSX.Element {
  const navigationRef = useNavigationContainerRef(); // You can also use a regular ref with `React.useRef()`
  const safePadding = '5%';

  return (
    <GestureHandlerRootView>
      <NavigationContainer ref={navigationRef}>
        <BottomSheetModalProvider>
          <Stack.Navigator initialRouteName='MainDrawer' screenOptions={{ headerShown: false }}>
            <Stack.Group screenOptions={{ presentation: 'containedTransparentModal', headerShown: false }}>
              <Stack.Screen name={'MyTestSheet'} component={MyTestSheet} />
            </Stack.Group>
            <Stack.Screen name='MainDrawer' component={MainDrawer} />
          </Stack.Navigator>
        </BottomSheetModalProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;

const styles = StyleSheet.create({
  grid: {
    padding: 12,
  },
  cardContainer: {
    margin: 6,
  },
});