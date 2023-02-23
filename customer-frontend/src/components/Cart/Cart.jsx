import { Card } from "./Card/Card";
import socialData from "data/social";
import { CartContext } from "pages/_app";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";

export const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const [count, setCount] = useState(0);
  const socialLinks = [...socialData];

  const total = cart.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  const handleProductQuantity = (change, quantity, id) => {
    console.log(change, quantity, id);
    if (change === "increment") {
      cart.find((item) => item.id === id).quantity = quantity + 1;
      setCount(count + 1);
    }
    if (change === "decrement" && quantity > 1) {
      cart.find((item) => item.id === id).quantity = quantity - 1;
      setCount(count + 1);
    }
  };

  useEffect(() => {
    setCart(cart);
  }, [cart, count]);

  return (
    <>
      {/* <!-- BEGIN CART --> */}
      <div className="cart">
        <div className="wrapper">
          <div className="cart-table">
            <div className="cart-table__box">
              <div className="cart-table__row cart-table__row-head">
                <div className="cart-table__col">Название акции</div>
                <div className="cart-table__col">Кол-во дней</div>
                <div className="cart-table__col">Цена</div>
                {/*<div className="cart-table__col">Total</div>*/}
              </div>

              {cart.map((cart) => (
                <Card
                  onChangeQuantity={(change, quantity) =>
                    handleProductQuantity(change, quantity, cart.id)
                  }
                  key={cart.id}
                  cart={cart}
                />
              ))}
            </div>
          </div>
          <div className="cart-bottom">
            <div className="cart-bottom__promo">
              <p>
                Мы предоставляем лучшие прогнозы на самые разные акции.
                Для нас нет ничего невозможного. С нами вы сможете не только увеличить
                 собственный капитал, но и более детально разобраться в техническом анализе рынка акций.
                Более того, вы на собственном примере почувствуйте силу и мощь машин. Давайте начнем !
              </p>
              <div className="contacts-info__social">
                <span>Найти нас:</span>
                <ul>
                  {socialLinks.map((social, index) => (
                    <li key={index}>
                      <a href={social.path} target="_blank">
                        <i className={social.icon}></i>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="cart-bottom__total">
              <div className="cart-bottom__total-num">
                Всего:
                <span>BYN {total.toFixed(2)}</span>
              </div>
              <Link href="/checkout">
                <a className="btn">Оплата</a>
              </Link>
            </div>
          </div>
        </div>
        {/*<img*/}
        {/*  className="promo-video__decor js-img"*/}
        {/*  src="assets/img/promo-video__decor.jpg"*/}
        {/*  alt=""*/}
        {/*/>*/}
      </div>
      {/* <!-- CART EOF   --> */}
    </>
  );
};
