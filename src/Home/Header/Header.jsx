import { useContext } from "react";
import styles from "./Header.module.css";
import { StateContext } from "../Home/Home";

export default function Header() {
  const { HeaderState, setHeaderState, setWebtoonDetail } =
    useContext(StateContext);
  function headerClick(headerState) {
    setHeaderState(headerState);
    setWebtoonDetail(false);
  }
  return (
    <div className={styles.HeaderWrapper}>
      <div
        className={`${styles.HeaderBtn} ${
          HeaderState === "series" ? styles.selected : ""
        }`}
        onClick={() => headerClick("series")}
      >
        <h3>웹툰 목록</h3>
      </div>
      <div
        className={`${styles.HeaderBtn} ${
          HeaderState === "add" ? styles.selected : ""
        }`}
        onClick={() => headerClick("add")}
      >
        <h3>웹툰 추가</h3>
      </div>
      <div
        className={`${styles.HeaderBtn} ${
          HeaderState === "help" ? styles.selected : ""
        }`}
        onClick={() => headerClick("help")}
      >
        <h3>문의 사항</h3>
      </div>
    </div>
  );
}
