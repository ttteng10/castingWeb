import {
  useLoaderData,
  defer,
  Await,
  json,
  useNavigate,
} from "react-router-dom";
import { Suspense, useState } from "react";
import styles from "./Vote.module.css";
import { getActorByWebtoonId, incrementVote } from "../../data/supabaseClient";
import Loading from "../../components/Loading/Loading";
import { useSelector } from "react-redux";
import { AddActor } from "../../components/AddModal/AddModal";

export default function Vote() {
  const navigate = useNavigate();
  const { actors } = useLoaderData();
  const webtoonData = useSelector((state) => state.webtoon.webtoon);
  const characterData = useSelector((state) => state.character.characterData);
  const webtoonName = useSelector((state) => state.character.webtoonName);

  const [voteId, setVoteId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  function clickActor(actorId) {
    setVoteId(actorId);
  }

  async function handleVote() {
    if (voteId !== null) {
      await incrementVote(voteId);
      setVoteId(null);
      navigate(`/webtoonResult/${webtoonData.id}/${characterData.id}`);
    } else {
      alert("투표할 배우를 선택해주세요");
    }
  }

  function handleAdd() {
    setModalVisible(true);
  }

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={actors}>
        {(actorsData) => (
          <div className={styles.VoteWrapper}>
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
                <p className={styles.DetailWord}>
                  캐스팅 하고 싶은 배우를 선택 및 추가해주세요
                </p>
                <div className={styles.Buttons}>
                  <div className={styles.VoteBtn} onClick={handleAdd}>
                    추가하기
                  </div>
                  <div className={styles.VoteBtn} onClick={handleVote}>
                    투표하기
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.VoteContent}>
              {actorsData.map((item) => (
                <div
                  key={item.id}
                  className={styles.ActorDiv}
                  onClick={() => clickActor(item.id)}
                >
                  <img
                    src={item.actorImg}
                    className={`${styles.ActorImg} ${
                      voteId === item.id ? styles.ActorSelected : ""
                    }`}
                  />
                  <div className={styles.ActorInform}>
                    <p className={styles.ActorTitle}>
                      이름 :
                      {item.actor.length < 10
                        ? item.actor
                        : item.actor.slice(0, 10) + "..."}
                    </p>
                    <p className={styles.ActorTitle}>추천 : {item.vote}</p>
                  </div>
                </div>
              ))}
            </div>
            {modalVisible && (
              <AddActor
                setModalVisible={setModalVisible}
                webtoonId={webtoonData.id}
                characterId={characterData.id}
              />
            )}
          </div>
        )}
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
