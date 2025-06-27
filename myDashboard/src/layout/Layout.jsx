import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const Layout = ()=>{
  return(
    <div className="w-full h-full flex bg-stone-50">
      <Sidebar />
      <main className="w-[calc(100%-200px)] flex flex-wrap">
        <Header />
        <Outlet />
        <Footer />
      </main>
    </div>
  )
}
export default Layout;