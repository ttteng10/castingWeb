import styles from "./WebtoonAdd.module.css";
import noImage from "../../assets/images/noImage.png";
import { useState, useContext } from "react";
import { addWebtoon, addWebtoonImg } from "../../Data/supabaseClient";
import { StateContext } from "../../Home/Home/Home";

export default function WebtoonAdd() {
  const [webtoon, setWebtoon] = useState("");
  const [platform, setPlatform] = useState("");
  const [day, setDay] = useState("Mon");
  const [img, setImg] = useState("");
  const [file, setFile] = useState(null);
  const { setHeaderState } = useContext(StateContext);

  function handleWebtoon(e) {
    setWebtoon(e.target.value);
  }
  function handlePlatform(e) {
    setPlatform(e.target.value);
  }
  function handleDay(e) {
    setDay(e.target.value);
  }
  const handleImageClick = () => {
    document.getElementById("fileInput").click(); // input[type="file"] 클릭
  };

  const handleFileChange = (e) => {
    const inputFile = e.target.files[0];
    if (inputFile) {
      setImg(URL.createObjectURL(inputFile));
      setFile(inputFile);
    }
  };

  async function addClick() {
    if (!file) {
      console.error("No file selected");
      return;
    }

    const imgURL = await addWebtoonImg(file); // ✅ 업로드 완료 후 URL 받기
    if (!imgURL) {
      console.error("Image upload failed");
      return;
    }

    let existCheck = await addWebtoon(webtoon, platform, day, imgURL); // ✅ imgURL을 제대로 전달
    if (existCheck === "exist") {
      alert("이미 존재하는 웹툰입니다.");
    }
    setHeaderState("series");
  }

  return (
    <div className={styles.WebtoonAddWrapper}>
      <div className={styles.WebtoonDescription}>
        <div
          className={styles.WebtoonImgWrapper}
          onClick={(e) => handleImageClick(e)}
        >
          <img
            src={img || noImage}
            alt="webtoonIMG"
            className={styles.WebtoonImg}
          />
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
      </div>
      <div className={styles.WebtoonInform}>
        <div className={styles.inputWrapper}>
          <label>제목</label>
          <input type="text" onChange={(e) => handleWebtoon(e)} />
        </div>
        <div className={styles.inputWrapper}>
          <label>플랫폼</label>
          <input type="text" onChange={(e) => handlePlatform(e)} />
        </div>
        <div className={styles.inputWrapper}>
          <label>요일</label>
          <select onChange={(e) => handleDay(e)}>
            <option value="Mon">월요일</option>
            <option value="Tue">화요일</option>
            <option value="Wed">수요일</option>
            <option value="Thu">목요일</option>
            <option value="Fri">금요일</option>
            <option value="Sat">토요일</option>
            <option value="Sun">일요일</option>
          </select>
        </div>
        <div className={styles.btnWrapper}>
          <div className={styles.addBtn} onClick={addClick}>
            추가하기
          </div>
        </div>
      </div>
    </div>
  );
}
