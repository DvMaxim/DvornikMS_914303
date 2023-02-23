import { Checkout } from "components/Checkout/Checkout";
import { PublicLayout } from "layout/PublicLayout";

const breadcrumbsData = [
  {
    label: "Главная",
    path: "/",
  },
  {
    label: "Заказать прогноз",
    path: "/shop",
  },
  {
    label: "Оплата",
    path: "/checkout",
  },
];
const CheckoutPage = () => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData}>
      <Checkout />
    </PublicLayout>
  );
};

export default CheckoutPage;
