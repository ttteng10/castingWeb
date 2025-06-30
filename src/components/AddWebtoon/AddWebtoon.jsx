import { useState, useRef } from "react";
import Select from "react-select";
import styles from "./AddWebtoon.module.css";
import { useNavigate } from "react-router-dom";
import { addWebtoon, addWebtoonImg } from "../../data/supabaseClient";

const platforms = [
  { value: "naver", label: "네이버" },
  { value: "kakao", label: "카카오" },
  { value: "lezhin", label: "레진코믹스" },
  { value: "others", label: "기타" },
];
const days = [
  { value: "mon", label: "월요일" },
  { value: "tue", label: "화요일" },
  { value: "wed", label: "수요일" },
  { value: "thu", label: "목요일" },
  { value: "fri", label: "금요일" },
  { value: "sat", label: "토요일" },
  { value: "sun", label: "일요일" },
  { value: "others", label: "기타" },
];

export default function AddWebtoon() {
  const navigate = useNavigate();
  const [webtoon, setWebtoon] = useState("");
  const [platform, setPlatform] = useState(platforms[0].value);
  const [day, setDay] = useState(days[0].value);
  const [imgfile, setImgFile] = useState(null);

  const textInputRef = useRef(null);
  const fileInputRef = useRef(null);

  function handleWebtoon(e) {
    setWebtoon(e.target.value);
  }

  function handlePlatform(e) {
    const newValue = e.value;
    setPlatform(newValue);
  }

  function handleDay(e) {
    const newValue = e.value;
    setDay(newValue);
  }

  function handleDivClick() {
    fileInputRef.current.click();
  }

  function handleFileChange(e) {
    const inputFile = e.target.files[0];
    if (inputFile) {
      setImgFile(inputFile);
    }
  }
  async function handleAdd() {
    if (webtoon === "") {
      textInputRef.current.focus();
      return;
    }
    if (imgfile === null) {
      alert("이미지 파일을 추가해주세요");
      return;
    }
    const imgURL = await addWebtoonImg(imgfile);
    let existCheck = await addWebtoon(webtoon, platform, day, imgURL); // ✅ imgURL을 제대로 전달
    if (existCheck === "exist") {
      alert("이미 존재하는 웹툰입니다.");
      return;
    } else {
      navigate("/");
    }
  }

  function handleCancel() {
    navigate("/");
  }
  return (
    <>
      <div className={styles.AddModalWrapper}>
        <div className={styles.AddModalHeader}>웹툰 기본 정보</div>
        <InputBlock label="웹툰">
          <input
            type="text"
            className={styles.inputText}
            ref={textInputRef}
            value={webtoon}
            onChange={handleWebtoon}
          />
        </InputBlock>

        <InputBlock label="연재 플랫폼">
          <Select
            options={platforms}
            defaultValue={platforms[0]}
            onChange={handlePlatform}
            styles={{
              control: (styles) => ({
                ...styles,
                height: "40%",
              }),
            }}
          />
        </InputBlock>

        <InputBlock label="연재 요일">
          <Select
            options={days}
            defaultValue={days[0]}
            onChange={handleDay}
            styles={{
              control: (styles) => ({
                ...styles,
                height: "40%",
              }),
            }}
          />
        </InputBlock>

        <InputBlock label="사진">
          <div className={styles.ImgAddBtn} onClick={handleDivClick}>
            추가하기
          </div>
          {imgfile && <div>{URL.createObjectURL(imgfile)}</div>}
        </InputBlock>
        <div className={styles.AddButtons}>
          <div className={styles.ImgAddBtn} onClick={handleAdd}>
            웹툰추가
          </div>
          <div className={styles.ImgAddBtn} onClick={handleCancel}>
            취소하기
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

function InputBlock({ label, children }) {
  return (
    <div className={styles.AddWrapper}>
      <div className={styles.InputLabel}>
        <p className={styles.TagCss}>{label}</p>
      </div>
      <div className={styles.InputTag}>{children}</div>
    </div>
  );
}
