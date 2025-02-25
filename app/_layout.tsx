import 'react-native-reanimated';
import AppNavigator from '../src/navigation/stackNavigator'
import { NativeBaseProvider } from 'native-base';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../src/assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <NativeBaseProvider>
      <AppNavigator />
    </NativeBaseProvider>


  );
}
