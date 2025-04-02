import { useState, useEffect } from "react";
import styles from "./Help.module.css";

export default function Help() {
  const [helpState, setHelpState] = useState(true);
  return (
    <div className={styles.HelpWrapper}>
      <p className={styles.HelpWord}>
        원하는 웹툰을 선택해 주인공 배역에 어울리는 배우들을 추천해주세요!!!
      </p>
      <p className={styles.HelpWord}>문의사항 및 필요사항 남겨주세요!!!</p>
      <div className={styles.noticeBoard}>
        <div className={styles.noticeAdd}>
          <div className={styles.AddBtn} onClick={() => setHelpState(false)}>
            문의하기
          </div>
        </div>
        <div className={styles.notices}>
          <div className={styles.notice}></div>
        </div>
      </div>
    </div>
  );
}
