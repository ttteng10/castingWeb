import { useContext, useState, useEffect } from "react";
import styles from "./Content.module.css";
import { StateContext } from "../Home/Home";
import noImage from "../../assets/images/noImage.png";
import SortBox from "../SortBox/SortBox";

export default function Content() {
  const { setSelectWebtoon, setWebtoonDetail, WebtoonData } =
    useContext(StateContext);
  const [sortWebtoon, setSortWebtoon] = useState([...WebtoonData]);
  const [originalWebtoon, setOriginalWebtoon] = useState([...WebtoonData]);
  const [selectWeek, setSelectWeek] = useState("All");
  const [searchWord, setSearchWord] = useState("");
  const [searchCheck, setSearchCheck] = useState(false);

  function clickWebtoon(webtoon) {
    setSelectWebtoon(webtoon);
    setWebtoonDetail(true);
  }

  useEffect(() => {
    if (selectWeek === "All") {
      setSortWebtoon(originalWebtoon);
    } else {
      let AfterSort = originalWebtoon.filter((item) => item.day === selectWeek);
      setSortWebtoon(AfterSort);
    }
  }, [selectWeek, originalWebtoon]);

  useEffect(() => {
    if (searchWord !== "") {
      let AfterSort = originalWebtoon.filter((item) =>
        item.webtoon.includes(searchWord)
      );
      setSortWebtoon(AfterSort);
    } else {
      setSortWebtoon(originalWebtoon);
    }
  }, [searchCheck, searchWord]);

  return (
    <div className={styles.ContentWrapper}>
      <SortBox
        selectWeek={selectWeek}
        setSelectWeek={setSelectWeek}
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        searchCheck={searchCheck}
        setSearchCheck={setSearchCheck}
      />
      <div className={styles.MainContent}>
        {sortWebtoon.map((item) => (
          <div
            className={styles.WebtoonDiv}
            key={item.id}
            onClick={() => clickWebtoon(item)}
          >
            <img
              className={styles.WebtoonImg}
              src={item.img === "" ? noImage : item.img}
              alt={item.webtoon}
            />
            <p className={styles.WebtoonTitle}>
              {`${
                item.webtoon.length > 6
                  ? item.webtoon.slice(0, 6) + "..."
                  : item.webtoon
              }`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
