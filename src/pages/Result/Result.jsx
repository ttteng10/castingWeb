import {
  useLoaderData,
  defer,
  Await,
  json,
  useNavigate,
} from "react-router-dom";
import { Suspense } from "react";
import styles from "./Result.module.css";
import Loading from "../../components/Loading/Loading";
import { getActorByWebtoonId } from "../../data/supabaseClient";
import { useSelector } from "react-redux";

export default function Result() {
  const { actors } = useLoaderData();
  const navigate = useNavigate();
  const characterData = useSelector((state) => state.character.characterData);
  const webtoonName = useSelector((state) => state.character.webtoonName);

  function handleNavigate() {
    navigate(`/webtoonDetail/${characterData.webtoonId}`);
  }

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={actors}>
        {(actorsData) => {
          const sortActorsData = actorsData.sort((a, b) => b.vote - a.vote);
          return (
            <div className={styles.ResultWrapper}>
              <div className={styles.WebtoonInform}>
                <img
                  className={styles.WebtoonInformImg}
                  src={characterData.img}
                />
                <div className={styles.DetailInform}>
                  <p className={styles.DetailTitle}>웹툰 : {webtoonName}</p>
                  <p className={styles.DetailTitle}>
                    배역 : {characterData.name}
                  </p>
                  <p className={styles.DetailWord}>현재 배역 순위</p>
                  <div className={styles.Buttons}>
                    <div className={styles.VoteBtn} onClick={handleNavigate}>
                      다른 배역 보기
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.ResultContent}>
                <div className={styles.ResultHeader}>
                  <div className={styles.HeaderImg}>이미지</div>
                  <div className={styles.HeaderName}>배우 이름</div>
                  <div className={styles.HeaderVote}>투표 수</div>
                </div>
                {sortActorsData.map((item) => (
                  <div key={item.id} className={styles.ResultDiv}>
                    <img
                      src={item.actorImg}
                      className={styles.ResultImg}
                      alt={item.actor}
                    />
                    <div className={styles.ResultName}>{item.actor}</div>
                    <div className={styles.ResultVote}>{item.vote}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}

export function loader({ params }) {
  const { webtoonId, characterId } = params;
  return defer({
    actors: loadActors(webtoonId, characterId),
  });
}

async function loadActors(webtoonId, characterId) {
  const actors = await getActorByWebtoonId(webtoonId, characterId);

  if (!Array.isArray(actors)) {
    return json(
      { message: "캐릭터 데이터를 불러올 수 없습니다." },
      { status: 500 }
    );
  }
  return actors;
}
