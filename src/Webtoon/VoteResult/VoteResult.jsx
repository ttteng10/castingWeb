import { useState, useEffect } from "react";
import styles from "./VoteResult.module.css";
import { getActorByWebtoonId } from "../../Data/supabaseClient";
import arrowBack from "../../assets/icons/arrow_back.svg";

export default function VoteResult({
  webtoonId,
  setVoteCheck,
  clickCharacter,
}) {
  const [rank, setRank] = useState([]);

  useEffect(() => {
    const fetchActors = async () => {
      let newWebtoonCharacters = await getActorByWebtoonId(webtoonId);
      setRank(newWebtoonCharacters);
    };
    fetchActors();
    rank.sort((a, b) => b.vote - a.vote);
  }, []);
  return (
    <div className={styles.VoteResultWrapper}>
      <div className={styles.selectCharcter}>
        <h4>배역 : {clickCharacter}</h4>
      </div>
      <div className={styles.BackBtn} onClick={() => setVoteCheck(false)}>
        <img src={arrowBack} className={styles.arrowIcon} />
        <h4>투표</h4>
      </div>
      {rank.map((item, idx) => (
        <div className={styles.VoteDiv} key={item.id}>
          <p className={styles.VoteRank}>{idx + 1}.</p>
          <img src={item.actorImg} className={styles.VoteImg} />
          <div className={styles.VoteInforms}>
            <p className={styles.VoteInform}>{item.actor}</p>
            <p className={styles.VoteInform}>{item.vote}표</p>
          </div>
        </div>
      ))}
    </div>
  );
}
