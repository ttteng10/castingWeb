import { useState } from "react";
import styles from "./SortBox.module.css";
import searchIcon from "../../assets/icons/search.png";

export default function SortBox({
  selectWeek,
  setSelectWeek,
  searchWord,
  setSearchWord,
  searchCheck,
  setSearchCheck,
}) {
  const weekArr = ["All", "월", "화", "수", "목", "금", "토", "일"];
  const weekKey = ["All", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const handleChange = (event) => {
    setSearchWord(event.target.value);
  };
  const handleSearch = () => {
    setSearchCheck(!searchCheck);
  };
  return (
    <div className={styles.SortBoxWrapper}>
      <div className={styles.WeekBoxs}>
        {weekArr.map((item, idx) => (
          <div
            key={item}
            className={`${styles.WeekBox} ${
              selectWeek === weekKey[idx] ? styles.WeekSelect : ""
            }`}
            onClick={() => setSelectWeek(weekKey[idx])}
          >
            {item}
          </div>
        ))}
      </div>
      <div className={styles.SearchBox}>
        <input
          type="text"
          placeholder="웹툰이름을 입력하세요"
          className={styles.SearchInput}
          onChange={handleChange}
        />
        <img
          src={searchIcon}
          alt="searchIcon"
          className={styles.SearchIcon}
          onClick={handleSearch} // 아이콘 클릭 시 실행
        />
      </div>
    </div>
  );
}
