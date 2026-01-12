import { View, Text, FlatList, Pressable } from "react-native";
import { Avatar } from "@/components/ui";

const PLACEHOLDER_CHATS = [
  { id: "1", name: "Alice", lastMessage: "Hey, how are you?", time: "2m", isOnline: true },
  { id: "2", name: "Bob", lastMessage: "See you tomorrow!", time: "1h", isOnline: false },
  { id: "3", name: "Team Chat", lastMessage: "Meeting at 3pm", time: "3h", isOnline: true },
];

export default function ChatsScreen() {
  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={PLACEHOLDER_CHATS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable className="flex-row items-center p-4 border-b border-gray-100 active:bg-gray-50">
            <View className="mr-3">
              <Avatar
                name={item.name}
                size="lg"
                showOnlineStatus
                isOnline={item.isOnline}
              />
            </View>
            <View className="flex-1">
              <View className="flex-row justify-between items-center">
                <Text className="font-semibold text-gray-900">{item.name}</Text>
                <Text className="text-xs text-gray-400">{item.time}</Text>
              </View>
              <Text className="text-gray-500 text-sm" numberOfLines={1}>
                {item.lastMessage}
              </Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center p-8">
            <Text className="text-gray-400">No conversations yet</Text>
          </View>
        }
      />
    </View>
  );
}
