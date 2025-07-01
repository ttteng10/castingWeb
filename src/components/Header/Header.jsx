import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

const Menulist = [
  { menu: "웹툰목록", url: "/" },
  { menu: "웹툰추가", url: "webtoonAdd" },
  // { menu: "문의하기", url: "help" },
];

export default function Header() {
  const naivgate = useNavigate();

  function handleHome() {
    naivgate("/");
  }
  return (
    <div className={styles.HeaderWrapper}>
      <div className={styles.TitleWrapper} onClick={handleHome}>
        <p className={styles.HeaderTitle}>내맘대로 캐스팅</p>
      </div>
      <div className={styles.Menus}>
        {Menulist.map((item) => (
          <div key={item.url} className={styles.MenuBtn}>
            <NavLink
              to={item.url}
              className={({ isActive }) =>
                isActive ? styles.active : styles.linkTag
              }
            >
              <p className={styles.MenuName}>{item.menu}</p>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
