import CreateDialog from './CreateDialog';
import DeleteDialog from './DeleteDialog';
import { useSelectedRow } from '../Majors.context';
import EditDialog from './EditDialog';
import OrderRegions from '../OrderRegions/OrderRegions';

const DialogContainer = () => {
  const { openDialog } = useSelectedRow();

  if (openDialog === 'add') return <CreateDialog />;
  if (openDialog === 'edit') return <EditDialog />;
  if (openDialog === 'delete') return <DeleteDialog />;
  if (openDialog === 'order') return <OrderRegions />;

  return null;
};

export default DialogContainer;
