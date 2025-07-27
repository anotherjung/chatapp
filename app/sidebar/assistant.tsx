"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
// import { SidebarTrigger } from "@/components/ui/sidebar"; // Now handled by HeaderNavigation
import { AppSidebar } from "@/components/app-sidebar";
// import { AssistantModal } from "@/components/assistant-ui/assistant-modal"; // Alternative: use AssistantModal instead of AssistantSidebar
import { AssistantSidebar } from "@/components/assistant-ui/assistant-sidebar";
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
          <AssistantSidebar>{/* your app */}</AssistantSidebar>
        </SidebarInset>
      </SidebarProvider>  
    </AssistantRuntimeProvider>
  );
};
