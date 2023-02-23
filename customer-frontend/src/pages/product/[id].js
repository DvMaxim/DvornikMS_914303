import { MostViewed } from "components/shared/MostViewed/MostViewed";
import { ProductDetails } from "components/Product/ProductDetails/ProductDetails";

const { PublicLayout } = require("layout/PublicLayout");

const breadcrumbsData = [
  {
    label: "Главная",
    path: "/",
  },
  {
    label: "Заказать прогноз",
    path: "/shop",
  },
];
const SingleProductPage = () => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData}>
      <ProductDetails />
    </PublicLayout>
  );
};

export default SingleProductPage;
