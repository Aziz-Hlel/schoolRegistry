import BreadcrumbHeader from '@/pages/Header';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import MiddleSchoolsTable from './MiddleSchoolTable';
import { useSelectedRow } from './context/selected-row-provider';
import DialogContainer from './dialogs/DialogContainer';

const MiddleSchoolIndex = () => {
  const { handleDialogChange } = useSelectedRow();

  return (
    <div>
      <BreadcrumbHeader breadcrumbs={[{ title: 'المدارس الاعدادية', href: '/middle-schools' }]} />
      <div className=" w-full mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>قائمة المدارس الاعدادية</CardTitle>
            <CardDescription>إدارة المدارس الاعدادية وتفاصيلها هنا.</CardDescription>
            <CardAction>
              <Button onClick={() => handleDialogChange('add')}>إضافة مدرسة اعدادية جديدة</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <MiddleSchoolsTable />
            <DialogContainer />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MiddleSchoolIndex;
