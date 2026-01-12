import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";

export default function LoginScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      <Text className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</Text>
      <Text className="text-gray-500 mb-8">Sign in to continue</Text>

      {/* TODO: Add login form */}
      <View className="w-full space-y-4 mb-6">
        <View className="h-12 bg-gray-100 rounded-lg" />
        <View className="h-12 bg-gray-100 rounded-lg" />
      </View>

      <Pressable className="w-full h-12 bg-blue-500 rounded-lg items-center justify-center mb-4">
        <Text className="text-white font-semibold text-lg">Sign In</Text>
      </Pressable>

      <Link href="/(auth)/register" asChild>
        <Pressable>
          <Text className="text-blue-500">
            Don't have an account? <Text className="font-semibold">Sign Up</Text>
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}
