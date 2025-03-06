import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <button onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
