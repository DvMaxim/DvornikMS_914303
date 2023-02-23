import socialData from "data/social";

export const ContactInfo = () => {
  const footerSocial = [...socialData];
  return (
    <>
      {/* <!-- BEGIN CONTACTS INFO --> */}
      <div className="contacts-info">
        <div className="wrapper">
          <div className="contacts-info__content">
            <div className="contacts-info__text">
              <h4>Мы беспокоимся о вас</h4>
              <p>
                Напишите нам, если у вас есть какие-либо вопросы, мы обязательно свяжемся с вами
                 найдем решение. Наша поддержка поможет вам определится с
                 наиболее желаемым продуктом по самой лучшей цене. С года в
                 год наш сервис развивается и совершенствуется, принимая во внимание
                 все потребности потребителей и тенденции рынка.
              </p>
            </div>
            <div className="contacts-info__social">
              <span>Найти нас:</span>
              <ul>
                {footerSocial.map((social, index) => (
                  <li key={index}>
                    <a href={social.path}>
                      <i className={social.icon}></i>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- CONTACTS INFO EOF   -->  */}
    </>
  );
};
