import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

export default function Index() {
  const { isSignedIn } = useAuth();
  if (isSignedIn) {
    return <Redirect href={"/(root)/(tabs)/home"} />;
  }
  return <Redirect href="/(auth)/welcome" />;
}
//TODO: 1:37:00
