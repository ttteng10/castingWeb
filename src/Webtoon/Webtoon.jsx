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
      <div className={styles.WebtoonDescription}>
        <div className={styles.WebtoonHeader}>
          <div
            className={styles.BackBtnWrapper}
            onClick={() => setWebtoonDetail(false)}
          >
            <img src={arrowBack} alt="backButton" className={styles.BackIcon} />
          </div>
        </div>
        <div className={styles.WebtoonImgWrapper}>
          <img
            src={selectWebtoon.img === "" ? noImage : selectWebtoon.img}
            alt="webtoonIMG"
            className={styles.WebtoonImg}
          />
        </div>
        <div className={styles.WebtoonInforms}>
          <p className={styles.WebtoonInform}>제목 : {selectWebtoon.webtoon}</p>
          <p className={styles.WebtoonInform}>
            연재 플랫폼 : {selectWebtoon.platform}
          </p>
          <p className={styles.WebtoonInform}>
            연재 요일 : {selectWebtoon.day}
          </p>
        </div>
      </div>
      <div className={styles.WebtoonCharacter}>
        <CharacterVote />
      </div>
    </div>
  );
}
