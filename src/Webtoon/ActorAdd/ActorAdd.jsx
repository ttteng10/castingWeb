import { useState, useContext } from "react";
import styles from "./ActorAdd.module.css";
import {
  addCharacter,
  addCharacterImg,
  addActor,
  addActorImg,
} from "../../Data/supabaseClient";
import { StateContext } from "../../Home/Home/Home";

export function ActorAdd({ setShowDialog }) {
  const [imgfile, setImgfile] = useState("");
  const [actorName, setActorName] = useState("");
  const { selectWebtoon } = useContext(StateContext);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImgfile(file);
    }
  };

  const handleNameChange = (event) => {
    setActorName(event.target.value);
  };

  async function handleAdd() {
    if (!imgfile || !actorName.trim()) {
      alert("이미지와 이름을 입력해주세요!");
      return;
    }
    // 여기에서 데이터 저장 로직 실행 가능 (예: 부모 컴포넌트로 데이터 전달)
    const imgURL = await addActorImg(imgfile); // ✅ 업로드 완료 후 URL 받기
    if (!imgURL) {
      console.error("Image upload failed");
      return;
    }

    let existCheck = await addActor(selectWebtoon.id, actorName, imgURL); // ✅ imgURL을 제대로 전달
    if (existCheck === "exist") {
      alert("이미 존재하는 배우입니다.");
    } else {
      setShowDialog(false);
    }
  }
  return (
    <dialog className={styles.ActorAddWrapper}>
      <div>
        <div className={styles.inputWrapper}>
          <label>배우 사진</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <div className={styles.inputWrapper}>
          <label>배우 이름</label>
          <input type="text" onChange={handleNameChange} />
        </div>
      </div>
      <div className={styles.DialogBtns}>
        <div className={styles.DialogBtn} onClick={() => setShowDialog(false)}>
          취소
        </div>
        <div className={styles.DialogBtn} onClick={handleAdd}>
          추가
        </div>
      </div>
    </dialog>
  );
}

export function CharacterAdd({ setShowDialog }) {
  const [imgfile, setImgfile] = useState("");
  const [characterName, setCharacterName] = useState("");
  const { selectWebtoon } = useContext(StateContext);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImgfile(file);
    }
  };

  const handleNameChange = (event) => {
    setCharacterName(event.target.value);
  };

  async function handleAdd() {
    if (!imgfile || !characterName.trim()) {
      alert("이미지와 이름을 입력해주세요!");
      return;
    }
    // 여기에서 데이터 저장 로직 실행 가능 (예: 부모 컴포넌트로 데이터 전달)
    const imgURL = await addCharacterImg(imgfile); // ✅ 업로드 완료 후 URL 받기
    if (!imgURL) {
      console.error("Image upload failed");
      return;
    }

    let existCheck = await addCharacter(
      selectWebtoon.id,
      characterName,
      imgURL
    ); // ✅ imgURL을 제대로 전달
    if (existCheck === "exist") {
      alert("이미 존재하는 등장인물입니다.");
    } else {
      setShowDialog(false);
    }
  }
  return (
    <dialog className={styles.ActorAddWrapper}>
      <div>
        <div className={styles.inputWrapper}>
          <label>등장인물 사진</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <div className={styles.inputWrapper}>
          <label>등장인물 이름</label>
          <input type="text" onChange={handleNameChange} />
        </div>
      </div>
      <div className={styles.DialogBtns}>
        <div className={styles.DialogBtn} onClick={() => setShowDialog(false)}>
          취소
        </div>
        <div className={styles.DialogBtn} onClick={handleAdd}>
          추가
        </div>
      </div>
    </dialog>
  );
}
