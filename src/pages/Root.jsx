import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { useState, useEffect } from "react";
import Start from "./Start/Start";

export default function RootLayout() {
  const [explain, setExplain] = useState(() => {
    const saved = localStorage.getItem("explain");
    return saved !== "false";
  });
  useEffect(() => {
    localStorage.setItem("explain", explain);
  }, [explain]);
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("explain", "true");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      {explain && <Start setExplain={setExplain} />}
      {!explain && (
        <>
          <Header />
          <main>
            <Outlet />
          </main>
        </>
      )}
    </>
  );
}
