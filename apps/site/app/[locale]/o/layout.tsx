import { Metadata } from "next";


interface LayoutProps {
  children: React.ReactNode
}
export const metadata: Metadata = {
  title: "SoonGo",
  description: "Dashboad SoonGo",
};

const Layout = ({ children }: LayoutProps) => {
 
  return (
    
      <div>
        {children}
      </div>
  
  )
}

export default Layout