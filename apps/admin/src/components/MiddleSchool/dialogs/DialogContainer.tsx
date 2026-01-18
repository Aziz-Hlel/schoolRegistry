import { useSelectedRow } from '../context/selected-row-provider';
import AddMiddleSchool from './AddMiddleSchool';
import DeleteMiddleSchool from './DeleteMiddleSchool';
import EditMiddleSchool from './EditMiddleSchool';

const DialogContainer = () => {
  const { openDialog } = useSelectedRow();
  if (openDialog === 'add') return <AddMiddleSchool />;
  if (openDialog === 'delete') return <DeleteMiddleSchool />;
  if (openDialog === 'edit') return <EditMiddleSchool />;
  return null;
};

export default DialogContainer;
