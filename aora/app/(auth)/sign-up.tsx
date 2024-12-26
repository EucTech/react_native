import { Alert, Image, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "@/lib/appwrite";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if(!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all the fields");
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username)

      // set to global state

      router.replace('/home')

    } catch (error:any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
   
  }
  
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView  >
        <View className="w-full flex justify-center min-h-[85vh] px-4 my-6 " >
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px] "
          />
          <Text className="text-2xl text-white text-semibold  mt-10 font-psemibold">
            Sign up to Aora
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e: any) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            placeholder="Username"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: any) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyBoardType="email-address"
            placeholder="Enter your email"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: any) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            placeholder="Enter your password"
          />
          
          <CustomButton 
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className=" justify-center pt-5 flex-row gap-2">
            <Text className=" text-lg text-gray-100 font-pregular">Have an account already?</Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary" >Sign in</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

