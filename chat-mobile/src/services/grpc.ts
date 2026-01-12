import { createClient } from "@connectrpc/connect";
import { createGrpcWebTransport } from "@connectrpc/connect-web";
import { HealthService } from "../gen/chat/v1/health_connect";

// Base URL for the gRPC server
// In development, this points to the local Rust server
const GRPC_BASE_URL = process.env.EXPO_PUBLIC_GRPC_URL || "http://localhost:3000";

// Create the gRPC-Web transport
const transport = createGrpcWebTransport({
  baseUrl: GRPC_BASE_URL,
});

// Create typed client for HealthService
export const healthClient = createClient(HealthService, transport);

// Helper function to check server health
export async function checkServerHealth(service = ""): Promise<boolean> {
  try {
    const response = await healthClient.check({ service });
    // ServingStatus.SERVING = 1
    return response.status === 1;
  } catch (error) {
    console.error("Health check failed:", error);
    return false;
  }
}
