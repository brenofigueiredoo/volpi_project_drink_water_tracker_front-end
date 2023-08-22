import {Route, Routes} from "react-router-dom"
import { UserRegister } from "../pages/UserRegister";
import { Home } from "../pages/Home";
import { History } from "../pages/History";

export function RoutersMain() {
  
    return (
      <Routes>
        <Route path="/cadastro" element={<UserRegister />} />
        <Route path="/home" element={<Home />} />
        <Route path="/historico" element={<History />} />
        <Route path="*" element={<Home />} />
      </Routes>
    );
  }