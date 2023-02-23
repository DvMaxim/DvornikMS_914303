import { PublicLayout } from "layout/PublicLayout";
import { Logout } from "components/Logout/Logout"

const breadcrumbsData = [
  {
    label: 'Главная',
    path: '/',
  },
  {
    label: "Выйти",
    path: "/logout",
  },
];

const LogoutPage =() =>{
  return (
    <PublicLayout breadcrumb={breadcrumbsData}>
      <Logout />
    </PublicLayout>
  );
};

export default LogoutPage;