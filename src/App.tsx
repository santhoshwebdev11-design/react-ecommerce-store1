import { Route, Routes } from "react-router-dom";
import SideBar from "./componenets/SideBar";
import MainContent from "./componenets/MainContent";
import ProdctPage from "./componenets/ProdctPage";
import Topsellers from "./componenets/Topsellers";
import PopulorBogs from "./componenets/PopulorBogs";

const App = () => {
  return (
    <div className="flex h-screen">
      <div className="flex h-screen">
        <SideBar />

        <div className="w-full rounded flex justify-center flex-wrap">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/:id" element={<ProdctPage />} />
          </Routes>
        </div >
        <div className="flex flex-col justify-center">
          <Topsellers/>
          <PopulorBogs/>
        </div>
        
      </div>
    </div>
  );
};

export default App;
