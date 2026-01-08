import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { DEFAULT_ID, InviteType } from '@/constants';
import useDeepCompareMemo from '@/hooks/useDeepCompareMemo';
import { cn } from '@/lib/utils';
import { getQueryClient } from '@/providers/query.provider';
import { useMutationDeleteInvite } from '@/services/v1/user-invite/delete';
import {
  GET_USERS_INVITE_API_URL,
  IGetUsersInviteResponse,
  useGetUsersInvite,
} from '@/services/v1/user-invite/get';
import { useMutationResendInvite } from '@/services/v1/user-invite/resendInvite';
import { genBase64Avatar } from '@/utils/image';
import { AvatarImage } from '@radix-ui/react-avatar';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { message } from 'antd';
import { MoreHorizontal, RefreshCcw, Trash2 } from 'lucide-react';

export interface UsersInviteProps {}

export default function UsersInvite(_props: UsersInviteProps) {
  const {
    data: usersInvite,
    isLoading,
    isFetching,
    isPending,
  } = useGetUsersInvite({
    params: {},
  });
  const [messageApi, contextHolder] = message.useMessage();

  const dataFinal = useDeepCompareMemo(() => {
    return (usersInvite || [])?.filter(
      (item) => item.type !== InviteType.PUBLIC
    );
  }, [usersInvite]);

  const { mutate: mutateResend } = useMutationResendInvite({});
  const { mutate: mutateDelete } = useMutationDeleteInvite({});

  const queryClient = getQueryClient();

  const columnsRender: ColumnDef<IGetUsersInviteResponse>[] = [
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
      accessorKey: 'createdAt',
      header: 'Invited Date',
      cell: ({ row }) => {
        const createdAt = row.original?.createdAt;
        return (
          <span className='font-sfpro text-sm text-neutral-500'>
            {new Date(createdAt).toLocaleDateString()}
          </span>
        );
      },
    },
    {
      accessorKey: 'usedAt',
      header: 'Status',
      cell: ({ row }) => {
        const usedAt = row.original?.usedAt;

        return (
          <span
            className={cn(
              'font-sfpro text-sm',
              usedAt ? 'text-neutral-500  font-medium' : 'text-yellow-600'
            )}
          >
            {usedAt
              ? `Joined on ${new Date(usedAt).toLocaleDateString()}`
              : 'Pending'}
          </span>
        );
      },
    },
    {
      accessorKey: 'invitedBy',
      header: 'Invited By',
      cell: ({ row }) => {
        const email = row.original?.invitedBy?.email;
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
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const inviteId = row.original?.id ?? DEFAULT_ID;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='max-w-[270px]'>
              <DropdownMenuItem
                onClick={() => {
                  mutateResend(
                    { inviteId },
                    {
                      onSuccess: () => {
                        messageApi.success('Invitation resent successfully');
                      },
                    }
                  );
                }}
                className='group items-start '
              >
                <RefreshCcw className='mt-1 transition-transform duration-300 group-hover:rotate-180' />{' '}
                <div className='flex flex-col'>
                  <span>Resend Invite</span>
                  <span className='text-xs text-neutral-500'>
                    Resend the invitation email to the user associated with this
                    invite.
                  </span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  mutateDelete(
                    { inviteId },
                    {
                      onSuccess: () => {
                        queryClient.invalidateQueries({
                          queryKey: [GET_USERS_INVITE_API_URL],
                        });
                        messageApi.success('Invitation removed successfully');
                      },
                    }
                  );
                }}
                className='text-red-500 focus:text-red-600  '
              >
                <Trash2 className='text-red-500' />
                Remove Invite
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: dataFinal,
    columns: columnsRender,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      'px-0 text-center',
                      header?.id === 'invitedBy' && 'pl-4',
                      (header?.id === 'email' || header?.id === 'invitedBy') &&
                        'text-left'
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
      {contextHolder}
    </>
  );
}


