/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useCallback, useRef } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator({
  screens: {
  },
});


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
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen name="Home" component={() => <View>          <Button
        onPress={handlePresentModalPress}
        title="Present Modal"
        color="black"
      />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          onChange={handleSheetChanges}
        >
          <BottomSheetView style={{
            flex: 1, padding: 24,
            justifyContent: 'center',
            backgroundColor: 'grey',
          }}>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheetModal></View>} />
      <Tab.Screen name="Profile" component={() => <View></View>} />
    </Tab.Navigator>
  );
}

function App(): React.JSX.Element {
  const navigationRef = useNavigationContainerRef(); // You can also use a regular ref with `React.useRef()`
  const safePadding = '5%';

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <View style={{ flex: 1, paddingTop: safePadding, paddingBottom: safePadding }}>
          <NavigationContainer ref={navigationRef}>
            <Drawer.Navigator initialRouteName="BottomNavigation">
              <Drawer.Screen name="BottomNavigation" component={MyTabs} />
            </Drawer.Navigator>
          </NavigationContainer>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export default App;
