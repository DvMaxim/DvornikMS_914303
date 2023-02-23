import { useState } from 'react';
import {usePostQusetionMutation} from '../../../services/feedbackApi'


export const ContactFrom = () => {
  const [postQusetion] = usePostQusetionMutation(); 
  const [success , setSuccess] = useState(false)
  const [server_error, setServerError] = useState({})
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
      userName: data.get('userName'),
      message: data.get('message'),
    }
    const res = await postQusetion(actualData)

    if (res.error) {
      console.log(typeof (res.error.data.errors))
      console.log(res.error.data.errors)
      setServerError(res.error.data.errors)
    }
    if (res.data) {
      console.log(typeof (res.data))
      console.log(res.data)
      setSuccess(true)
    }
  }
  return (
    <>
      {/* <!-- BEGIN DISCOUNT --> */}
      <div
        className="discount discount-contacts js-img"
        style={{ backgroundImage: `url('/assets/img/discount-bg3.jpg')` }}
      >
        <div className="wrapper">
          <div className="discount-info">
            <span className="main-text">Оставьте сообщение</span>
            <p>
                Напишите нам, если у вас возникнут вопросы, мы обязательно
                найдем решение.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="box-field">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Введите имя учетной записи"
                  name='userName'
                  required
                />
                {server_error.userName ? (
                <lable style={{ fontSize: 16, color: "red", paddingLeft: 10 }}>
                {server_error.userName[0]} </lable>) : ("")}
              </div>
              <div className="box-field">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Введите электронную почту" name='email'
                  required
                />
                {server_error.email ? (
                <lable style={{ fontSize: 16, color: "red", paddingLeft: 10 }}>
                {server_error.email[0]} </lable>) : ("")}
              </div>
              <div className="box-field box-field__textarea">
                <textarea
                  className="form-control"
                  placeholder="Введите сообщение"
                  name='message'
                ></textarea>
                {server_error.message ? (
              <lable style={{ fontSize: 16, color: "red", paddingLeft: 10 }}>
                {server_error.message[0]} </lable>) : ("")}
              </div>
              <button type="submit" className="btn">
                Отправить
              </button>
            </form>
            <div style={{marginTop:"1.5rem"}}>  
              {success? <label style={{fontSize: 16, color:'#450920'}}> Спасибо за ваше сообщение! Мы обязательно свяжемся с вами в ближайшее время.</label > : ''}
            </div>
           
          </div>
        </div>
      </div>
      {/* <!-- DISCOUNT EOF   --> */}
    </>
  );
};
