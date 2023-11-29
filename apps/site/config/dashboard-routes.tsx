import { Car, FileLineChart, Home, Landmark, Lightbulb, Plane, Settings, Target, Warehouse } from "lucide-react";

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
    {
      title: "Rapport Flotte",
      icon: Car,
      href:`/${locale}/o/report`
    },
    {
      title: "Voyage d'affaire",
      icon: Plane,
      href: `/${locale}/o/travel`,
    },
    {
      title: "Domicile / travail",
      icon: Warehouse,
      href: `/${locale}/o/..`,
    },
    {
      title: "Optimisation",
      icon: Lightbulb,
      href: `/${locale}/o/optimisation`,
    },
    {
      title: "Politique mobilité",
      icon: Target,
      href: `/${locale}/o/mobility`,
    },
    {
      title: "Rapports",
      icon: FileLineChart,
      href: `/${locale}/o/...`,
    },
    {
      title: "Règlementation",
      icon: Landmark,
      href: `/${locale}/o/regulation`,
    },
    {
      title: "Paramètres",
      icon: Settings,
      href: `/${locale}/o/settings`,
    },

    {
      title: "Création véhicule",
      icon: Settings,
      href: `/${locale}/o/vehicles`,
    },
  ];
}
