import BreadcrumbHeader from '@/pages/Header';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import MiddleSchoolsTable from './MiddleSchoolTable';
import { useSelectedRow } from './context/selected-row-provider';
import DialogContainer from './dialogs/DialogContainer';

const MiddleSchoolIndex = () => {
  const { handleDialogChange } = useSelectedRow();

  return (
    <div>
      <BreadcrumbHeader breadcrumbs={[{ title: 'Products', href: '/products' }]} />
      <div className=" w-full mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Middle School List</CardTitle>
            <CardDescription>Manage your middle schools and their details here.</CardDescription>
            <CardAction>
              <Button onClick={() => handleDialogChange('add')}>Add New Middle School</Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <MiddleSchoolsTable />
            <DialogContainer />
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default MiddleSchoolIndex;
