import Link from "next/link";

export const Banner = () => {
  return (
    <>
      {/* <!-- BEGIN MAIN BLOCK --> */}
      <div className="main-block load-bg">
        <div className="wrapper">
          <div className="main-block__content">
            {/* <span className='saint-text'>Professional</span> */}
            <h1 className="main-text">Прогнозируй и зарабатывай</h1>
            <p>
              Мы используем новейшие технологии машинного обучения для
              увеличения ваших доходов.
            </p>

            <Link href="/shop">
              <a className="btn">Получить прогноз</a>
            </Link>
          </div>
        </div>
      </div>
      {/* <!-- MAIN BLOCK EOF --> */}
    </>
  );
};
