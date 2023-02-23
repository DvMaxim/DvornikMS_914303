import { useState } from "react";

export const CheckoutStep2 = ({ onNext, onPrev }) => {
  const [payment, setPayment] = useState("cash");
  return (
    <>
      {/* <!-- BEING CHECKOUT STEP TWO -->  */}
      <div className="checkout-payment checkout-form">
        <h4>Методы оплаты</h4>
     <div
          className={`checkout-payment__item ${
            payment === "credit-card" && "active"
          }`}
        >
          <div className="checkout-payment__item-head">
            <label
              onChange={() => setPayment("credit-card")}
              className="radio-box"
            >
              Кредитная карта
              <input
                type="radio"
                checked={payment === "credit-card"}
                name="radio"
              />
              <span className="checkmark"></span>
              <span className="radio-box__info">
                <i className="icon-info"></i>
                <span className="radio-box__info-content">
                  Данный функционал находится в разработке!
                </span>
              </span>
            </label>
          </div>
          <div className="checkout-payment__item-content">
            <div className="box-field">
              <span>Номер карты:</span>
              <input
                type="text"
                className="form-control"
                placeholder="xxxx xxxx xxxx xxxx"
                maxlength="16"
              />
            </div>
            <div className="box-field__row">
              <div className="box-field">
                <span>Срок действия:</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="mm"
                  maxlength="2"
                />
              </div>
              <div className="box-field">
                <input
                  type="text"
                  className="form-control"
                  placeholder="yy"
                  maxlength="2"
                />
              </div>
              <div className="box-field">
                <span>Код безопасности:</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="CVV"
                  maxlength="3"
                />
              </div>
            </div>
          </div>
        </div> 


        <div className="checkout-buttons">
          <button onClick={onPrev} className="btn btn-grey btn-icon">
            <i className="icon-arrow"></i> Назад
          </button>
          <button onClick={onNext} className="btn btn-icon btn-next">
            Далее <i className="icon-arrow"></i>
          </button>
        </div>
      </div>
      {/* <!-- CHECKOUT STEP TWO EOF -->  */}
    </>
  );
};
