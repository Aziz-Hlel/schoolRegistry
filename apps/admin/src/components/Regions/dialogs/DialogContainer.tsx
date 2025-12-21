import CreateDialog from './CreateDialog';
import DeleteRegion from './DeleteRegion';
import { useSelectedRow } from '../Regions.context';
import EditDialog from './EditDialog';

const DialogContainer = () => {
  const { openDialog } = useSelectedRow();
  if (!openDialog) return null;

  if (openDialog === 'add') {
    return <CreateDialog />;
  }
  if (openDialog === 'edit') {
    return <EditDialog />;
  }
  if (openDialog === 'delete') {
    return <DeleteRegion />;
  }
};

export default DialogContainer;
