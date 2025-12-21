import BreadcrumbHeader from '@/pages/Header';
import { Button } from '../ui/button';
import RegionsMain from './RegionRows';
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from '../ui/card';
import { SelectedRowProvider, useSelectedRow } from './Regions.context';
import { use } from 'react';
import DialogContainer from './dialogs/DialogContainer';

const RegionsIndex = () => {
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
            <CardTitle className="text-4xl">المعتمديات</CardTitle>
            <CardDescription>يمكنك إدارة جميع المعتمديات هنا بسهولة وفعالية.</CardDescription>
            <CardAction className=" flex gap-4">
              <Button>ترتيب المعتمديات</Button>
              <Button onClick={() => setOpenDialog('add')}>إضافة معتمدية جديدة</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <RegionsMain />
          </CardContent>
        </Card>
      </div>
      <DialogContainer />
    </div>
  );
};

export default RegionsIndex;
