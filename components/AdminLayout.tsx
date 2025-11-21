"use client";
import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full dark">
        <AdminSidebar />
        <main className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center px-6 sticky top-0 z-10">
            <SidebarTrigger className="mr-4" />
            <h2 className="text-lg font-semibold text-foreground">Admin Panel</h2>
          </header>
          <div className="flex-1 p-6 bg-background">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
