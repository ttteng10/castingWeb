import { useState, useContext, useEffect } from "react";
import styles from "./CharacterVote.module.css";
import ActorVote from "../ActorVote/ActorVote";
import { StateContext } from "../../Home/Home/Home";
import noImage from "../../assets/images/noImage.png";
import personAdd from "../../assets/icons/personAdd.png";
import { CharacterAdd } from "../ActorAdd/ActorAdd";
import {
  getCharactersByWebtoonId,
  getActorByWebtoonId,
} from "../../Data/supabaseClient";

export default function CharacterVote() {
  const { selectWebtoon } = useContext(StateContext);
  const [pageState, setPageState] = useState("Character");
  const [actors, setActors] = useState([]);
  const [clickCharacter, setClickCharacter] = useState();
  const [clickID, setClickID] = useState();
  const [characterID, setCharacterID] = useState();
  const [showDialog, setShowDialog] = useState(false);
  const [webtoonCharacters, setWebtoonCharacters] = useState(
    // selectWebtoon.characters
    []
  );

  useEffect(() => {
    const fetchCharacters = async () => {
      let newWebtoonCharacters = await getCharactersByWebtoonId(
        selectWebtoon.id
      );
      setWebtoonCharacters(newWebtoonCharacters);
    };
    fetchCharacters();
  }, [showDialog]);

  async function characterClick(webtoonID, name, characterID) {
    let newActors = await getActorByWebtoonId(webtoonID, characterID);
    setActors(newActors);
    setClickCharacter(name);
    setPageState("Actor");
    setClickID(webtoonID);
    setCharacterID(characterID);
  }
  return (
    <div className={styles.VoteWrapper}>
      {pageState === "Character" && (
        <>
          {webtoonCharacters.map((item) => (
            <div
              className={styles.CharacterDiv}
              key={item.id}
              onClick={() => characterClick(item.webtoonId, item.name, item.id)}
            >
              <img
                className={styles.CharacterImg}
                src={item.img === "" ? noImage : item.img}
                alt={item.name}
              />
              <p className={styles.CharacterName}>{`${
                item.name.length > 6 ? item.name.slice(0, 6) + "..." : item.name
              }`}</p>
            </div>
          ))}
          <div
            className={styles.CharacterDiv}
            onClick={() => setShowDialog(true)}
          >
            <div className={styles.CharacterImgAdd}>
              <img
                className={styles.CharacterAdd}
                src={personAdd}
                alt="CharacterAdd"
              />
            </div>
            <p className={styles.CharacterName}>인물 추가</p>
          </div>
        </>
      )}
      {showDialog && <CharacterAdd setShowDialog={setShowDialog} />}
      {pageState === "Actor" && (
        <ActorVote
          actors={actors}
          setPageState={setPageState}
          clickCharacter={clickCharacter}
          clickID={clickID}
          characterID={characterID}
        />
      )}
    </div>
  );
}
