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
    // 방문 시 sessionStorage에 플래그 설정
    sessionStorage.setItem("visited", "true");

    const handleBeforeUnload = () => {
      // 새로고침이면 sessionStorage가 살아있음
      const visited = sessionStorage.getItem("visited");

      // 새로고침이 아닌 경우에만 explain 초기화
      if (!visited) {
        localStorage.setItem("explain", "true");
      }
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
