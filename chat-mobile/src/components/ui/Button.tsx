import { Pressable, Text, ActivityIndicator } from "react-native";
import type { PressableProps } from "react-native";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<PressableProps, "children"> {
  children: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, { container: string; text: string }> = {
  primary: {
    container: "bg-blue-500 active:bg-blue-600",
    text: "text-white",
  },
  secondary: {
    container: "bg-gray-100 active:bg-gray-200",
    text: "text-gray-900",
  },
  outline: {
    container: "bg-transparent border border-gray-300 active:bg-gray-50",
    text: "text-gray-900",
  },
  ghost: {
    container: "bg-transparent active:bg-gray-100",
    text: "text-gray-900",
  },
  danger: {
    container: "bg-red-500 active:bg-red-600",
    text: "text-white",
  },
};

const sizeStyles: Record<ButtonSize, { container: string; text: string }> = {
  sm: {
    container: "h-9 px-3 rounded-md",
    text: "text-sm",
  },
  md: {
    container: "h-11 px-4 rounded-lg",
    text: "text-base",
  },
  lg: {
    container: "h-14 px-6 rounded-xl",
    text: "text-lg",
  },
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  disabled,
  ...props
}: ButtonProps) {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];
  const isDisabled = disabled || loading;

  return (
    <Pressable
      className={`
        items-center justify-center flex-row
        ${sizeStyle.container}
        ${variantStyle.container}
        ${fullWidth ? "w-full" : ""}
        ${isDisabled ? "opacity-50" : ""}
      `}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "primary" || variant === "danger" ? "#ffffff" : "#374151"}
        />
      ) : (
        <Text className={`font-semibold ${sizeStyle.text} ${variantStyle.text}`}>
          {children}
        </Text>
      )}
    </Pressable>
  );
}
