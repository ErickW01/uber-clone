import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomBtn from "@/components/CustomBtn";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import { isLoaded } from "expo-font";
import ReactNativeModal from "react-native-modal";

export default function signUp() {
  const { signUp, setActive } = useSignUp();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    console.log(form.email, form.password);
    try {
      await signUp?.create({
        emailAddress: form.email,
        password: form.password,
      });
      console.log("SignUp created", signUp);
      await signUp?.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({
        ...verification,
        state: "pending",
      });
      console.log("SignUp prepped");
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp?.attemptEmailAddressVerification({
        code: verification.code,
      });
      if (completeSignUp?.status === "complete") {
        await setActive!({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed.",
          state: "failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View>
          <Image source={images.signUpCar} className={"z-0 w-full h-[250px]"} />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label={"Name"}
            placeholder="Enter Your Name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value: any) =>
              setForm({
                ...form,
                name: value,
              })
            }
          />
          <InputField
            label={"Email"}
            placeholder="Enter Your Email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value: any) =>
              setForm({
                ...form,
                email: value,
              })
            }
          />
          <InputField
            label={"Password"}
            placeholder="Enter Your Password"
            icon={icons.lock}
            value={form.password}
            secureTextEntry={true}
            textContentType="password"
            onChangeText={(value: any) =>
              setForm({
                ...form,
                password: value,
              })
            }
          />
          <CustomBtn
            title={"Sign Up"}
            onPress={onSignUpPress}
            className="mt-6"
          />
          <OAuth />
          <Link
            href={"/sign-in"}
            className="text-lg text-center text-general-200 mt-4"
          >
            <Text>Already have an account? </Text>
            <Text className="text-primary-500">Log In</Text>
          </Link>
        </View>
        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            setVerification({ ...verification, state: "success" });
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-3xl font-JakartaBold text-center">
              Verification
            </Text>
            <Text className="mb-5 font-Jakarta text-center">
              We've sent a verification code to your email address.
            </Text>
            <InputField
              label="Code"
              icon={icons.lock}
              placeholder="12345"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) => {
                setVerification({ ...verification, code });
              }}
            />
            {verification.error && (
              <Text className="text-red-500 text-center mt-2">
                {verification.error}
              </Text>
            )}
            <CustomBtn
              title="Verify"
              className="mt-5 bg-success-500"
              onPress={onPressVerify}
            />
          </View>
        </ReactNativeModal>
        <ReactNativeModal isVisible={verification.state === "success"}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl font-JakartaBold text-center">
              Verified
            </Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2 mb-2">
              Your email has been verified. You can now log in to your account.
              <CustomBtn
                title="Browse Home"
                className="mt-5"
                onPress={() => router.replace("/(root)/(tabs)/home")}
              />
            </Text>
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
}
