import { Products } from "components/Product/Products/Products";
import { PagingList } from "components/shared/PagingList/PagingList";
import { usePagination } from "components/utils/Pagination/Pagination";
import productData from "data/product/product";
import Slider from "rc-slider";
import { useEffect, useState } from "react";
import Dropdown from "react-dropdown";
import { AsideItem } from "../shared/AsideItem/AsideItem";

// React Range
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const options = [
  { value: "highToMin", label: "От дорогих к дешевым" },
  { value: "minToHigh", label: "От дешевых к дорогим" },
];
export const Shop = () => {
  const allProducts = [...productData];

  const [productOrder, setProductOrder] = useState(
    allProducts.sort((a, b) => (a.price < b.price ? 1 : -1))
  );

  const [products, setProducts] = useState([...productOrder]);
  const [filter, setFilter] = useState({ category: "stocks"});

  useEffect(() => {
    setProducts(productOrder);
  }, [productOrder]);

  useEffect(() => {
    if (filter.category === "it_companies") {
      const newPro = productOrder.filter(
        (pd) => pd.category === "it_companies"
      );
      paginate.jump(1);
      setProducts(newPro);

    } else if (filter.category === "food_manufacturing") {
      const newPro = productOrder.filter((pd) => pd.category === "food_manufacturing");
      paginate.jump(1);
      setProducts(newPro);
    } else if (filter.category === "automobile_manufacturing") {
      const newPro = productOrder.filter((pd) => pd.category === "automobile_manufacturing");
      paginate.jump(1);
      setProducts(newPro);
    } else if (filter.category === "global_healthcare") {
      const newPro = productOrder.filter((pd) => pd.category === "global_healthcare");
      paginate.jump(1);
      setProducts(newPro);
    } else {
      setProducts([...productOrder]);
    }
  }, [filter, productOrder]);

  const paginate = usePagination(products, 9);

  const handleSort = (value) => {
    if (value === "highToMin") {
      const newOrder = allProducts.sort((a, b) => (a.price < b.price ? 1 : -1));
      setProductOrder(newOrder);
    }
    if (value === "minToHigh") {
      const newOrder = allProducts.sort((a, b) => (a.price > b.price ? 1 : -1));
      setProductOrder(newOrder);
    }
  };

  return (
    <div>
      {/* <!-- BEGIN SHOP --> */}
      <div className="shop">
        <div className="wrapper">
          <div className="shop-content">
            {/* <!-- Shop Aside --> */}
            <div className="shop-aside">
              <div className="shop-aside__item">
                <span className="shop-aside__item-title">Категории</span>
                <ul>
                  <li>
                    <a href="javascript: void(0)"
                    onClick={() =>
                        setFilter({ ...filter, category: "stocks" })
                      }
                    >
                      Все компании <span>(15)</span>
                    </a>
                  </li>
                  <li>
                    <a href="javascript: void(0)"
                    onClick={() =>
                        setFilter({ ...filter, category: "it_companies" })
                      }
                    >
                      IT-компании <span>(05)</span>
                    </a>
                  </li>
                  <li>
                    <a href="javascript: void(0)"
                    onClick={() =>
                        setFilter({ ...filter, category: "food_manufacturing" })
                      }
                    >
                      Производство продуктов питания <span>(03)</span>
                    </a>
                  </li>
                  <li>
                    <a href="javascript: void(0)"
                    onClick={() =>
                        setFilter({ ...filter, category: "automobile_manufacturing" })
                      }
                    >
                      Производство автомобилей <span>(04)</span>
                    </a>
                  </li>
                  <li>
                    <a href="javascript: void(0)"
                    onClick={() =>
                        setFilter({ ...filter, category: "global_healthcare" })
                      }
                    >
                      Здравоохранение <span>(03)</span>
                    </a>
                  </li>
                </ul>
              </div>
              {/*<div className="shop-aside__item">*/}
              {/*  <span className="shop-aside__item-title">Цена</span>*/}
              {/*  <div className="range-slider">*/}
              {/*    <Range*/}
              {/*      min={0}*/}
              {/*      max={3000}*/}
              {/*      defaultValue={[0, 3000]}*/}
              {/*      tipFormatter={(value) => `${value}BYN`}*/}
              {/*      allowCross={false}*/}
              {/*      tipProps={{*/}
              {/*        placement: "bottom",*/}
              {/*        prefixCls: "rc-slider-tooltip",*/}
              {/*      }}*/}
              {/*    />*/}
              {/*  </div>*/}
              {/*</div>*/}


            </div>
            {/* <!-- Shop Main --> */}
            <div className="shop-main">
              <div className="shop-main__filter">
                {/*<div className="shop-main__checkboxes" style={{ visibility: "hidden" }}>*/}
                {/*  <label className="checkbox-box">*/}
                {/*    <input*/}
                {/*      checked={filter.isSale}*/}
                {/*      onChange={() =>*/}
                {/*        setFilter({ ...filter, isSale: !filter.isSale })*/}
                {/*      }*/}
                {/*      type="checkbox"*/}
                {/*    />*/}
                {/*    <span className="checkmark"></span>*/}
                {/*    Распродажа*/}
                {/*  </label>*/}
                {/*  <label className="checkbox-box">*/}
                {/*    <input*/}
                {/*      checked={filter.isNew}*/}
                {/*      onChange={() =>*/}
                {/*        setFilter({ ...filter, isNew: !filter.isNew })*/}
                {/*      }*/}
                {/*      type="checkbox"*/}
                {/*    />*/}
                {/*    <span className="checkmark"></span>*/}
                {/*    Новинки*/}
                {/*  </label>*/}
                {/*</div>*/}
                <div className="shop-main__select">
                  <Dropdown
                    options={options}
                    className="react-dropdown"
                    onChange={(option) => handleSort(option.value)}
                    value={options[0]}
                  />
                </div>
              </div>
              <div className="shop-main__items">
                <Products products={paginate?.currentData()} />
              </div>

              {/* <!-- PAGINATE LIST --> */}
              <PagingList paginate={paginate} />
            </div>
          </div>
        </div>
        {/*<img*/}
        {/*  className="promo-video__decor js-img"*/}
        {/*  src="/assets/img/promo-video__decor.jpg"*/}
        {/*  alt=""*/}
        {/*/>*/}
        {/*<img*/}
        {/*  className="shop-decor js-img"*/}
        {/*  src="/assets/img/shop-decor.jpg"*/}
        {/*  alt=""*/}
        {/*/>*/}
      </div>
      {/* <!-- SHOP EOF   --> */}
    </div>
  );
};
