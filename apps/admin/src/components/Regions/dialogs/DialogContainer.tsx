import CreateDialog from './CreateDialog';
import DeleteRegion from './DeleteRegion';
import { useSelectedRow } from '../Regions.context';
import EditDialog from './EditDialog';
import OrderRegions from '../OrderRegions/OrderRegions';

const DialogContainer = () => {
  const { openDialog } = useSelectedRow();

  if (openDialog === 'add') return <CreateDialog />;
  if (openDialog === 'edit') return <EditDialog />;
  if (openDialog === 'delete') return <DeleteRegion />;
  if (openDialog === 'order') return <OrderRegions />;

  return null;
};

export default DialogContainer;
