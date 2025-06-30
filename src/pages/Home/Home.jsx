import Webtoons from "../../components/Webtoons/Webtoons";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.HomeWrapper}>
      <div className={styles.HomeContent}>
        <Webtoons />
      </div>
    </div>
  );
}
