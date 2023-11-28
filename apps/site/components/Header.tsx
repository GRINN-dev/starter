"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import { MainNav } from "./main-nav";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { UserNav } from "@/app/[locale]/o/_components/UserNav";

export function Header() {
  return (
    <header className="flex justify-between h-[64px] border-b py-2 px-2">
      <div className="flex items-center gap-2">
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu className="w-6 h-6" />
          </SheetTrigger>
          <SheetContent side="left" className="px-0 sm:px-0">
            <SheetHeader className="px-0 sm:px-0">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Menu</SheetDescription>
              <MainNav locale="fr" />
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <Image
          src="/images/Logo_SoonGo.png"
          alt="Logo SoonGo"
          className="object-contain object-left"
          width={200}
          height={48}
        />
      </div>
      <div className="flex gap-2 items-center">
        {/* <SearchBar /> */}
        <UserNav />
      </div>
    </header>
  );
}
