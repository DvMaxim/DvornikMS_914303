import Link from 'next/link';

export const Error = () => {
  return (
    <>
      {/* <!-- BEGIN 404 --> */}
      <div className='error-page'>
        <div className='wrapper'>
          <div className='error-page__content'>
            <div className='error-page__info'>
              <div className='error-page__title'>
                <span>404</span>
                <br></br>
                Страница не найдена
              </div>
              <div className='error-page__subtitle'>
                Пожалуйста, попробуйте вернитесь на{' '}
                <Link href='/'>
                  <a>Главную.</a>
                </Link>
              </div>
              {/*<div className='box-field__row box-field__row-search'>*/}
              {/*  <div className='box-field'>*/}
              {/*    <input*/}
              {/*      type='search'*/}
              {/*      className='form-control'*/}
              {/*      placeholder='Поиск'*/}
              {/*    />*/}
              {/*  </div>*/}
              {/*  <button type='submit' className='btn btn-icon'>*/}
              {/*    <i className='icon-search'></i>*/}
              {/*  </button>*/}
              {/*</div>*/}
            </div>
            {/*<div className='error-page__img'>*/}
            {/*  <img src='/assets/img/error-img.jpg' className='js-img' alt='' />*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
      {/* <!-- 404 EOF   --> */}
    </>
  );
};
