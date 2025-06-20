import { MapView } from '@/components';
import {
  MapProvider,
  TripProvider,
  getThemeProperty,
  useThemeColor,
} from '@/hooks';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { Slot, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { Animated, Platform, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const background = useThemeColor('background');
  const activeTint = useThemeColor('activeTint');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pathName = usePathname();

  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (Platform.OS === 'android') {
    NavigationBar.setBackgroundColorAsync(background);
  }

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [pathName]);

  if (!loaded) {
    return null;
  }

  return (
    <MapProvider>
      <TripProvider>
        <GestureHandlerRootView style={styles.container}>
          <MapView />

          <BottomSheet
            snapPoints={['20%', '50%', '90%']}
            enableDynamicSizing={false}
            backgroundStyle={[
              styles.viewContainer,
              { backgroundColor: background },
            ]}
            handleStyle={{
              backgroundColor: background + '92',
              position: 'absolute',
              width: '100%',
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
            }}
            handleIndicatorStyle={{
              backgroundColor: activeTint,
            }}
          >
            <BottomSheetScrollView style={styles.viewContainer}>
              <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
                <Slot />
              </Animated.View>
            </BottomSheetScrollView>
          </BottomSheet>
          <StatusBar style="auto" />
        </GestureHandlerRootView>
      </TripProvider>
    </MapProvider>
  );
}

const borderRadius = getThemeProperty('borderRadius');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    borderTopLeftRadius: borderRadius * 3,
    borderTopRightRadius: borderRadius * 3,
  },
});
