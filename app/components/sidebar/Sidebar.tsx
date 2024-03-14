import getCurrentUser from "@/app/actions/getCurrentUser";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebarFooter from "./MobileSidebarFooter";

const Sidebar = async({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  
  return (  
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <MobileSidebarFooter />
      <main className="lg:pl-20 h-full">
        {children}
      </main>
    </div>
  );
}
 
export default Sidebar;