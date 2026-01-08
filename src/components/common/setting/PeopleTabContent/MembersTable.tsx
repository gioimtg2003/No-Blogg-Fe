import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import {
  IGetUsersResponse,
  useGetUsers,
} from '@/services/v1/user-team/getUsers';
import { genBase64Avatar } from '@/utils/image';
import { AvatarImage } from '@radix-ui/react-avatar';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

export interface MembersTableProps {}

export default function MembersTable(_props: MembersTableProps) {
  const { data, isLoading, isFetching, isPending } = useGetUsers({
    params: {},
  });

  const columnsRender: ColumnDef<IGetUsersResponse>[] = [
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => {
        const email = row.original?.email;
        return (
          <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
            <Avatar className='h-8 w-8 rounded-xl'>
              <AvatarImage
                src={genBase64Avatar({
                  name: email ?? 'Name',
                  email: email ?? 'email',
                })}
                alt={email || 'Avatar'}
              />
              <AvatarFallback className='rounded-lg'>B</AvatarFallback>
            </Avatar>
            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-medium font-sfpro'>{email}</span>
              <span className='truncate text-xs text-in-active'>{email}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'teams',
      header: 'Team spaces',
      cell: ({ row }) => {
        const teams = row.original?.teams || [];
        const teamsCount = teams.length;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='p-1 px-[6px] rounded-sm w-fit text-sm hover:bg-neutral-100 cursor-pointer transition duration-200 ease-in-out text-gray-800'>
                {teamsCount} Team spaces
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-[200px]' align='start'>
              <DropdownMenuLabel>Team spaces</DropdownMenuLabel>
              <div className='max-h-60 overflow-auto'>
                {teams.map((team) => (
                  <DropdownMenuItem
                    className={'h-7 flex items-center gap-2'}
                    key={team.id}
                  >
                    <Avatar className='h-6 w-6 rounded-full'>
                      <AvatarImage
                        src={genBase64Avatar(
                          {
                            name: team.name ?? 'Name',
                            email: team.name ?? 'email',
                          },
                          { size: 'small' }
                        )}
                        alt={team.name || 'Avatar'}
                      />
                      <AvatarFallback className='rounded-lg'>B</AvatarFallback>
                    </Avatar>
                    <span className='truncate font-sfpro text-sm'>
                      {team.name}
                    </span>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    {
      accessorKey: 'roles',
      header: 'Roles',
      cell: ({ row }) => {
        const roles = row.original?.roles || [];
        const rolesCount = roles.length;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className='p-1 px-[6px] rounded-sm w-fit text-sm hover:bg-neutral-100 cursor-pointer transition duration-200 ease-in-out text-gray-800'>
                {rolesCount} Roles
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-[200px]' align='start'>
              <DropdownMenuLabel>Roles</DropdownMenuLabel>
              <div className='max-h-60 overflow-auto'>
                {roles.map((role) => (
                  <DropdownMenuItem
                    className={'h-7 flex items-center gap-2'}
                    key={role.id}
                  >
                    <Avatar className='h-6 w-6 rounded-full'>
                      <AvatarImage
                        src={genBase64Avatar(
                          {
                            name: role.name ?? 'Name',
                            email: role.name ?? 'email',
                          },
                          { size: 'small' }
                        )}
                        alt={role.name || 'Avatar'}
                      />
                      <AvatarFallback className='rounded-lg'>B</AvatarFallback>
                    </Avatar>
                    <span className='truncate font-sfpro text-sm'>
                      {role.name}
                    </span>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Joined Date',
      cell: ({ row }) => {
        const createdAt = row.original?.createdAt;
        return (
          <span className='font-sfpro text-sm text-neutral-500'>
            {new Date(createdAt).toLocaleDateString()}
          </span>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data || [],
    columns: columnsRender,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              console.log(header);
              return (
                <TableHead
                  key={header.id}
                  className={cn(
                    'px-0 text-center',
                    header?.id === 'email' && 'text-left'
                  )}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody
        isLoading={isPending || isLoading || isFetching}
        columnCount={columnsRender.length}
      >
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
              className='h-10'
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} align='center'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={columnsRender?.length}
              className='h-24 text-center'
            >
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
