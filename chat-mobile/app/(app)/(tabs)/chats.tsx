import { View, Text, FlatList, Pressable } from "react-native";

const PLACEHOLDER_CHATS = [
  { id: "1", name: "Alice", lastMessage: "Hey, how are you?", time: "2m" },
  { id: "2", name: "Bob", lastMessage: "See you tomorrow!", time: "1h" },
  { id: "3", name: "Team Chat", lastMessage: "Meeting at 3pm", time: "3h" },
];

export default function ChatsScreen() {
  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={PLACEHOLDER_CHATS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable className="flex-row items-center p-4 border-b border-gray-100">
            <View className="w-12 h-12 rounded-full bg-blue-100 items-center justify-center mr-3">
              <Text className="text-blue-600 font-semibold text-lg">
                {item.name[0]}
              </Text>
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
