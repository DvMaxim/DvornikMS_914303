import { Registration } from "components/Registration/Registration";
import { Subscribe } from "components/shared/Subscribe/Subscribe";
import { PublicLayout } from "layout/PublicLayout";

const breadcrumbsData = [
  {
    label: "Главная",
    path: "/",
  },
  {
    label: "Регистрация",
    path: "/registration",
  },
];
const RegistrationPage = () => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData}>
      <Registration />
    </PublicLayout>
  );
};

export default RegistrationPage;
