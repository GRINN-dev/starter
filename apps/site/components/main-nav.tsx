"use client";

import { dashboardRoutes } from "@/config/dashboard-routes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  locale: string;
} & React.HTMLAttributes<HTMLDivElement>;
export function MainNav({ className, locale = "fr", ...props }: Props) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex flex-col border-4 border-pink-500 h-full", className)}
      {...props}
    >
      {dashboardRoutes({ locale }).map((route) => {
        const Icon = route.icon;
        return (
          <Link
            href={route.href}
            key={route.href}
            className={cn(
              "text-sm font-medium text-muted-foreground  p-4 transition-colors block border-l-4 hover:border-rose-600  hover:bg-gray-50",
              pathname === route.href && "bg-gray-50 border-rose-600"
            )}
          >
            <div className="flex items-center">
              <Icon className="mr-2" />
              {route.title}
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
