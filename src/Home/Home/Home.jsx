import { createContext, useState, useEffect } from "react";

import Header from "../Header/Header";
import Title from "../Title/Title";
import styles from "./Home.module.css";
import Content from "../Content/Content";
import Help from "../Help/Help";
import Webtoon from "../../Webtoon/Webtoon";
import WebtoonAdd from "../../Webtoon/WebtoonAdd/WebtoonAdd";
import { WebtoonData } from "../../Data/Webtoons";
import { getAllWebtoons } from "../../Data/supabaseClient";

export const StateContext = createContext({
  HeaderState: "",
  setHeaderState: () => {},
  selectWebtoon: {},
  setSelectWebtoon: () => {},
  setWebtoonDetail: Boolean,
  WebtoonData: [],
});

export default function Home() {
  const [headerState, setHeaderState] = useState("series");
  const [webtoonDetail, setWebtoonDetail] = useState(false);
  const [selectWebtoon, setSelectWebtoon] = useState();
  const [webtoonData, setWebtoonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const stateValue = {
    HeaderState: headerState,
    setHeaderState: setHeaderState,
    selectWebtoon: selectWebtoon,
    setSelectWebtoon: setSelectWebtoon,
    setWebtoonDetail: setWebtoonDetail,
    WebtoonData: webtoonData,
  };

  useEffect(() => {
    const fetchWebtoons = async () => {
      setIsLoading(true);
      const newWebtoonData = await getAllWebtoons();

      if (Array.isArray(newWebtoonData)) {
        setWebtoonData([...newWebtoonData]);
      } else {
        console.error("Error: newWebtoonData is not an array", newWebtoonData);
        setWebtoonData([]);
      }
      setIsLoading(false);
    };

    fetchWebtoons();
  }, []); // ✅ 새로고침 시 실행 (처음 마운트될 때 실행)

  useEffect(() => {
    const fetchWebtoons = async () => {
      setIsLoading(true);
      const newWebtoonData = await getAllWebtoons();

      if (Array.isArray(newWebtoonData)) {
        setWebtoonData([...newWebtoonData]);
      } else {
        console.error("Error: newWebtoonData is not an array", newWebtoonData);
        setWebtoonData([]);
      }
      setIsLoading(false);
    };

    fetchWebtoons();
  }, [headerState]); // ✅ headerState 변경 시 실행

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <StateContext.Provider value={stateValue}>
      <div className={styles.HomeWrapper}>
        <Title />
        <Header />
        {headerState === "series" && !webtoonDetail && <Content />}
        {headerState === "add" && !webtoonDetail && <WebtoonAdd />}
        {headerState === "help" && !webtoonDetail && <Help />}
        {webtoonDetail && <Webtoon />}
      </div>
    </StateContext.Provider>
  );
}
