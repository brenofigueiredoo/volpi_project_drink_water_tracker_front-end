import { Navigate, Route, Routes } from "react-router-dom";
import { UserRegister } from "../pages/UserRegister";
import { Home } from "../pages/Home";
import { History } from "../pages/History";
import { UserLogin } from "../pages/UserLogin";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Profile from "../pages/Profile";

export const RoutersMain = () => {
  const { token } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/cadastrar" element={<UserRegister />} />
      <Route path="/entrar" element={<UserLogin />} />
      <Route path="/historico" element={<History />} />

      {token !== null ? (
        <Route path="/home" element={<Home />} />
      ) : (
        <Route path="/home" element={<Navigate to="/entrar" />} />
      )}

      {token !== null ? (
        <Route path="/perfil" element={<Profile />} />
      ) : (
        <Route path="/perfil" element={<Navigate to="/entrar" />} />
      )}

      <Route
        path={"*" || "/"}
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
