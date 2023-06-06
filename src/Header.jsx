import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Header({ isDark, toggleTheme }) {
  const lightMoon = <FontAwesomeIcon icon={faMoon} />;
  function handleMode() {
    document.body.classList.toggle("dark");
    toggleTheme(!isDark);
  }

  return (
    <header className={isDark ? "dark-mode" : ""}>
      <Link className= "link" to="/">
      <h1 className={isDark ? "dark-mode heading" : " heading"}>
        {" "}
        Where in the world?{" "}
      </h1>
      </Link>
      <button
        onClick={() => handleMode()}
        className={isDark ? "dark-mode mode-btn" : "mode-btn"}
      >
        {lightMoon} Dark Mode
      </button>
    </header>
  );
}
