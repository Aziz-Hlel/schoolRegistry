import BreadcrumbHeader from '@/pages/Header';
import { useSelectedRow } from './Majors.context';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import DialogContainer from './dialogs/DialogContainer';
import MajorsMain from './MajorsRows';

const MajorsIndex = () => {
  const { setOpenDialog } = useSelectedRow();

  return (
    <div>
      <BreadcrumbHeader
        breadcrumbs={[
          { title: 'User', href: '/users' },
          { title: 'Profile', href: '/users/profile' },
        ]}
      />
      <div className=" w-full mx-auto">
        <Card className=" m-8">
          <CardHeader>
            <CardTitle className="text-4xl">الشعب</CardTitle>
            <CardDescription>يمكنك إدارة جميع الشعب هنا بسهولة وفعالية.</CardDescription>
            <CardAction className=" flex gap-4">
              <Button onClick={() => setOpenDialog('order')}>ترتيب الشعب</Button>
              <Button onClick={() => setOpenDialog('add')}>إضافة شعبة جديدة</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <MajorsMain />
          </CardContent>
        </Card>
        <DialogContainer />
      </div>
    </div>
  );
};

export default MajorsIndex;
