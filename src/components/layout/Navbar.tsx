"use client";

import {
  Bike,
  ChevronDown,
  Globe,
  Menu,
  PersonStanding,
  ShoppingBag,
  ShoppingCart,
  Store,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// ─── Nav Tab Data ────────────────────────────────────────────────────────────

const navTabs = [
  { label: "Delivery", icon: Bike, href: "/delivery" },
  { label: "Pick-up", icon: PersonStanding, href: "/pickup" },
  { label: "pandamart", icon: ShoppingBag, href: "/pandamart" },
  { label: "Shops", icon: Store, href: "/shops" },
] as const;

// ─── Component ───────────────────────────────────────────────────────────────

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      {/* ── Top Row ─────────────────────────────────────────────────────── */}
      <div className="mx-auto flex h-14 items-center justify-between px-4 md:px-6 lg:px-8 max-w-7xl">
        {/* Left: Logo */}
        <Link href="/" className="shrink-0">
          <span className="text-xl font-extrabold tracking-tight text-[#E21B70]">
            Zomato
          </span>
        </Link>

        {/* Right: Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          {/* Log in */}
          <Button
            asChild
            variant="outline"
            size="sm"
            className="rounded-full border-gray-800 text-gray-800 font-semibold hover:bg-gray-50"
          >
            <Link href="/sign-in">Sign in</Link>
          </Button>

          {/* Cart */}
          <Button
            variant="ghost"
            size="icon-sm"
            className="relative text-[#E21B70]"
          >
            <ShoppingCart className="size-5" />
            <Badge className="absolute -top-1 -right-1 size-4 p-0 text-[10px] bg-[#E21B70] text-white">
              2
            </Badge>
          </Button>
        </div>

        {/* Right: Mobile Actions */}
        <div className="flex md:hidden items-center gap-2">
          {/* Cart */}
          <Button
            variant="ghost"
            size="icon-sm"
            className="relative text-[#E21B70]"
          >
            <ShoppingCart className="size-5" />
            <Badge className="absolute -top-1 -right-1 size-4 p-0 text-[10px] bg-[#E21B70] text-white">
              2
            </Badge>
          </Button>

          {/*======================== Mobile menu =================*/}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-sm">
                <Menu className="size-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72 p-0">
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation Menu</SheetTitle>
                <SheetDescription>
                  Browse delivery categories and account options
                </SheetDescription>
              </SheetHeader>

              {/* Mobile Auth */}
              <div className="flex flex-col gap-3 p-5 border-b border-gray-200">
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-full border-gray-800 text-gray-800 font-semibold"
                >
                  <Link href="/sign-in">Login</Link>
                </Button>
                <Button className="w-full rounded-full bg-[#E21B70] hover:bg-[#c4165f] text-white font-semibold">
                  Sign up for free delivery hh1
                </Button>
              </div>

              {/* Mobile Nav Tabs */}
              <nav className="flex flex-col py-2">
                {navTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = pathname.startsWith(tab.href);
                  return (
                    <SheetClose key={tab.label} asChild>
                      <Link
                        href={tab.href}
                        className={cn(
                          "flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors",
                          isActive
                            ? "text-[#E21B70] bg-pink-50"
                            : "text-gray-600 hover:bg-gray-50",
                        )}
                      >
                        <Icon className="size-5" />
                        {tab.label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>

              {/* Language */}
              <div className="border-t border-gray-200 p-5">
                <button className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Globe className="size-4" />
                  EN
                  <ChevronDown className="size-3" />
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* ── Bottom Row: Navigation Tabs (desktop / tablet) ──────────── */}
      <nav className="hidden md:block border-t border-gray-100">
        <div className="mx-auto flex items-center gap-6 px-4 md:px-6 lg:px-8 max-w-7xl">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.label}
                href={tab.href}
                className={cn(
                  "relative flex items-center gap-2 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "text-[#E21B70]"
                    : "text-gray-500 hover:text-gray-800",
                )}
              >
                <Icon className="size-5" />
                {tab.label}
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#E21B70]" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ── Bottom Row: Scrollable tabs (mobile) ────────────────────── */}
      <nav className="md:hidden border-t border-gray-100 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-4 px-4 min-w-max">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.label}
                href={tab.href}
                className={cn(
                  "relative flex items-center gap-2 py-3 text-sm font-medium whitespace-nowrap transition-colors",
                  isActive
                    ? "text-[#E21B70]"
                    : "text-gray-500 hover:text-gray-800",
                )}
              >
                <Icon className="size-5" />
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#E21B70]" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
