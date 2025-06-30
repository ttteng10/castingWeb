import { useState } from "react";
import Select from "react-select";
import styles from "./SortBar.module.css";

const options = [
  { value: "All", label: "전체" },
  { value: "naver", label: "네이버" },
  { value: "kakao", label: "카카오" },
  { value: "lezhin", label: "레진코믹스" },
  { value: "others", label: "기타" },
];

export default function SortBar({ searchInput, setSearchInput, setSortType }) {
  function handleSearchBar(e) {
    const newValue = e.target.value;
    setSearchInput(newValue);
  }

  function handleSortBox(e) {
    const newValue = e.value;
    setSortType(newValue);
  }

  return (
    <div className={styles.SortBarWrapper}>
      <div className={styles.SearchBarWrapper}>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => handleSearchBar(e)}
          placeholder="캐스팅하고 싶은 웹툰 검색"
        />
      </div>
      <div className={styles.SortBox}>
        <Select
          options={options}
          defaultValue={options[0]}
          onChange={handleSortBox}
          styles={{
            control: (styles) => ({
              ...styles,
              height: "50px",
            }),
          }}
        />
      </div>
    </div>
  );
}
