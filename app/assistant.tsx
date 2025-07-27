"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { Thread } from "@/components/assistant-ui/thread";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
// import { SidebarTrigger } from "@/components/ui/sidebar"; // Now handled by HeaderNavigation
import { AppSidebar } from "@/components/app-sidebar";
import { WeatherTool } from "@/components/assistant-ui/tool-weather";
import { HeaderNavigation } from "@/components/assistant-ui/header-navigation";

export const Assistant = () => {
  const runtime = useChatRuntime({
    api: "/api/chat",
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <HeaderNavigation />
          <WeatherTool />
          <Thread />
        </SidebarInset>
      </SidebarProvider>
    </AssistantRuntimeProvider>
  );
};
