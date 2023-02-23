import productData from "data/product/product";
import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import socialData from "data/social";
import { Reviews } from "../Reviews/Reviews";
import { ReviewFrom } from "../ReviewForm/ReviewFrom";
import { useRouter } from "next/router";
import { CartContext } from "pages/_app";
import { getToken } from '../../../services/LocalStorageService';

export const ProductDetails = () => {
  const router = useRouter();
  const { access_token } = getToken();
  const { cart, setCart } = useContext(CartContext);

  const socialLinks = [...socialData];
  const products = [...productData];
  const [product, setProduct] = useState(null);
  const [addedInCart, setAddedInCart] = useState(false);

  useEffect(() => {
    if (router.query.id) {
      const data = products.find((pd) => pd.id === router.query.id);
      setProduct(data);
    }
  }, [router.query.id]);

  useEffect(() => {
    if (product) {
      setAddedInCart(Boolean(cart?.find((pd) => pd.id === product.id)));
    }
  }, [product, cart]);

  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState(2);
  const [activeColor, setActiveColor] = useState(2);
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  const handleAddToCart = () => {
    const newProduct = { ...product, quantity: quantity };
    setCart([...cart, newProduct]);
  };

  if (!product) return <></>;
  return (
    <>
      {/* <!-- BEGIN PRODUCT --> */}
      <div className="product">
        <div className="wrapper">
          <div className="product-content">
            {/* <!-- Product Main Slider --> */}
            <div className="product-slider">
              <div className="product-slider__main">
                  <img src={product.image} alt="product" />
              </div>

            </div>
            <div className="product-info">
              <h3>{product.name}</h3>

              {/*<span className="product-num">Product ID: {product.productNumber}</span>*/}
              {product.oldPrice ? (
                <span className="product-price">{product.oldPrice} BYN</span>
              ) : (
                <span className="product-price">{product.price} BYN</span>
              )}
              <p>{product.content}</p>

              {/* <!-- Social Share Link --> */}
              <div className="contacts-info__social">
                <span>Найти нас:</span>
                <ul>
                  {socialLinks.map((social, index) => (
                    <li key={index}>
                      <a href={social.path}>
                        <i className={social.icon ? social.icon : ""}></i>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* {/* <!-- Product Color info--> */}
              <div className="product-options">
                {/* <div className="product-info__color">
                  <span>Color:</span>
                  <ul>
                    {product?.colors.map((color, index) => (
                      <li
                        onClick={() => setActiveColor(index)}
                        className={activeColor === index ? "active" : ""}
                        key={index}
                        style={{ backgroundColor: color }}
                      ></li>
                    ))}
                  </ul>
                </div> */}

                {/* <!-- Order Item counter --> */}
                <div className="product-info__quantity">
                  <span className="product-info__quantity-title">
                    Количество дней, для рассчета прогноза:
                  </span>
                  <div className="counter-box">
                    <span
                      onClick={() => {
                        if (quantity > 1) {
                          setQuantity(quantity - 1);
                        }
                      }}
                      className="counter-link counter-link__prev"
                    >
                      <i className="icon-arrow"></i>
                    </span>
                    <input
                      type="text"
                      className="counter-input"
                      disabled
                      value={quantity}
                    />
                    <span
                      onClick={() => setQuantity(quantity + 1)

                    }
                      className="counter-link counter-link__next"
                    >
                      <i className="icon-arrow"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="product-buttons">
                <button
                  disabled={addedInCart}
                  onClick={ access_token ? () => handleAddToCart(): () => console.log('login please')}
                  className="btn btn-icon"
                >
                  <i className="icon-cart"></i> В корзину
                </button>
                {/* <button className="btn btn-grey btn-icon">
                  <i className="icon-heart"></i> wish
                </button> */}
              </div>
            </div>
          </div>

          {/* <!-- Product Details Tab --> */}
          <div className="product-detail">
            <div className="tab-wrap product-detail-tabs">
              <ul className="nav-tab-list tabs pd-tab">
                <li
                  className={tab === 1 ? "active" : ""}
                  onClick={() => setTab(1)}
                >
                  Подробное описание
                </li>
                <li
                  className={tab === 2 ? "active" : ""}
                  onClick={() => setTab(2)}
                >
                  Отзывы
                </li>
              </ul>
              <div className="box-tab-cont">
                {/* <!-- Product description --> */}
                {tab === 1 && (
                  <div className="tab-cont">
                    <p>{product.description}</p>
                    
                  </div>
                )}

                {tab === 2 && (
                  <div className="tab-cont product-reviews">
                    {/* <!-- Product Reviews --> */}
                    <Reviews reviews={product.reviews} />

                    {/* <!-- Product Review Form --> */}
                    <ReviewFrom data ={product.id}/>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/*<img*/}
        {/*  className="promo-video__decor js-img"*/}
        {/*  src="/assets/img/promo-video__decor.jpg"*/}
        {/*  alt=""*/}
        {/*/>*/}
      </div>
      {/* <!-- PRODUCT EOF   --> */}
    </>
  );
};
