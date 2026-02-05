import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  Users,
  MapPin,
  Clock,
  Bell,
  BarChart3,
  UserCog,
  Shield,
  ChevronLeft,
  Menu,
  Radar,
  DollarSign,
  Crown,
  Sparkles,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Real-Time Presence", href: "/presence", icon: Users },
  { name: "Employees", href: "/employees", icon: UserCog },
  { name: "Attendance", href: "/attendance", icon: Clock },
  { name: "Payroll", href: "/payroll", icon: DollarSign },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Alerts", href: "/alerts", icon: Bell },
  { name: "Zones", href: "/locations", icon: MapPin },
  { name: "Security", href: "/security", icon: Shield },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex w-full">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            "flex items-center border-b border-sidebar-border transition-all duration-300",
            collapsed
              ? "h-20 justify-center py-3 px-2"
              : "h-24 gap-4 px-4 py-3",
          )}
        >
          {collapsed ? (
            <div className="relative group cursor-pointer">
              {/* Animated pulsing ring */}
              <div className="absolute inset-0 animate-pulse">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 rounded-xl opacity-20 blur-lg"></div>
              </div>
              {/* Outer glow */}
              <div className="absolute -inset-2 bg-gradient-to-br from-purple-500/50 via-purple-600/30 to-blue-500/20 rounded-xl blur-xl transition-all duration-500 opacity-60"></div>
              {/* Logo container */}
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white shadow-xl ring-[2px] ring-purple-500/50 transition-all duration-300">
                <img
                  src="/logo.jpg"
                  alt="Pointy Logo"
                  className="relative w-full h-full object-contain p-2"
                />
              </div>
            </div>
          ) : (
            <>
              <div className="relative shrink-0 group cursor-pointer">
                {/* Animated pulsing ring */}
                <div className="absolute inset-0 animate-pulse">
                  <div className="absolute -inset-3 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 rounded-2xl opacity-20 blur-xl"></div>
                </div>
                {/* Outer glow */}
                <div className="absolute -inset-3 bg-gradient-to-br from-purple-500/50 via-purple-600/30 to-blue-500/20 rounded-2xl blur-2xl transition-all duration-500 opacity-60"></div>
                {/* Logo container */}
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-white shadow-xl ring-[3px] ring-purple-500/50 transition-all duration-300">
                  <img
                    src="/logo.jpg"
                    alt="Pointy Logo"
                    className="relative w-full h-full object-contain p-2.5"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center min-w-0 gap-0.5">
                <h1 className="font-bold text-2xl text-purple-400 flex items-center gap-2 leading-tight">
                  Pointy
                  <span className="text-xl">🇩🇿</span>
                </h1>
                <p className="text-[13px] text-purple-200/90 font-medium leading-tight">
                  AI-Verified Attendance
                </p>
                <p className="text-[11px] text-green-400 font-semibold mt-0.5 flex items-center gap-1.5 leading-tight">
                  <span className="inline-flex w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                  Made for Algerian Businesses
                </p>
              </div>
            </>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  collapsed && "justify-center px-2",
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <div className="p-3 border-t border-sidebar-border hidden lg:block">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "w-full text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              collapsed && "px-2",
            )}
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform",
                collapsed && "rotate-180",
              )}
            />
            {!collapsed && <span className="ml-2">Collapse</span>}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div
        className={cn(
          "flex-1 flex flex-col min-w-0 transition-all duration-300",
          collapsed ? "lg:ml-16" : "lg:ml-64",
        )}
      >
        {/* Top bar */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold">
                {navigation.find((n) => n.href === location.pathname)?.name ||
                  "Dashboard"}
              </h1>
              <p className="text-sm text-muted-foreground hidden sm:block">
                Where AI meets honest work
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-medium text-green-700">
                AI Active • 25K+ Enterprises
              </span>
            </div>
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200">
              <span className="text-xs font-medium text-purple-700">
                🇩🇿 Algerian Compliant
              </span>
            </div>
            <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1.5 font-normal"
                  >
                    <Crown className="h-3.5 w-3.5 text-amber-500" />
                    Pro Plan
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Current Subscription
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        Manage your plan and billing
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="p-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold">Pro Plan</span>
                      <Badge className="gap-1 bg-amber-500 hover:bg-amber-600">
                        <Crown className="h-3 w-3" />
                        Active
                      </Badge>
                    </div>
                    <div className="space-y-1.5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-3 w-3" />
                        <span>AI Facial Verification</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-3 w-3" />
                        <span>Unlimited Employees</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-3 w-3" />
                        <span>Advanced Analytics</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-3 w-3" />
                        <span>Priority Support</span>
                      </div>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    View Billing Details
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    Upgrade to Enterprise
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
              AD
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
