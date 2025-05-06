import MapView from '@/components/MapView';
import { ThemedView } from '@/components/ui';
import {
  MapProvider,
  TripProvider,
  getThemeProperty,
  useThemeColor,
} from '@/hooks';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const background = useThemeColor('background');
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
            handleComponent={null}
            backgroundStyle={[
              styles.viewContainer,
              { backgroundColor: background },
            ]}
          >
            <ThemedView softBackground style={[styles.handleIndicator]} />
            <BottomSheetScrollView style={styles.viewContainer}>
              <Slot />
            </BottomSheetScrollView>
          </BottomSheet>
          <StatusBar style="auto" />
        </GestureHandlerRootView>
      </TripProvider>
    </MapProvider>
  );
}

const smallSpacing = getThemeProperty('smallSpacing');
const borderRadius = getThemeProperty('borderRadius');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewContainer: {
    borderTopLeftRadius: borderRadius * 3,
    borderTopRightRadius: borderRadius * 3,
  },
  handleIndicator: {
    width: 40,
    height: 4,
    zIndex: 1,
    borderRadius: borderRadius,
    position: 'absolute',
    top: smallSpacing,
    alignSelf: 'center',
  },
});
