import productData from "data/product/product";
import { CartContext } from "pages/_app";
import { useContext } from "react";
import { Card } from "./Card/Card";

export const CheckoutOrders = () => {
  const { cart } = useContext(CartContext);
  const total = cart.reduce(
    (total, item) => total + Number(item.price),
    0
  );
  console.log(cart)
  return (
    <>
      <div className="checkout-order">
        <h5>Ваш заказ</h5>
        {cart.map((order) => (
          <Card key={order.id} order={order} />
        ))}
      </div>
      <div className="cart-bottom__total">
        <div className="cart-bottom__total-goods">
          Товаров на:
          <span>{total.toFixed(2)} BYN</span>
        </div>

        <div className="cart-bottom__total-num">
          К оплате:
          <span>{total.toFixed(2)} BYN</span>
        </div>
      </div>
    </>
  );
};
