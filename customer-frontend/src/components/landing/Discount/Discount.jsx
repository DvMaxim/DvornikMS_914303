import Link from "next/link";

export const Discount = () => {
  return (
    <>
      {/* <!-- BEGIN DISCOUNT --> */}
      <div
        className="discount js-img"
        style={{
          backgroundImage: `url('/assets/img/discount-bg.jpg')`,
          height: "600px",
        }}
      >
        <div className="wrapper">
          <div className="discount-info">
            <span className="main-text">А что так можно было?</span>
            <p style={{ fontSize: "17px", color: "#000" }}>
            Да, вы действительно можете заказать прогноз на акцию интересующей вас компании.
                Наши алгоритмы проанализируют данные и выдадут наиболее точный и свежий вердикт в виде графика. Что может быть проще ?!
            </p>
          </div>
        </div>
      </div>
      {/* <!-- DISCOUNT EOF   --> */}
    </>
  );
};
