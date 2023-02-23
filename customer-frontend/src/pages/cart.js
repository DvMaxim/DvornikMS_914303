import { Cart } from 'components/Cart/Cart';
import { PublicLayout } from 'layout/PublicLayout';

const breadcrumbsData = [
  {
    label: 'Главная',
    path: '/',
  },
  {
    label: 'Корзина',
    path: '/cart',
  },
];
const CartPage = () => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData}>
      <Cart />
    </PublicLayout>
  );
};

export default CartPage;
