import { useEffect  ,useRef } from 'react';
import { useSelector } from "react-redux";
import {useUpdateOrderMutation} from '../../../services/orderApi'


export const CheckoutStep3 = () => {
  const order = useSelector(state => state.order)
  const [updateOrder] = useUpdateOrderMutation();
  
  useEffect( async() => {
    const data ={
      id: order.id,
      order_Status: "Order Placed",
    }
    const res= await updateOrder(data)
      if(res.isError){
        console.log(res.error.error)
      }
      if(res.data){
         console.log(res.data)
      }  
  
    },[] )
  console.log('order form stor', order)
  return (
    <>
      {/* <!-- BEING CHECKOUT STEP Three -->  */}
      <div className="checkout-purchase checkout-form">
        <h4>
          Predict Stocks
          <br />
          благодарит вас
        </h4>
        <p>
          Наш сервис очень ценит взимоотношения с клиентами, и мы очень
          благодарны за доверие, которое вы нам оказали. Мы искренне надеемся, что вы
          довольны своей покупкой. И мы сделаем все возможное, чтобы и впредь
          предоставлять вам такое обслуживание, которого вы заслуживаете.
        </p>
        <ul className="checkout-purchase__list">
          <li>
            <span>Номер заказа</span>{order.id}
          </li>
          <li>
            <span>Статус заказа</span> Order Placed
          </li>
          <li>
            <span>Статус оплаты</span>Ожидание поступления средств
          </li>
        </ul>
        
      </div>
      {/* <!-- CHECKOUT STEP TWO EOF -->  */}
    </>
  );
};
