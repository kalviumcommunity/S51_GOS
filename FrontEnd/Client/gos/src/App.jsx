import "./App.css";
import Dummy from "./components/Dummy";
import NewData from "./components/NewData";
import Update from "./components/Update";
import LoginPage from "./components/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dummy />}></Route>
        <Route path="/newdata" element={<NewData />}></Route>
        <Route path="/update/:id" element={<Update />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        
      </Routes>
      {/* <Dummy/>
      <NewData/> */}
    </BrowserRouter>
  );
}

export default App;
