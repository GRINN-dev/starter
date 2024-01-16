import { serverSdk } from "@/lib/apollo-server-sdk";
import Link from "next/link";
import { SVGProps, Suspense } from "react";
import { UserNav } from "./user-nav";
import { Skeleton } from "@/components/ui/skeleton";

export async function Header() {
  const links = [
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <header className="container px-4 lg:px-6 h-14 flex items-center gap-4">
      <Link className="flex items-center justify-center" href="#">
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">Acme Inc</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        {links.map((link) => (
          <Link
            key={link.label}
            className="text-sm font-medium hover:underline underline-offset-4"
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <Suspense fallback={<Skeleton className="w-32 h-12" />}>
        <UserNav />
      </Suspense>
    </header>
  );
}

function MountainIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
