import { Car, Home } from "lucide-react";

export function dashboardRoutes({ locale }: { locale: string }) {
  return [
    {
      title: "Dashboard",
      icon: Home,
      href: `/${locale}/o`,
    },
    {
      title: "Flotte de véhicules",
      icon: Car,
      href: `/${locale}/o/fleet`,
    },
  ];
}
