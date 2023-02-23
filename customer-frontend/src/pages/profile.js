import { Profile } from 'components/Profile/Profile';
import { PublicLayout } from 'layout/PublicLayout';

const breadcrumbsData = [
  {
    label: 'Главная',
    path: '/',
  },
  {
    label: 'Профиль',
    path: '/profile',
  },
];
const ProfilePage = () => {
  return (
    <PublicLayout breadcrumb={breadcrumbsData}>
      <Profile />
    </PublicLayout>
  );
};

export default ProfilePage;
