import { View, Text, SafeAreaView, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomBtn from "@/components/CustomBtn";
import { Link } from "expo-router";
import OAuth from "@/components/OAuth";

export default function signUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignUpPress = async () => {};

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
            value={form.name}
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
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text>Already have an account? </Text>
            <Text className="text-primary-500">Log In</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}
