import { Redirect, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useAuth } from "@clerk/clerk-expo";

export default function Layout() {
  SplashScreen.preventAutoHideAsync();

  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/"} />;
  }

  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
    </Stack>
  );
}
