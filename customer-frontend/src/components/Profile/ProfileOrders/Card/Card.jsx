import {useOrderedProductsQuery}  from '../../../../services/orderApi'


export const Card = ({ order, index, onCollapse, active }) => {
  const  orderItems = useOrderedProductsQuery(order.order_Id);
  console.log(orderItems)
  if (orderItems.isLoading) return <div>Загрузка....</div>;
  if (orderItems.isError) return <h6>Возникновение ошибки {orderItems.error.error}</h6>;

  
  let activeBar = false;
  if (order.order_Status === "Order Placed") {
    activeBar = false;
  } else if (order.order_Status === "Delivered") {
    activeBar = true;
  } else if (order.order_Status === "Canceled") {
    activeBar = false;
  }

  return (
    <>
      <div className={`profile-orders__item ${active === index && 'active'}`}>
        <div className='profile-orders__row'>
          <div className='profile-orders__col'>
            <span className='profile-orders__col-mob'>Дата</span>
            <span className='profile-orders__item-date'>{order.order_Placment_Date}</span>
          </div>
          <div className='profile-orders__col'>
            <span className='profile-orders__col-mob'>Email доставки прогноза</span>
            <span className='profile-orders__item-addr'>{order.destination_email}</span>
          </div>
          <div className='profile-orders__col'>
            <span className='profile-orders__col-mob'>Стоимость</span>
            <span className='profile-orders__item-price'>{order.total_Amount} BYN</span>
          </div>
          <div className='profile-orders__col'>
            <span className='profile-orders__col-mob'>Статус</span>
            <span
              className={`profile-orders__col-${activeBar ? 'delivered' : 'onway'}`}
            >
              {order.order_Status}
            </span>
            <span
              onClick={() => onCollapse(index)}
              className='profile-orders__col-btn'
            ></span>
          </div>
        </div>
        <div className='profile-orders__content'>
          <ul>
            {orderItems.data.map((item, index) => (
              <li key={index}>
                <img src={`http://127.0.0.1:8000${item.product_Id.image}`} style={{width:"5rem"}} />
                {item.product_Id.product_Name}
                <span>{item.product_Id.product_Price} BYN</span>
              </li>
            ))}
            <li>
              Методы оплаты:
              <span>Кредитная карта</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
