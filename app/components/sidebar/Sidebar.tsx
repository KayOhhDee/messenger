import DesktopSidebar from "./DesktopSidebar";
import MobileSidebarFooter from "./MobileSidebarFooter";

const Sidebar = async({ children }: { children: React.ReactNode }) => {
  return (  
    <div className="h-full">
      <DesktopSidebar />
      <MobileSidebarFooter />
      <main className="lg:pl-20 h-full">
        {children}
      </main>
    </div>
  );
}
 
export default Sidebar;