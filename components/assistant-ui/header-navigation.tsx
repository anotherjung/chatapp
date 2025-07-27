"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, MessageSquare, SidebarIcon } from "lucide-react";

interface ExampleRoute {
  path: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const examples: ExampleRoute[] = [
  {
    path: "/",
    name: "Default Chat",
    description: "Full chat interface with weather tool",
    icon: MessageSquare,
  },
  {
    path: "/modal",
    name: "Modal Interface",
    description: "Modal-based chat experience",
    icon: LayoutDashboard,
  },
  {
    path: "/sidebar",
    name: "Sidebar Interface", 
    description: "Sidebar-integrated chat",
    icon: SidebarIcon,
  },
];

export const HeaderNavigation = () => {
  const pathname = usePathname();
  const name = "chat name"

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger />
      <Separator orientation="vertical" className="mr-2 h-4" />
      
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="https://github.com/Yonom/assistant-ui" target="_blank">
              Assistant UI Examples
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Example Navigation */}
      <div className="ml-auto flex items-center gap-1">
        <span className="text-sm text-muted-foreground mr-2 hidden sm:inline">
          Examples:
        </span>
        {examples.map((example) => {
          const isActive = example.path === pathname;
          const Icon = example.icon;
          
          return (
            <Button
              key={example.path}
              variant={isActive ? "default" : "ghost"}
              size="sm"
              asChild
              className="gap-2"
            >
              <Link href={example.path} title={example.description}>
                <Icon className="h-4 w-4" />
                <span className="hidden md:inline">{example.name}</span>
              </Link>
            </Button>
          );
        })}
      </div>
    </header>
  );
};