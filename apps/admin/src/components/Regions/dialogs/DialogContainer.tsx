import CreateDialog from './CreateDialog';
import DeleteRegion from './DeleteRegion';
import { useSelectedRow } from '../Regions.context';
import EditDialog from './EditDialog';
import OrderRegions from '../OrderRegions/OrderRegions';

const DialogContainer = () => {
  return (
    <>
      <CreateDialog />
      <EditDialog />
      <DeleteRegion />
      <OrderRegions />
    </>
  );
};

export default DialogContainer;
