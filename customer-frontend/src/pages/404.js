import { Error } from 'components/Error/Error';
import { PublicLayout } from 'layout/PublicLayout';

export default function Custom404() {
  return (
    <PublicLayout description='Упссс!'>
      <Error />
    </PublicLayout>
  );
}
