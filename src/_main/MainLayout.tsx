import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Leftbar from "./components/Leftbar";
import Bottom from "./components/Bottom";

const MainLayout = () => {
  return (
    <div className="w-full md:flex">
      <Header />
      <Leftbar />
      <section className="flex flex-1 h-full ">
        <Outlet />
      </section>
      <Bottom />
    </div>
  );
};

export default MainLayout;
