import {
  useLoaderData,
  defer,
  Await,
  json,
  useNavigate,
} from "react-router-dom";
import { Suspense, useState } from "react";
import { getCharactersByWebtoonId } from "../../data/supabaseClient";
import styles from "./Detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import { characterIdAction } from "../../redux/CharacterId";
import { AddModal } from "../../components/AddModal/AddModal";

const platformMap = new Map([
  ["naver", "네이버"],
  ["kakao", "카카오"],
  ["lezhin", "레진코믹스"],
  ["others", "기타"],
]);

export default function Detail() {
  const navigate = useNavigate();
  const { characters } = useLoaderData();
  const webtoonData = useSelector((state) => state.webtoon.webtoon);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  function handleVotepage(webtoonId, characterID, characterData) {
    dispatch(characterIdAction.selectCharacter(characterData));
    dispatch(characterIdAction.selectWebtoon(webtoonData.webtoon));
    navigate(`/webtoonVote/${webtoonId}/${characterID}`);
  }

  function handleAdd() {
    setModalVisible(true);
  }

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={characters}>
        {(characterData) => (
          <div className={styles.DetailWrapper}>
            <div className={styles.WebtoonInform}>
              <img className={styles.WebtoonInformImg} src={webtoonData.img} />
              <div className={styles.DetailInform}>
                <p className={styles.DetailTitle}>
                  웹툰 : {webtoonData.webtoon}
                </p>
                <p className={styles.DetailPlatform}>
                  플랫폼 : {platformMap.get(webtoonData.platform)}
                </p>
                <p className={styles.DetailWord}>
                  캐스팅 하고 싶은 캐릭터를 선택 및 추가해주세요
                </p>
                <div className={styles.AddBtn} onClick={handleAdd}>
                  추가하기
                </div>
              </div>
            </div>
            <div className={styles.DetailContentWrapper}>
              <div className={styles.DetailContent}>
                {characterData.map((item) => (
                  <div
                    key={item.id}
                    className={styles.CharacterDiv}
                    onClick={() =>
                      handleVotepage(item.webtoonId, item.id, item)
                    }
                  >
                    <img src={item.img} className={styles.CharacterImg} />
                    <div className={styles.CharacterInform}>
                      <p className={styles.CharacterTitle}>
                        이름 :{" "}
                        {item.name.length < 10
                          ? item.name
                          : item.name.slice(0, 10) + "..."}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {modalVisible && (
              <AddModal
                setModalVisible={setModalVisible}
                webtoonId={webtoonData.id}
              />
            )}
          </div>
        )}
      </Await>
    </Suspense>
  );
}

export function loader({ params }) {
  const webtoonId = params.id;
  return defer({
    characters: loadCharacters(webtoonId),
  });
}

async function loadCharacters(webtoonId) {
  const characters = await getCharactersByWebtoonId(webtoonId);
  if (!Array.isArray(characters)) {
    return json(
      { message: "캐릭터 데이터를 불러올 수 없습니다." },
      { status: 500 }
    );
  }
  return characters;
}
