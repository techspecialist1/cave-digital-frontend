import 'react-native-reanimated';
import { Provider } from 'react-redux';
import AppNavigator from '../src/navigation/stackNavigator'
import { NativeBaseProvider } from 'native-base';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import store from '../src/redux/store'

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
    <Provider store={store}>
    <NativeBaseProvider>
      <AppNavigator />
    </NativeBaseProvider>
    </Provider>


  );
}
