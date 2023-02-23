import { PromoVideo } from "components/shared/PromoVideo/PromoVideo";
import { useState } from "react";
import Link from "next/link";

export const Info = () => {
  const [play, setPlay] = useState(false);
  const url = play
    ? "https://www.youtube.com/embed/K1yp7Q1hH1c?autoplay=1"
    : "";
  return (
    <>
      {/* <!-- BEGIN INFO BLOCKS --> */}
      <div className="info-blocks" style={{ marginTop: "60px" }}>
        <div
          className="info-blocks__item js-img"
          style={{ backgroundImage: `url('/assets/img/info-item-bg1.jpg')` }}
        >
          <div className="wrapper">
            <div className="info-blocks__item-img">
              <img
                src="/assets/img/info-item-img1.jpg"
                className="js-img"
                alt=""
              />
            </div>
            <div className="info-blocks__item-text">
              <span className="saint-text">Кто мы такие ?</span>
              <h4>Мы лучшие в прогнозировании котировок акций компаний</h4>
              <p>
              Опыт показывает, что абсолютно любой инвестор хотел бы иметь
              в своем арсенале инструмент, способный на основе огромного объема данных
              смог бы дать точную и надежную оценку будущего сотояния той или иной акции.
              Это только бы не только улучшило торговые показатели независимых пользователей,
              но и привело бы к упрощению всего процесса торговли. Инвесторам больше не пришлось бы проводить
              высокозатратный технический анализ самостоятельно и брать весь риск на себя и собственные знания.
              Теперь эта задача будет легко решаться с помощью мощного и высокотехнологичного средства – машинного
              обучения.


              </p>
              <p>
                Испытайте мощность новых технологий прямо сейчас!
              </p>
              <Link href="/shop">
                <a className="btn">Заказать прогноз</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- INFO BLOCKS EOF   --> */}
    </>
  );
};
