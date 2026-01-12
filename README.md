# Chat Mobile App

Full-featured cross-platform chat app using React Native (Expo), Firebase, and Rust backend. Built as a learning project to explore every aspect of mobile app development.

## Current Progress

| Phase | Status | Notes |
|-------|--------|-------|
| Phase 1: Foundation | ✅ Complete | Projects set up, gRPC connectivity verified |
| Phase 2: Firebase Auth | ⏳ Next | |
| Phase 3: Basic Chat | Pending | |
| Phase 4: Offline-First | Pending | |
| Phase 5: Rich Features | Pending | |
| Phase 6: Push Notifications | Pending | |
| Phase 7: Production Prep | Pending | |

## What's Been Built

**React Native App (`chat-mobile/`):**
- Expo project with TypeScript + NativeWind (Tailwind CSS)
- Expo Router with file-based navigation
- Auth screens: Login, Register (with form inputs)
- Main app screens: Chats list, Settings
- UI Components: Button, Input, Avatar
- gRPC-Web client with Connect-Web
- Health check integration in Settings

**Rust Backend (`rust-chat-server/`):**
- Axum + Tonic server with gRPC-Web support
- Health check service implementation
- Proto code generation via tonic-build

**Shared (`shared/proto/`):**
- Buf configuration for code generation
- Health check proto definition

## Quick Start

```bash
# Start Rust server
cd rust-chat-server && cargo run

# Start React Native app
cd chat-mobile && npm start

# Regenerate proto types
cd chat-mobile && npm run proto:generate
```

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  React Native (Expo)                                        │
│  - NativeWind (Tailwind CSS)                                │
│  - Zustand + TanStack Query (state)                         │
│  - WatermelonDB (offline storage)                           │
│  - Expo Router (navigation)                                 │
└─────────────────┬───────────────────────┬───────────────────┘
                  │                       │
           WebSocket                 Firebase SDK
                  │                       │
                  ▼                       ▼
┌─────────────────────────┐    ┌──────────────────────────────┐
│  Rust Backend           │    │  Firebase                    │
│  - Axum + Tokio         │    │  - Auth (identity)           │
│  - PostgreSQL (data)    │◄───│  - FCM (push notifications)  │
│  - Redis (pub/sub)      │    │                              │
└─────────────────────────┘    └──────────────────────────────┘
```

### Service Boundaries

**Firebase handles:**
- User authentication (email/password, OAuth)
- JWT token generation/refresh
- Push notification delivery (APNs/FCM)

**Rust handles:**
- Real-time messaging (WebSocket)
- Data persistence (PostgreSQL)
- Business logic (threads, reactions, sync)
- Push notification triggering via FCM API

## Tech Stack

| Layer | Technology | Why |
|-------|------------|-----|
| Mobile Framework | Expo (managed) | OTA updates, EAS Build, recommended by RN team |
| Navigation | Expo Router | File-based routing, deep linking |
| State | Zustand + TanStack Query | Lightweight, server state caching |
| Local DB | WatermelonDB | Offline-first, lazy loading, sync primitives |
| Styling | NativeWind | Tailwind for RN, familiar utility-first approach |
| Rust Framework | Axum 0.8 + Tonic | Axum for WebSocket, Tonic for gRPC |
| API Protocol | gRPC + gRPC-Web | Type-safe contracts, streaming support |
| Database | PostgreSQL + SQLx | Compile-time query checking, async |
| Cache | Redis | Pub/sub for multi-server, presence |

### gRPC Stack Details

| Component | Technology | Notes |
|-----------|------------|-------|
| Proto definitions | `shared/proto/` directory | Shared between client and server |
| Rust server | `tonic` + `tonic-web` | Native gRPC + gRPC-Web support |
| React Native client | `@connectrpc/connect-web` | Modern gRPC-Web client with TypeScript |
| Code generation | `buf` | Generates TS and Rust from .proto files |

**Why gRPC-Web?** React Native can't use native gRPC (requires HTTP/2 at transport level). gRPC-Web works over HTTP/1.1 and is fully supported by tonic-web on the server side.

## Project Structure

```
mobile-app-sandbox/
├── shared/
│   └── proto/                # Shared protobuf definitions
│       ├── buf.yaml          # Buf configuration
│       ├── buf.gen.yaml      # Code generation config
│       └── chat/
│           └── v1/
│               └── health.proto
│
├── chat-mobile/              # React Native app
│   ├── app/                  # Expo Router screens
│   │   ├── _layout.tsx       # Root layout
│   │   ├── index.tsx         # Entry redirect
│   │   ├── (auth)/           # Login, register
│   │   └── (app)/            # Tabs (chats, settings)
│   └── src/
│       ├── components/ui/    # Button, Input, Avatar
│       ├── services/grpc.ts  # gRPC client
│       └── gen/              # Generated proto types
│
└── rust-chat-server/         # Rust backend
    ├── build.rs              # Tonic code generation
    └── src/
        ├── main.rs           # Server entry point
        └── grpc/health.rs    # Health service
```

## Implementation Phases

### Phase 1: Foundation ✅ COMPLETE

- [x] Create Expo project with TypeScript + NativeWind
- [x] Set up Expo Router with placeholder screens (auth, chat list, settings)
- [x] Create base UI components (Button, Input, Avatar)
- [x] Initialize Rust project with Axum + Tonic
- [x] Set up shared/proto/ directory with buf configuration
- [x] Create initial .proto files (health check service)
- [x] Configure tonic-build in build.rs for Rust codegen
- [x] Set up @connectrpc/connect-web in React Native
- [x] Verify gRPC-Web connectivity (health check RPC)

### Phase 2: Firebase Auth

- [ ] Create Firebase project, enable email auth
- [ ] Install @react-native-firebase/app and /auth
- [ ] Build login/register screens with form validation
- [ ] Create auth context and useAuth hook
- [ ] Add Firebase JWT validation middleware to Rust
- [ ] Create protected API routes

### Phase 3: Basic Chat

- [ ] Set up PostgreSQL with SQLx, create users/messages tables
- [ ] Define messages.proto (GetMessages, SendMessage RPCs)
- [ ] Implement MessagesService in Tonic with gRPC-Web support
- [ ] Implement WebSocket handler in Axum (upgrade, hub, routing)
- [ ] Create WebSocket client in React Native
- [ ] Build chat screen with MessageList and MessageInput
- [ ] Integrate TanStack Query with gRPC client for data fetching

### Phase 4: Offline-First

- [ ] Set up WatermelonDB with schema
- [ ] Migrate message display to local DB
- [ ] Create sync queue for outgoing messages
- [ ] Implement optimistic updates
- [ ] Define sync.proto (SyncPull, SyncPush RPCs)
- [ ] Implement SyncService in Tonic
- [ ] Handle deduplication (client_id)

### Phase 5: Rich Features

- [ ] Add reply_to_id for threading
- [ ] Build thread view screen
- [ ] Implement reactions (picker, storage, display)
- [ ] Add Redis for presence tracking
- [ ] Implement typing indicators
- [ ] Show online status on avatars

### Phase 6: Push Notifications

- [ ] Configure FCM in Firebase Console
- [ ] Set up APNs for iOS (Apple Developer account required)
- [ ] Install @react-native-firebase/messaging
- [ ] Handle notification permissions and token registration
- [ ] Add FCM token storage in Rust
- [ ] Trigger notifications via FCM HTTP API when user offline

### Phase 7: Production Prep

- [ ] Add error boundaries and crash handling
- [ ] Profile and optimize list performance
- [ ] Write integration tests for API and WebSocket
- [ ] Containerize Rust server with Docker
- [ ] Set up EAS Build for app compilation
- [ ] Configure app signing (iOS/Android)

## Verification Checklist

1. **Phase 1:** ✅ Both dev servers run, can navigate between screens
2. **Phase 2:** Can create account, log in, token persists across restarts
3. **Phase 3:** Two users can send/receive messages in real-time
4. **Phase 4:** Send message offline, comes back online, message syncs
5. **Phase 5:** Can reply to message, add reaction, see typing indicator
6. **Phase 6:** Receive push when app backgrounded
7. **Phase 7:** Build succeeds, can install on device via TestFlight/Play Store

## Prerequisites

- Node.js 18+ and npm/yarn
- Rust 1.75+ with cargo
- `buf` CLI (installed via npm in chat-mobile)
- Docker (for PostgreSQL, Redis) - needed for Phase 3+
- Apple Developer account (for iOS push notifications) - needed for Phase 6
- Xcode (for iOS builds)
- Android Studio (for Android builds)
