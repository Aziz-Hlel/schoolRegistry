import type { ElectiveResponse } from '@contracts/schemas/elective/ElectiveResponse';
import { createContext, useContext, useState } from 'react';

type TableDialogType = 'add' | 'edit' | 'delete' | 'order' | null;

type SelectedRowContextType = {
  openDialog: TableDialogType;
  setOpenDialog: (str: TableDialogType) => void;
  currentRow: ElectiveResponse | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<ElectiveResponse | null>>;
  handleCancel: () => void;
};

const SelectedRowContext = createContext<SelectedRowContextType | null>(null);

export function SelectedElectiveRowProvider({ children }: { children: React.ReactNode }) {
  const [openDialog, setOpenDialog] = useState<TableDialogType>(null);
  const [currentRow, setCurrentRow] = useState<ElectiveResponse | null>(null);

  const handleCancel = () => {
    setCurrentRow(null);
    setOpenDialog(null);
  };

  return (
    <SelectedRowContext.Provider value={{ openDialog, setOpenDialog, currentRow, setCurrentRow, handleCancel }}>
      {children}
    </SelectedRowContext.Provider>
  );
}

export const useSelectedRow = () => {
  const context = useContext(SelectedRowContext);
  if (!context) {
    throw new Error('useSelectedRow must be used within a SelectedRowProvider');
  }
  return context;
};
