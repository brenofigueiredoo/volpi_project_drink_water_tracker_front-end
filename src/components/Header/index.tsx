import { useState } from "react";
import { Container } from "./style";
import { FaUser } from "react-icons/fa";

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
        <a
          href="/perfil"
          onClick={closeMenu}
          style={{ gap: "2rem", color: "#753fc8", width: "4rem" }}
        >
          <FaUser size="1.8rem" />
          Perfil
        </a>
        <a href="/entrar" onClick={closeMenu}>
          Entrar
        </a>
        <a href="/cadastrar" onClick={closeMenu}>
          Cadastrar
        </a>
        <a
          href="/entrar"
          onClick={() => window.localStorage.removeItem("authToken")}
        >
          Sair
        </a>
        <a href="/home" onClick={closeMenu}>
          Home
        </a>
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
