import styles from "./HelpDetail.module.css";
import { useState } from "react";

export default function HelpDetail({ title, state, detail, password, answer }) {
  const [nowPW, setNowPW] = useState("");
  const [checkPW, setCheckPW] = useState(false);

  function clickCheck() {
    if (nowPW === password) {
      setCheckPW(true);
    }
  }
  return (
    <div className={styles.HelpDetailWrapper}>
      {!checkPW && (
        <div className={styles.passwordWrapper}>
          <p className={styles.passwordLabel}>비밀번호 입력해주세요</p>
          <input
            type="password"
            className={styles.passwordInput}
            onChange={(e) => setNowPW(e.target.value)}
          />
          <div className={styles.checkBtn} onClick={clickCheck}>
            확인
          </div>
        </div>
      )}
      {checkPW && (
        <>
          <div className={styles.DetailTitle}>
            <div className={styles.DetailHeader}>제목</div>
            <div className={styles.DetailContent}>{title}</div>
          </div>
          <div className={styles.DetailState}>
            <div className={styles.DetailHeader}>상태</div>
            <div className={styles.DetailContent}>{state}</div>
          </div>
          <div className={styles.DetailTotal}>
            <div className={styles.DetailHeader}>문의 내용</div>
            <div className={styles.DetailContent}>{detail}</div>
          </div>
          <div className={styles.DetailTotal}>
            <div className={styles.DetailHeader}>답변</div>
            <div className={styles.DetailContent}>{answer}</div>
          </div>
        </>
      )}
    </div>
  );
}
