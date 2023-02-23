import Link from 'next/link';

export const Card = ({ order }) => {
  const { image, name, price, productNumber, id, quantity } = order;

  return (
    <>
      {/* <!-- BEING ORDER ITEM CARD --> */}
      <div className='checkout-order__item'>
        <Link href={`/product/${id}`}>
          <a className='checkout-order__item-img'>
            <img src={image} className='js-img' alt='' />
          </a>
        </Link>
        <div className='checkout-order__item-info'>
          <Link href={`/product/${id}`}>
            <a className='title6'>
              {name} <span>x{quantity}</span>
            </a>
          </Link>
          <span className='checkout-order__item-price'>
            {price} BYN
          </span>

        </div>
      </div>
      {/* <!-- ORDER ITEM CARD EOF --> */}
    </>
  );
};
