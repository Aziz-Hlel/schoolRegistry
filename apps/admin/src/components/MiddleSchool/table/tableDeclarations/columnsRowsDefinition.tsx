import dayjs from '@/utils/dayjsConfig';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUp, ChevronsUpDown } from 'lucide-react';
import HeaderContainer from '../ContainerComp/HeaderContainer';
import RowContainer from '../ContainerComp/RowContainer';
import type { TableRowType } from './typesAndFieldsDeclaration';
import ActionsColumn from '../columns/ActionsColumn';
import IsPublicEnumComp from '../EnumColumns/IsPublicEnumComp';

// type ColumnDefCustom<T> = ColumnDef<T> & { accessorKey?: keyof T };

const columnsRowsDefinition: ColumnDef<TableRowType>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    accessorFn: (row: TableRowType) => ({
      name: row.name,
    }),
    header: ({ column }) => {
      return (
        <HeaderContainer onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <span>الاسم</span>
          {column.getIsSorted() === 'asc' && <ArrowUp />}
          {column.getIsSorted() === 'desc' && <ArrowUp className="rotate-180" />}
          {column.getIsSorted() === false && <ChevronsUpDown />}
        </HeaderContainer>
      );
    },
    cell: ({ getValue }) => {
      const { name } = getValue<{
        name: string;
      }>();
      return <RowContainer className="lowercase w-96 ">{name}</RowContainer>;
    },

    enableSorting: true,
    enableHiding: true,
    enableGlobalFilter: true,
  },
  {
    id: 'region',
    accessorKey: 'region',
    header: ({ column }) => {
      return (
        <HeaderContainer onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <span>المعتمدية</span>
          {column.getIsSorted() === 'asc' && <ArrowUp />}
          {column.getIsSorted() === 'desc' && <ArrowUp className="rotate-180" />}
          {column.getIsSorted() === false && <ChevronsUpDown />}
        </HeaderContainer>
      );
    },
    cell: ({ getValue }) => {
      const region = getValue<TableRowType['region']>();
      return <RowContainer className="">{region ? region.name : 'N/A'}</RowContainer>;
    },

    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'isPublic',
    accessorKey: 'isPublic',
    header: ({ column }) => {
      return (
        <HeaderContainer onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <span>عمومية</span>
          {column.getIsSorted() === 'asc' && <ArrowUp />}
          {column.getIsSorted() === 'desc' && <ArrowUp className="rotate-180" />}
          {column.getIsSorted() === false && <ChevronsUpDown />}
        </HeaderContainer>
      );
    },
    cell: ({ getValue }) => {
      const isPublic = getValue<boolean>();
      return (
        <RowContainer className=" w-96 truncate whitespace-nowrap ">
          <IsPublicEnumComp isPublic={isPublic} />
        </RowContainer>
      );
    },

    enableSorting: true,
    enableHiding: true,
    maxSize: 100,
  },
  {
    id: 'staffCount',
    accessorKey: 'staffCount',
    header: ({ column }) => {
      return (
        <HeaderContainer onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <span>الطاقم</span>
          {column.getIsSorted() === 'asc' && <ArrowUp />}
          {column.getIsSorted() === 'desc' && <ArrowUp className="rotate-180" />}
          {column.getIsSorted() === false && <ChevronsUpDown />}
        </HeaderContainer>
      );
    },
    cell: ({ getValue }) => {
      const staffCount = getValue<number>();
      return <RowContainer className="">{staffCount}</RowContainer>;
    },

    enableSorting: true,
    enableHiding: true,
    maxSize: 90,
  },
  {
    id: 'director',
    accessorKey: 'director.name',
    header: ({ column }) => {
      return (
        <HeaderContainer onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <span>المدير</span>
          {column.getIsSorted() === 'asc' && <ArrowUp />}
          {column.getIsSorted() === 'desc' && <ArrowUp className="rotate-180" />}
          {column.getIsSorted() === false && <ChevronsUpDown />}
        </HeaderContainer>
      );
    },
    cell: ({ getValue }) => {
      const director = getValue<string>();
      return <RowContainer className="">{director}</RowContainer>;
    },

    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'director_email',
    accessorKey: 'director.email',
    header: () => {
      return (
        <HeaderContainer className="cursor-default">
          <span>بريد المدير</span>
        </HeaderContainer>
      );
    },
    cell: ({ getValue }) => {
      const directorEmail = getValue<string>();
      return <RowContainer className="">{directorEmail}</RowContainer>;
    },

    enableSorting: false,
    enableHiding: true,
  },
  {
    id: 'director_phone',
    accessorKey: 'director.phone',
    header: () => {
      return (
        <HeaderContainer className="cursor-default">
          <span>هاتف المدير</span>
        </HeaderContainer>
      );
    },
    cell: ({ getValue }) => {
      const directorPhone = getValue<string>();
      return <RowContainer className="">{directorPhone}</RowContainer>;
    },

    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => {
      return (
        <HeaderContainer onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <span>تاريخ التحديث</span>
          {column.getIsSorted() === 'asc' && <ArrowUp />}
          {column.getIsSorted() === 'desc' && <ArrowUp className="rotate-180" />}
          {column.getIsSorted() === false && <ChevronsUpDown />}
        </HeaderContainer>
      );
    },
    cell: ({ getValue }) => {
      const dateString = getValue<string>();
      const formattedDate = dayjs(dateString).format('ll');
      return <RowContainer className=" w-full">{formattedDate}</RowContainer>;
    },

    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsColumn row={row} />,
    size: 32,
    minSize: 32,
    maxSize: 32,
    enableSorting: false,
    enableHiding: false,
  },
];

export default columnsRowsDefinition;
