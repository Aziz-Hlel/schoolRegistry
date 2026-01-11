import BreadcrumbHeader from '@/pages/Header';
import { useSelectedRow } from './Electives.context';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import DialogContainer from './dialogs/DialogContainer';
import ElectivesMain from './ElectivesRows';

const ElectivesIndex = () => {
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
            <CardTitle className="text-4xl">المواد الاضافية</CardTitle>
            <CardDescription>يمكنك إدارة جميع المواد الاضافية هنا بسهولة وفعالية.</CardDescription>
            <CardAction className=" flex gap-4">
              <Button onClick={() => setOpenDialog('order')}>ترتيب المواد الاضافية</Button>
              <Button onClick={() => setOpenDialog('add')}>إضافة مادة اضافية جديدة</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <ElectivesMain />
          </CardContent>
        </Card>
        <DialogContainer />
      </div>
    </div>
  );
};

export default ElectivesIndex;
