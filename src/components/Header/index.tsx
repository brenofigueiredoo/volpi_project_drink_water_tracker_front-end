import { useState } from "react";
import { Container } from "./style";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const [isActive, setActive] = useState<boolean>(false);

  const closeMenu = () => {
    setActive(false);
  };

  return (
    <Container>
      <div className="container--logo">
        <img
          src="/drink-water.png"
          alt="Image"
          className="container--logo--note_image"
        />
        <a href="/">
          <h2 className="container--logo--title">Drink Water Tracker</h2>
        </a>
      </div>

      <nav className={isActive ? "active" : ""}>
        <Link
          to="/perfil"
          onClick={closeMenu}
          style={{ gap: "2rem", color: "#753fc8", width: "4rem" }}
        >
          <FaUser size="1.8rem" />
          Perfil
        </Link>
        <Link to="/entrar" onClick={closeMenu}>
          Entrar
        </Link>
        <Link to="/cadastrar" onClick={closeMenu}>
          Cadastrar
        </Link>
        <Link
          to="/entrar"
          onClick={() => window.localStorage.removeItem("authToken")}
        >
          Sair
        </Link>
        <Link to="/home" onClick={closeMenu}>
          Home
        </Link>
      </nav>

      <div
        aria-expanded={isActive ? "true" : "false"}
        aria-haspopup="true"
        aria-label={isActive ? "Fechar menu" : "Abrir menu"}
        className={isActive ? "menu active" : "menu"}
        onClick={() => {
          setActive(!isActive);
        }}
      ></div>
    </Container>
  );
};

export default Header;
