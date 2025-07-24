import { useContext } from "react";
import { ThemeContext } from "../ThemeContext";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <div
      onClick={toggleTheme}
      role="button"
      aria-label="Toggle Theme"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      style={{
        position: "fixed",
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 999,
        width: 70,
        height: 34,
        borderRadius: 34,
        backgroundColor: isDark ? "#333" : "#ddd",
        display: "flex",
        alignItems: "center",
        padding: "0 4px",
        cursor: "pointer",
        transition: "background-color 0.3s",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      }}
    >
      <div
        style={{
          height: 26,
          width: 26,
          borderRadius: "50%",
          backgroundColor: "#fff",
          transform: isDark ? "translateX(36px)" : "translateX(0px)",
          transition: "transform 0.3s ease-in-out",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
        }}
      >
        {isDark ? "🌙" : "☀️"}
      </div>
    </div>
  );
}
