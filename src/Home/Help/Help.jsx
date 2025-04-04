import { useState, useEffect } from "react";
import styles from "./Help.module.css";
import { addHelpRequest, getAllHelpRequests } from "../../Data/supabaseClient";
import HelpDetail from "./HelpDetail";

export default function Help() {
  const [helpState, setHelpState] = useState(true);
  const [requestTitle, setRequestTitle] = useState("");
  const [requestPW, setRequestPW] = useState("");
  const [requestDetail, setRequestDetail] = useState("");
  const [allRequest, setAllRequest] = useState([]);
  const [clickDetail, setClickDetail] = useState(false);
  const [selectDetail, setSelectDetail] = useState("");
  const [selectPW, setSelectPW] = useState("");
  const [selectTitle, setSelectTitle] = useState("");
  const [selectState, setSelectState] = useState("");
  const [selectAnswer, setSelectAnswer] = useState("");

  async function requestClick() {
    if (requestTitle === "") {
      alert("문의사항 제목을 입력해주세요");
      return;
    }
    if (requestPW === "") {
      alert("문의사항 비밀번호를 입력해주세요");
      return;
    }
    if (requestDetail === "") {
      alert("문의사항 내용을 입력해주세요");
      return;
    }
    if (requestTitle !== "" && requestDetail !== "") {
      await addHelpRequest(requestTitle, requestDetail, requestPW);
      setHelpState(true);
    }
  }

  function noticeClick(title, state, detail, password, answer) {
    setSelectTitle(title);
    setSelectState(state);
    setSelectDetail(detail);
    setSelectPW(password);
    setSelectAnswer(answer);
    setClickDetail(true);
  }

  useEffect(() => {
    const fetchHelpRequests = async () => {
      let newHelpRequests = await getAllHelpRequests();
      setAllRequest([...newHelpRequests].sort((a, b) => b.id - a.id));
    };

    fetchHelpRequests();
  }, []);

  useEffect(() => {
    if (!helpState) return;

    const fetchHelpRequests = async () => {
      let newHelpRequests = await getAllHelpRequests();
      setAllRequest([...newHelpRequests].sort((a, b) => b.id - a.id));
    };

    fetchHelpRequests();
  }, [helpState]);

  return (
    <div className={styles.HelpWrapper}>
      <p className={styles.HelpWord}>
        원하는 웹툰을 선택해 주인공 배역에 어울리는 배우들을 추천해주세요!!!
      </p>
      <p className={styles.HelpWord}>문의사항 및 필요사항 남겨주세요!!!</p>
      <div className={styles.noticeBoard}>
        <div className={styles.noticeAdd}>
          {helpState && !clickDetail && (
            <div className={styles.AddBtn} onClick={() => setHelpState(false)}>
              문의하기
            </div>
          )}
          {!helpState && !clickDetail && (
            <div className={styles.helpBtns}>
              <div className={styles.AddBtn} onClick={() => setHelpState(true)}>
                취소
              </div>
              <div className={styles.AddBtn} onClick={() => requestClick()}>
                제출
              </div>
            </div>
          )}
          {helpState && clickDetail && (
            <div
              className={styles.AddBtn}
              onClick={() => setClickDetail(false)}
            >
              돌아가기
            </div>
          )}
        </div>
        {helpState && !clickDetail && (
          <div className={styles.notices}>
            <div className={styles.noticeHeader}>
              <div className={styles.headerTitle}>제목</div>
              <div className={styles.headerDetail}>내용</div>
              <div className={styles.headerState}>상태</div>
            </div>
            {allRequest.map((item) => {
              return (
                <div
                  key={item.id}
                  className={styles.notice}
                  onClick={() =>
                    noticeClick(
                      item.title,
                      item.state,
                      item.detail,
                      item.password,
                      item.answer
                    )
                  }
                >
                  <div className={styles.noticeTitle}>{item.title}</div>
                  <div className={styles.noticeDetail}>{`${
                    item.detail.length > 60
                      ? item.detail.slice(0, 60) + "..."
                      : item.detail
                  }`}</div>
                  <div className={styles.noticeState}>
                    {item.state === "wait" ? "처리중" : "처리완료"}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {!helpState && !clickDetail && (
          <div className={styles.noticeRequest}>
            <div className={styles.requestTitle}>
              <div className={styles.inputTitle}>제목</div>
              <input
                type="text"
                className={styles.inputTitle2}
                maxLength={100}
                onChange={(e) => setRequestTitle(e.target.value)}
              />
            </div>
            <div className={styles.requestTitle}>
              <div className={styles.inputTitle}>비밀번호</div>
              <input
                type="password"
                className={styles.inputTitle2}
                maxLength={100}
                onChange={(e) => setRequestPW(e.target.value)}
              />
            </div>
            <div className={styles.requestDetail}>
              <div className={styles.inputDetail}>문의내용</div>
              <textarea
                className={styles.inputDetail2}
                maxLength={1000}
                onChange={(e) => setRequestDetail(e.target.value)}
              />
            </div>
          </div>
        )}
        {clickDetail && (
          <HelpDetail
            title={selectTitle}
            state={selectState}
            detail={selectDetail}
            password={selectPW}
            answer={selectAnswer}
          />
        )}
      </div>
    </div>
  );
}
