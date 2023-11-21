import { Header } from "@/components/Header";
import { MainNav } from "@/components/MainNav";
import { Metadata } from "next";

interface LayoutProps {
  children: React.ReactNode;
}
export const metadata: Metadata = {
  title: "SoonGo",
  description: "Dashboad SoonGo",
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <div className="flex w-full h-full  mx-auto">
        <nav>
          <MainNav className="h-auto" />
        </nav>
        <main className="flex-1 h-auto bg-gray-100">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
