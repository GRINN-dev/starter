"use client"
import { SearchBar } from '@/app/[locale]/o/_components/SearchBar';
import { UserNav } from '@/app/[locale]/o/_components/UserNav';
import Image from 'next/image';

export function Header() {
    return (
        <section className="flex flex-col border-b p-4 md:flex">
    <div className="flex w-full h-full items-center">
      <Image
        src="/images/Logo_SoonGo.png"
        alt="Logo SoonGo"
        width={200}
        height={100}
      />
      <div className="ml-6 h-auto">
        <SearchBar />
      </div>
      <div>
          <UserNav />
      </div>
    </div> 
</section>
    )
}