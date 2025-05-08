import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export const AppSidebar = () => (
  <Sidebar className="bg-gray-800">
    <SidebarHeader className="text-xl font-semibold text-sidebar-foreground p-4">
      Goqual
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/dashboard">
                <span>Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup />
    </SidebarContent>
    <SidebarFooter />
  </Sidebar>
);
