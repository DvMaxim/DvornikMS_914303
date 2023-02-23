import { Login } from "components/Login/Login";
import { Subscribe } from "components/shared/Subscribe/Subscribe";
import { PublicLayout } from "layout/PublicLayout";

const breadcrumbsData = [
  {
    label: "Главная",
    path: "/",
  },
  {
    label: "Войти",
    path: "/login",
  },
];
const LoginPage = () => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData}>
      <Login />
    </PublicLayout>
  );
};

export default LoginPage;
