import styles from "./Start.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import homeImg from "../../assets/explainImg/home.png";
import charactersImg from "../../assets/explainImg/characters.png";
import actorsImg from "../../assets/explainImg/actors.png";
import resultImg from "../../assets/explainImg/result.png";
import characterAdd from "../../assets/explainImg/characterAdd.png";
import webtoonAdd from "../../assets/explainImg/webtoonAdd.png";

const explainBox = [
  {
    image: homeImg,
    description: "원하시는 웹툰을 선택해주세요",
  },
  {
    image: charactersImg,
    description: "원하시는 캐릭터를 선택해주세요",
  },
  {
    image: actorsImg,
    description: "원하시는 배우를 골라 투표해주세요",
  },
  {
    image: resultImg,
    description: "선택하신 배우의 순위를 확인하세요",
  },
  {
    image: webtoonAdd,
    description: "원하는 웹툰을 직접 추가해보세요",
  },
  {
    image: characterAdd,
    description: "웹툰 캐릭터와 어울리는 배우를 직접 추가해보세요",
  },
];

export default function Start({ setExplain }) {
  function handleStart() {
    setExplain(false);
  }
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className={styles.startWrapper}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.titleDiv}>내 맘대로 캐스팅</h1>
      </div>
      <div className={styles.imageSlider}>
        <Slider {...settings}>
          {explainBox.map((item) => (
            <div className={styles.sliderDiv}>
              <img src={item.image} className={styles.sliderImg} />
              <p className={styles.sliderDes}>{item.description}</p>
            </div>
          ))}
        </Slider>
      </div>
      <div className={styles.buttonWrapper}>
        <div className={styles.startBtn} onClick={handleStart}>
          시작하기
        </div>
      </div>
    </div>
  );
}
