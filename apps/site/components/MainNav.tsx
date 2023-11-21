"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { FileLineChart, Home, Landmark, Lightbulb, Plane, Settings, Target, Truck, Warehouse } from "lucide-react"


export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex flex-col h-1/2", className)}
      {...props}
    >
      <Link
        href="/"
        className="text-sm font-medium text-muted-foreground  p-4 transition-colors block hover:border-l-4 hover:border-rose-600  hover:bg-gray-50"
      >
        <div className="flex items-center">
        <Home className="mr-2"/>
        Dashboard
        </div>
      </Link>
      <Link
        href="/"
        className="text-sm font-medium text-muted-foreground p-4 transition-colors block hover:border-l-4 hover:border-rose-600  hover:bg-gray-50"
      >
        <div className="flex items-center">
       <Truck className="mr-2"/> 
       Flotte de véhicules
       </div>
      </Link>
      <Link
        href="/"
        className="text-sm font-medium text-muted-foreground p-4 transition-colors block  hover:border-l-4 hover:border-rose-600 hover:bg-gray-50"
      >
      <div className="flex items-center">
       <Plane className="mr-2" /> 
       Voyages d&apos;affaires
       </div>
      </Link>
      <Link
        href="/"
        className="text-sm font-medium text-muted-foreground p-4 transition-colors block  hover:border-l-4 hover:border-rose-600 hover:bg-gray-50"
      >
       <div className="flex items-center">
       <Warehouse className="mr-2" />
        Domicile / travail
       </div>
      </Link>
      <Link
        href="/"
        className="text-sm font-medium text-muted-foreground p-4 transition-colors block  hover:border-l-4 hover:border-rose-600 hover:bg-gray-50"
      >
       <div className="flex items-center">
       <Lightbulb className="mr-2" /> 
       Optimisation
       </div>
      </Link>
      <Link
        href="/"
        className="text-sm font-medium text-muted-foreground p-4 transition-colors block  hover:border-l-4 hover:border-rose-600 hover:bg-gray-50"
      >
       <div className="flex items-center">
        <Target className="mr-2"/>
        Politique mobilité
        </div>
      </Link>
      <Link
        href="/"
        className="text-sm font-medium text-muted-foreground p-4 transition-colors block  hover:border-l-4 hover:border-rose-600 hover:bg-gray-50"
      >
       <div className="flex items-center">
        <FileLineChart className="mr-2"/>
        Rapports
        </div>
      </Link>
      <Link
        href="/"
        className="text-sm font-medium text-muted-foreground p-4 transition-colors block  hover:border-l-4 hover:border-rose-600 hover:bg-gray-50"
      >
       <div className="flex items-center">
        <Landmark className="mr-2" />
        Règlementation
        </div>
      </Link>
      <Link
        href="/"
        className="text-sm font-medium text-muted-foreground p-4 transition-colors block  hover:border-l-4 hover:border-rose-600 hover:bg-gray-50"
      >
       <div className="flex items-center">
        <Settings className="mr-2" />
        Paramètres
        </div>
      </Link>
    </nav>
  )
}