import { View, Text, Image } from "react-native";
import type { ImageSourcePropType } from "react-native";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

interface AvatarProps {
  source?: ImageSourcePropType | string;
  name?: string;
  size?: AvatarSize;
  showOnlineStatus?: boolean;
  isOnline?: boolean;
}

const sizeStyles: Record<AvatarSize, { container: string; text: string; status: string }> = {
  xs: {
    container: "w-6 h-6",
    text: "text-xs",
    status: "w-2 h-2 border",
  },
  sm: {
    container: "w-8 h-8",
    text: "text-sm",
    status: "w-2.5 h-2.5 border",
  },
  md: {
    container: "w-10 h-10",
    text: "text-base",
    status: "w-3 h-3 border-2",
  },
  lg: {
    container: "w-12 h-12",
    text: "text-lg",
    status: "w-3.5 h-3.5 border-2",
  },
  xl: {
    container: "w-16 h-16",
    text: "text-2xl",
    status: "w-4 h-4 border-2",
  },
};

const colors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-teal-500",
  "bg-indigo-500",
  "bg-red-500",
];

function getColorFromName(name: string): string {
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function Avatar({
  source,
  name = "",
  size = "md",
  showOnlineStatus = false,
  isOnline = false,
}: AvatarProps) {
  const sizeStyle = sizeStyles[size];
  const hasImage = source !== undefined;
  const backgroundColor = getColorFromName(name);
  const initials = getInitials(name);

  return (
    <View className="relative">
      {hasImage ? (
        <Image
          source={typeof source === "string" ? { uri: source } : source}
          className={`${sizeStyle.container} rounded-full`}
          resizeMode="cover"
        />
      ) : (
        <View
          className={`${sizeStyle.container} ${backgroundColor} rounded-full items-center justify-center`}
        >
          <Text className={`${sizeStyle.text} font-semibold text-white`}>
            {initials}
          </Text>
        </View>
      )}

      {showOnlineStatus && (
        <View
          className={`
            absolute bottom-0 right-0
            ${sizeStyle.status}
            rounded-full border-white
            ${isOnline ? "bg-green-500" : "bg-gray-400"}
          `}
        />
      )}
    </View>
  );
}
