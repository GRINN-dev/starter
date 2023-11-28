import { Header } from "@/components/Header";
import { MainNav } from "@/components/main-nav";
import { Metadata } from "next";

interface LayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}
export const metadata: Metadata = {
  title: "SoonGo",
  description: "Dashboad SoonGo",
};

const Layout = ({ children, params }: LayoutProps) => {
  return (
    <div className=" h-screen overflow-hidden">
      <Header />
      <div className="flex w-full h-[calc(100vh-64px)]">
        <MainNav
          className="hidden md:block h-full overflow-y-auto"
          locale={params.locale}
        />

        <div className="flex-1 h-full bg-gray-100 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
