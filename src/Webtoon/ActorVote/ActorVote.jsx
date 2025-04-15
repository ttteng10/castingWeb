import { useState, useEffect, useContext } from "react";
import styles from "./ActorVote.module.css";
import VoteResult from "../VoteResult/VoteResult";
import { ActorAdd } from "../ActorAdd/ActorAdd";
import noImage from "../../assets/images/noImage.png";
import { getActorByWebtoonId, incrementVote } from "../../Data/supabaseClient";
import { StateContext } from "../../Home/Home/Home";

export default function ActorVote({
  actors,
  setPageState,
  clickCharacter,
  clickID,
  characterID,
}) {
  const [actorData, setActorData] = useState(actors);
  const [actorVote, setActorVote] = useState(null);
  const [voteCheck, setVoteCheck] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { selectWebtoon } = useContext(StateContext);
  useEffect(() => {
    const fetchActors = async () => {
      let newCharacterActors = await getActorByWebtoonId(clickID, characterID);
      setActorData(newCharacterActors);
    };
    fetchActors();
  }, [showDialog]);

  function actorClick(actorId) {
    setActorVote(actorId);
  }
  async function voteClick() {
    if (actorVote !== null) {
      await incrementVote(actorVote);
      setVoteCheck(true);
    }
  }

  return (
    <>
      {!voteCheck && (
        <div className={styles.Container}>
          <div className={styles.selectCharcter}>
            <h4>배역 : {clickCharacter}</h4>
          </div>
          <div className={styles.VoteBtns}>
            <div
              className={styles.BackBtn}
              onClick={() => setPageState("Character")}
            >
              <h4>취소</h4>
            </div>
            <div
              className={styles.AddBtn}
              onClick={() => setShowDialog(!showDialog)}
            >
              <h4>추가</h4>
            </div>
            <div className={styles.BackBtn} onClick={() => setVoteCheck(true)}>
              <h4>현재 순위</h4>
            </div>
            <div className={styles.VoteBtn} onClick={() => voteClick()}>
              <h4>투표</h4>
            </div>
          </div>
          <div className={styles.ActorVoteWrapper}>
            {actorData.map((item) => (
              <div
                className={`${styles.ActorDiv} ${
                  actorVote === item.id ? styles.ActorSelected : ""
                }`}
                key={item.id}
                onClick={() => actorClick(item.id)}
              >
                <img
                  className={styles.ActorImg}
                  src={item.actorImg === "" ? noImage : item.actorImg}
                  alt={item.actor}
                />
                <p className={styles.ActorName}>{`${
                  item.actor.length > 6
                    ? item.actor.slice(0, 6) + "..."
                    : item.actor
                }`}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {showDialog && (
        <ActorAdd setShowDialog={setShowDialog} characterID={characterID} />
      )}
      {voteCheck && (
        <VoteResult
          webtoonId={selectWebtoon.id}
          setVoteCheck={setVoteCheck}
          clickCharacter={clickCharacter}
          characterID={characterID}
        />
      )}
    </>
  );
}
