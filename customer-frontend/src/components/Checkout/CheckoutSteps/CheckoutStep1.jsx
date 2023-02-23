import { useEffect, useState } from 'react';
import { CartContext } from "pages/_app";
import { useContext } from "react";
import { useDispatch ,useSelector } from 'react-redux';
import Dropdown from "react-dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {usePlaceOrderMutation} from '../../../services/orderApi'
import { setOrder } from '../../../features/orderSlice';
const countries = [
  { label: "Беларусь", value: "Беларусь" },
  { label: "Россия", value: "Россия" },
  { label: "Польша", value: "Польша" },
  { label: "Чехия", value: "Чехия" },
    { label: "США", value: "США" },
  { label: "Украина", value: "Украина" },
    { label: "Англия", value: "Англия" },
  { label: "Германия", value: "Германия" },
];
const timezone = [
  { label: "10AM - 12PM", value: "10AM - 12PM" },
  { label: "12PM - 2PM", value: "12PM - 2PM" },
  { label: "2PM - 4PM", value: "2PM - 4PM" },
  { label: "4PM - 6PM", value: "4PM - 6PM" },
  { label: "6PM - 8PM", value: "6PM - 8PM" },
  { label: "8PM - 10PM", value: "8PM - 10PM" },
];



export const CheckoutStep1 = ({ onNext }) => {
  const dispatch = useDispatch()
  const { cart } = useContext(CartContext);
  const total = cart.reduce(
    (total, item) => total + Number(item.price),
    0
  );
  const [userData , setUserData]= useState({}) 
  const data = useSelector(state => state.user)
  const [PlaceOrder] = usePlaceOrderMutation()
  const  [city, setCity]= useState({})
  const [startDate, setStartDate] = useState(new Date());
  const [server_error, setServerError] = useState({});


  useEffect(() => {
      setUserData({
        id:data.id,
        phone_Number: data.phone_Number,
        first_Name: data.first_Name,
        last_Name: data.last_Name,
        destination_email: "",
        note:""
      })
  }, [])

  const handleChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    setUserData(values => ({ ...values, [name]: value }));
  };

  const handelSubmit = async (e) =>{ 
    e.preventDefault();
    const actualData = {
      customer: userData.id,
      phone_Number:userData.phone_Number,
      payment:{
        payment_Status: 'Pending',
        payment_Type:'Credit Card',
        amount_Paid: 0
      },
      order_Status:'Order Pending',
      destination_email:userData.destination_email,
      total_Amount:total,
      note:userData.note,
      order_Delivery_Date : startDate,

      products: cart
    }

    console.log('Текущие данные: ',actualData)
    const res = await PlaceOrder(actualData)

    if (res.error) {
      console.log(res.error.data.errors)
      setServerError(res.error.data.errors)
    }
    if (res.data) {
      console.log(res.data)
      // Store Order Data in Redux Store
        dispatch(
          setOrder({
            id: res.data.order_Id ,
            order_Status: res.data.order_Status,
            order_Delivery_Date: res.data.order_Delivery_Date,

            total_Amount: res.data.total_Amount,
          })
        );
      onNext();
    } 
  }
  
  return (
    <>
      {/* <!-- BEING CHECKOUT STEP ONE -->  */}
      <div className="checkout-form">
        <form onSubmit={handelSubmit}>
          <div className="checkout-form__item">
            <h4>Информация о вас</h4>
            <div style={{display:'grid' , gridTemplateColumns:'repeat(2, 1fr)' , marginBottom:'1rem'}}>
              <div> 
                <h6>Имя, Фамилия:</h6>
                <h6>Номер телефона:</h6>
              </div>
              <div> 
                <h6>{userData.first_Name} {" "} {userData.last_Name}</h6>
                <h6>{userData.phone_Number}</h6>
              </div>
            </div>
           {/* <div className="box-field">*/}
           {/*   <input*/}
           {/*     type="text"*/}
           {/*     className="form-control"*/}
           {/*     placeholder="Введите ваш номер телефона"*/}
           {/*     name="phone_Number"*/}
           {/*     onChange={handleChange}*/}
           {/*   />*/}
           {/* </div>*/}
           {/*{server_error.phone_Number ? (*/}
           {/*   <lable style={{ fontSize: 16, color: "red", paddingTop: 10 }}>*/}
           {/*     {server_error.phone_Number[0]} </lable>) : ("")} */}
          </div>
          <div className="checkout-form__item">
            <h4>Адрес получения прогноза</h4>

              <div className="box-field">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Введите электронный адрес доставки прогноза"
                  name="destination_email"
                  onChange={handleChange}
                  required
                />
                {server_error.destination_email ? (
              <lable style={{ fontSize: 16, color: "red", paddingTop: 10 }}>
                {server_error.destination_email[0]} </lable>) : ("")}
              </div>
          </div>
          <div className="checkout-form__item">
            <h4>Примачание</h4>
            <div className="box-field box-field__textarea">
              <textarea
                className="form-control"
                placeholder="Введите дополнительную информацию..."
                name='note'
                onChange={handleChange}
              ></textarea>
              {server_error.note ? (
              <lable style={{ fontSize: 16, color: "red"}}>
                {server_error.note[0]} </lable>) : ("")}
            </div>
            {/* <label className="checkbox-box checkbox-box__sm">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Create an account
            </label> */}
          </div>
          <div className="checkout-buttons">
            {/* <button className='btn btn-grey btn-icon'>
              {' '}
              <i className='icon-arrow'></i> back
            </button> */}
            <button type="submit" className="btn btn-icon btn-next">
              Далее <i className="icon-arrow"></i>
            </button>
          </div>
        </form>
      </div>
      {/* <!-- CHECKOUT STEP ONE EOF -->  */}
    </>
  );
};
