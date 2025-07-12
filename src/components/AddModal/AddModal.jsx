import { useState, useRef, useEffect } from "react";
import styles from "./AddModal.module.css";
import {
  addActor,
  addActorImg,
  addCharacter,
  addCharacterImg,
} from "../../data/supabaseClient";
import { useNavigate } from "react-router-dom";

export function AddModal({ setModalVisible, webtoonId }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [imgfile, setImgFile] = useState(null);
  const fileInputRef = useRef(null);
  const nameInputRef = useRef(null);

  function handleDivClick() {
    fileInputRef.current.click();
  }

  function handleFileChange(e) {
    const inputFile = e.target.files[0];
    if (inputFile) {
      setImgFile(inputFile);
    }
  }

  function handleName(e) {
    const newName = e.target.value;
    setName(newName);
  }

  async function handleAdd() {
    if (name === "") {
      nameInputRef.current.focus();
      return;
    }

    if (imgfile === null) {
      alert("이미지 입력해주세요");
      return;
    }

    const imgUrl = await addCharacterImg(imgfile);
    const result = await addCharacter(webtoonId, name, imgUrl);
    if (result === "exist") {
      alert("이미 존재하는 캐릭터입니다.");
      return;
    } else {
      setModalVisible(false);
      // navigate(0);
      navigate(`/webtoonDetail/${webtoonId}`);
    }
  }

  function handleCancel() {
    setModalVisible(false);
  }
  useEffect(() => {
    function handlePaste(e) {
      const items = e.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf("image") !== -1) {
          const file = item.getAsFile();
          if (file) {
            setImgFile(file);
          }
        }
      }
    }

    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, []);
  return (
    <>
      <div className={styles.AddModalWrapper}>
        <div className={styles.InputImgWrapper} onClick={handleDivClick}>
          {imgfile === null ? (
            <div className={styles.InputImg}>
              <p className={styles.InputImgText}>이미지 추가</p>
              <p className={styles.InputImgText}>(복사 붙이기 가능)</p>
            </div>
          ) : (
            <img
              src={URL.createObjectURL(imgfile)}
              className={styles.InputImg}
            />
          )}
        </div>
        <div className={styles.InputNameWrapper}>
          <div className={styles.InputLabel}>캐릭터를 추가해주세요</div>
          <input
            type="text"
            value={name}
            ref={nameInputRef}
            onChange={(e) => handleName(e)}
            className={styles.InputText}
          />
          <div className={styles.Buttons}>
            <div className={styles.Btn} onClick={handleAdd}>
              추가
            </div>
            <div className={styles.Btn} onClick={handleCancel}>
              취소
            </div>
          </div>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </>
  );
}

export function AddActor({ setModalVisible, webtoonId, characterId }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [imgfile, setImgFile] = useState(null);
  const fileInputRef = useRef(null);
  const nameInputRef = useRef(null);

  function handleDivClick() {
    fileInputRef.current.click();
  }

  function handleFileChange(e) {
    const inputFile = e.target.files[0];
    if (inputFile) {
      setImgFile(inputFile);
    }
  }

  function handleName(e) {
    const newName = e.target.value;
    setName(newName);
  }

  async function handleAdd() {
    if (name === "") {
      nameInputRef.current.focus();
      return;
    }

    if (imgfile === null) {
      alert("이미지 입력해주세요");
      return;
    }

    const imgUrl = await addActorImg(imgfile);
    const result = await addActor(webtoonId, name, imgUrl, characterId);
    if (result === "exist") {
      alert("이미 존재하는 배우입니다.");
      return;
    } else {
      setModalVisible(false);
      navigate(`/webtoonVote/${webtoonId}/${characterId}`);
    }
  }

  function handleCancel() {
    setModalVisible(false);
  }
  useEffect(() => {
    function handlePaste(e) {
      const items = e.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf("image") !== -1) {
          const file = item.getAsFile();
          if (file) {
            setImgFile(file);
          }
        }
      }
    }

    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, []);
  return (
    <>
      <div className={styles.AddModalWrapper}>
        <div className={styles.InputImgWrapper} onClick={handleDivClick}>
          {imgfile === null ? (
            <div className={styles.InputImg}>
              <p className={styles.InputImgText}>이미지 추가</p>
              <p className={styles.InputImgText}>(복사 붙이기 가능)</p>
            </div>
          ) : (
            <img
              src={URL.createObjectURL(imgfile)}
              className={styles.InputImg}
            />
          )}
        </div>
        <div className={styles.InputNameWrapper}>
          <div className={styles.InputLabel}>배우를 추가해주세요</div>
          <input
            type="text"
            value={name}
            ref={nameInputRef}
            onChange={(e) => handleName(e)}
            className={styles.InputText}
          />
          <div className={styles.Buttons}>
            <div className={styles.Btn} onClick={handleAdd}>
              추가
            </div>
            <div className={styles.Btn} onClick={handleCancel}>
              취소
            </div>
          </div>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </>
  );
}
