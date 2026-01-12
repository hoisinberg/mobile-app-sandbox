import { useState } from "react";
import { View, Text, Pressable, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { Avatar, Button } from "@/components/ui";
import { checkServerHealth } from "@/services/grpc";

export default function SettingsScreen() {
  const [healthStatus, setHealthStatus] = useState<"idle" | "checking" | "healthy" | "unhealthy">("idle");

  const handleLogout = () => {
    // TODO: Implement logout
    router.replace("/(auth)/login");
  };

  const handleHealthCheck = async () => {
    setHealthStatus("checking");
    const isHealthy = await checkServerHealth();
    setHealthStatus(isHealthy ? "healthy" : "unhealthy");
  };

  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white mt-4">
        <Pressable className="flex-row items-center p-4 border-b border-gray-100">
          <View className="mr-3">
            <Avatar name="User Name" size="lg" />
          </View>
          <View>
            <Text className="font-semibold text-gray-900">User Name</Text>
            <Text className="text-gray-500 text-sm">user@example.com</Text>
          </View>
        </Pressable>
      </View>

      <View className="bg-white mt-4">
        <Pressable className="p-4 border-b border-gray-100 active:bg-gray-50">
          <Text className="text-gray-900">Notifications</Text>
        </Pressable>
        <Pressable className="p-4 border-b border-gray-100 active:bg-gray-50">
          <Text className="text-gray-900">Privacy</Text>
        </Pressable>
        <Pressable className="p-4 active:bg-gray-50">
          <Text className="text-gray-900">About</Text>
        </Pressable>
      </View>

      {/* Server Health Check */}
      <View className="bg-white mt-4">
        <Pressable
          className="p-4 flex-row items-center justify-between active:bg-gray-50"
          onPress={handleHealthCheck}
          disabled={healthStatus === "checking"}
        >
          <Text className="text-gray-900">Server Status</Text>
          {healthStatus === "idle" && (
            <Text className="text-gray-400">Tap to check</Text>
          )}
          {healthStatus === "checking" && (
            <ActivityIndicator size="small" color="#3b82f6" />
          )}
          {healthStatus === "healthy" && (
            <Text className="text-green-500">Connected</Text>
          )}
          {healthStatus === "unhealthy" && (
            <Text className="text-red-500">Disconnected</Text>
          )}
        </Pressable>
      </View>

      <View className="mt-4 px-4">
        <Button variant="danger" fullWidth onPress={handleLogout}>
          Sign Out
        </Button>
      </View>
    </View>
  );
}
