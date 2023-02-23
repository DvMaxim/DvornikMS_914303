import { Subscribe } from "components/shared/Subscribe/Subscribe";
import { Shop } from "components/Shop/Shop";
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
];
const ShopPage = () => {
  return (
    <PublicLayout
      breadcrumb={breadcrumbsData}
    >
      <Shop />
    </PublicLayout>
  );
};

export default ShopPage;
