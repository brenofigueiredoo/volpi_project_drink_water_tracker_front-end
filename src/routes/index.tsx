import { Navigate, Route, Routes } from "react-router-dom";
import { UserRegister } from "../pages/UserRegister";
import { Home } from "../pages/Home";
import { History } from "../pages/History";
import { UserLogin } from "../pages/UserLogin";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const RoutersMain = () => {
  const token: string | null = window.localStorage.getItem("authToken");

  useContext(UserContext);

  return (
    <Routes>
      <Route path="/cadastro" element={<UserRegister />} />
      <Route path="/entrar" element={<UserLogin />} />
      <Route path="/historico" element={<History />} />

      {token !== null ? (
        <Route path="/home" element={<Home />} />
      ) : (
        <Route path="/home" element={<Navigate to="/entrar" />} />
      )}

      <Route
        path={"*"}
        element={
          token === null ? (
            <Navigate to={"/entrar"} />
          ) : (
            <Navigate to={"/home"} />
          )
        }
      />
    </Routes>
  );
};
