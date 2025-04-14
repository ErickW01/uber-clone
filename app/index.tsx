import { Redirect } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";

export default function Index() {
  return (
    <Redirect href='/(auth)/welcome' />
  );
}
