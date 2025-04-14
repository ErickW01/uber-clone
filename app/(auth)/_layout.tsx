import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";

export default function Layout () {

    SplashScreen.preventAutoHideAsync();

  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />

    </Stack>
  );
}
