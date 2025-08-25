/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { FlatList, GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import React, { useCallback, useRef } from 'react';
import type { PropsWithChildren } from 'react';
import { Button, Dimensions, StyleSheet, Text, useColorScheme, View } from 'react-native';

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
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import { ColorCard } from './components/ColorCard';
import { GradientCard } from './components/GradientCard';
import { HalfCircleProgress } from './components/HalfCircleProgress';
import CarouselCustom from './components/CarouselCustom';
import VerticalPagingCard from './components/CarouselCustom';
import MyTestSheet from './components/MyTestSheet';
import ZillowMapScreen from './components/MapsScreen';

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
          <ScrollView>
            <View style={{ gap: 8 }}>
              <ColorCard />
              <GradientCard />
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