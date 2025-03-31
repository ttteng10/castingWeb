import { useContext } from "react";
import styles from "./Webtoon.module.css";
import { StateContext } from "../Home/Home/Home";
import arrowBack from "../assets/icons/arrow_back.svg";
import CharacterVote from "./CharacterVote/CharacterVote";
import noImage from "../assets/images/noImage.png";

export default function Webtoon() {
  const { selectWebtoon, setWebtoonDetail } = useContext(StateContext);
  return (
    <div className={styles.WebtoonWrapper}>
      <div className={styles.WebtoonHeader}>
        <div
          className={styles.BackBtnWrapper}
          onClick={() => setWebtoonDetail(false)}
        >
          <img src={arrowBack} alt="backButton" className={styles.BackIcon} />
        </div>
      </div>
      <div className={styles.WebtoonDescription}>
        <div className={styles.WebtoonImgWrapper}>
          <img
            src={selectWebtoon.img === "" ? noImage : selectWebtoon.img}
            alt="webtoonIMG"
            className={styles.WebtoonImg}
          />
        </div>
        <div className={styles.WebtoonInforms}>
          <div className={styles.WebtoonInforms2}>
            <p className={styles.WebtoonTitle}>
              제목 : {selectWebtoon.webtoon}
            </p>
            <p className={styles.WebtoonInform}>
              연재 플랫폼 : {selectWebtoon.platform}
            </p>
            <p className={styles.WebtoonInform}>
              연재 요일 : {selectWebtoon.day}
            </p>
          </div>
          <div className={styles.PageTip}>
            <p className={styles.PageTipInform}>
              원하는 웹툰 캐릭터에 어울리는 배우를 투표해주세요!!
            </p>
            <p className={styles.PageTipInform}>
              직접 원하는 웹툰 캐릭터와 배우를 추가해주세요!!!
            </p>
          </div>
        </div>
      </div>
      <div className={styles.WebtoonCharacter}>
        <CharacterVote />
      </div>
    </div>
  );
}
