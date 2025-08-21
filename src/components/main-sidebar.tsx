'use client';

import {
  BookOpen,
  Bot,
  Code,
  Home,
  MessageCircle,
  Notebook,
  Terminal,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

export function MainSidebar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <Bot className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-semibold text-foreground">
            Sasha's Path
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/')}
              tooltip={{ children: 'Dashboard' }}
            >
              <Link href="/">
                <Home />
                Dashboard
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/exercises')}
              tooltip={{ children: 'AI Exercises' }}
            >
              <Link href="/exercises">
                <Code />
                AI Exercises
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/ide-teacher')}
              tooltip={{ children: 'AI IDE Teacher' }}
            >
              <Link href="/ide-teacher">
                <Terminal />
                AI IDE Teacher
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/chatbot')}
              tooltip={{ children: 'Chatbot' }}
            >
              <Link href="/chatbot">
                <MessageCircle />
                Chatbot
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/resources')}
              tooltip={{ children: 'Resource Hub' }}
            >
              <Link href="/resources">
                <BookOpen />
                Resource Hub
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive('/jupyter-path')}
              tooltip={{ children: 'Jupyter Path' }}
            >
              <Link href="/jupyter-path">
                <Notebook />
                Jupyter Path
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
