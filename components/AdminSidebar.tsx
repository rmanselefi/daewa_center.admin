"use client";
import {
  LayoutDashboard,
  Video,
  Users,
  BarChart3,
  Settings,
  Mic2,
  FolderTree,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, exact: true },
  { title: "Content", url: "/content", icon: Video },
  { title: "Speakers", url: "/speaker", icon: Mic2 },
  { title: "Categories", url: "/category", icon: FolderTree },
  { title: "Users", url: "/user", icon: Users },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AdminSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar className={open ? "w-60" : "w-14"}>
      <SidebarContent>
        <div className="p-4">
          <h1
            className={`font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent ${
              !open && "hidden"
            }`}
          >
            Daewa Zone
          </h1>
          {!open && (
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-bold text-sm">DZ</span>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={!open ? "hidden" : ""}>
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      href={item.url}
                      isActive={item.exact}
                      isPending={false}
                      className="hover:bg-sidebar-accent transition-colors"
                      activeClassName="bg-sidebar-accent text-primary font-medium"
                    >
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
