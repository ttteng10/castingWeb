import { useState, useEffect } from "react";
import styles from "./VoteResult.module.css";
import { getActorByWebtoonId } from "../../Data/supabaseClient";

export default function VoteResult({ webtoonId }) {
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
      {rank.map((item, idx) => (
        <div className={styles.VoteDiv} key={item.id}>
          <p className={styles.VoteRank}>{idx + 1}.</p>
          <img src={item.actorImg} className={styles.VoteImg} />
          <p className={styles.VoteInform}>{item.actor}</p>
          <p className={styles.VoteInform}>{item.vote}표</p>
        </div>
      ))}
    </div>
  );
}
