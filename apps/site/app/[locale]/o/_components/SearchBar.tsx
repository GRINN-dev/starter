"use client"
import { Input } from "../../../../components/ui/input";

export function SearchBar() {
  return (
    <div>
      <Input 
        type="search"
        placeholder="Search..."
        className="md:w-[300px] lg:w-[300px]"
      />
    </div>
  )
}