import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const Layout = ()=>{
  return(
    <div className="flex w-full h-full">
      <Sidebar />
      <main className="w-[calc(100%-200px)] h-screen flex bg-neutral-100 flex-wrap overflow-auto">
          <Header />
          <Outlet />
          <Footer />
      </main>
    </div>

  )
}
export default Layout;