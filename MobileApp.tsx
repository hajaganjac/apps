import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { ChatProvider } from "./context/ChatContext";
import { MobileLayout } from "./components/MobileLayout";
import { HomeScreen } from "./screens/HomeScreen";
import { DiscoveryScreen } from "./screens/DiscoveryScreen";
import { CircleDetailScreen } from "./screens/CircleDetailScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { MessagesScreen } from "./screens/MessagesScreen";
import { ChatScreen } from "./screens/ChatScreen";
import { EventsScreen } from "./screens/EventsScreen";
import { NewsScreen } from "./screens/NewsScreen";
import { FindFriendsScreen } from "./screens/FindFriendsScreen";
import { TrackFriendScreen } from "./screens/TrackFriendScreen";
import { FindFriendsProvider } from "./context/FindFriendsContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ChatProvider>
        <FindFriendsProvider>
        <MobileLayout />
        <Toaster theme="dark" position="top-center" toastOptions={{ style: { background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" } }} />
        </FindFriendsProvider>
      </ChatProvider>
    ),
    children: [
      { index: true, element: <HomeScreen /> },
      { path: "discovery", element: <DiscoveryScreen /> },
      { path: "events", element: <EventsScreen /> },
      { path: "news", element: <NewsScreen /> },
      { path: "find", element: <FindFriendsScreen /> },
      { path: "find/:friendId", element: <TrackFriendScreen /> },
      { path: "circles/:circleId", element: <CircleDetailScreen /> },
      { path: "profile/:userId", element: <ProfileScreen /> },
      { path: "messages", element: <MessagesScreen /> },
      { path: "messages/:threadId", element: <ChatScreen /> },
    ],
  },
]);

export function MobileApp() {
  return <RouterProvider router={router} />;
}
