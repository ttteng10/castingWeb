import {
  useLoaderData,
  defer,
  Await,
  json,
  useNavigate,
} from "react-router-dom";
import { Suspense, useState } from "react";
import styles from "./Webtoons.module.css";
import { getAllWebtoons } from "../../data/supabaseClient";
import { useDispatch } from "react-redux";
import { webtoonIdAction } from "../../redux/WebtoonId";
import SortBar from "../../components/SortBar/SortBar";
import Loading from "../../components/Loading/Loading";

const platformMap = new Map([
  ["naver", "네이버"],
  ["kakao", "카카오"],
  ["lezhin", "레진코믹스"],
  ["others", "기타"],
]);

export default function Webtoons() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { webtoons } = useLoaderData();
  const [searchInput, setSearchInput] = useState("");
  const [sortType, setSortType] = useState("All");

  function handleWebtoonDetail(webtoon) {
    dispatch(webtoonIdAction.clickWebtoonId(webtoon));
    navigate(`/webtoonDetail/${webtoon.id}`);
  }

  return (
    <>
      <SortBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSortType={setSortType}
      />
      <Suspense fallback={<Loading />}>
        <Await resolve={webtoons}>
          {(webtoonData) => {
            const filteredData = webtoonData
              .filter((item) =>
                item.webtoon.toLowerCase().includes(searchInput.toLowerCase())
              )
              .filter((item) =>
                sortType === "All" ? true : item.platform === sortType
              );

            return (
              <div className={styles.WebtoonsContent}>
                <div className={styles.WebtoonsWrappper}>
                  {filteredData.map((item) => (
                    <div
                      key={item.id}
                      className={styles.WebtoonDiv}
                      onClick={() => handleWebtoonDetail(item)}
                    >
                      <img src={item.img} className={styles.WebtoonImg} />
                      <div className={styles.WebtoonInform}>
                        <p className={styles.WebtoonTitle}>
                          제목 :{" "}
                          {item.webtoon.length < 10
                            ? item.webtoon
                            : item.webtoon.slice(0, 10) + "..."}
                        </p>
                        <p className={styles.WebtoonPlatform}>
                          플랫폼 : {platformMap.get(item.platform)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}

export function loader() {
  return defer({
    webtoons: loadWebtoons(),
  });
}

async function loadWebtoons() {
  const webtoons = await getAllWebtoons();
  if (!Array.isArray(webtoons)) {
    return json(
      { message: "웹툰 데이터를 불러올 수 없습니다." },
      { status: 500 }
    );
  }
  return webtoons;
}
