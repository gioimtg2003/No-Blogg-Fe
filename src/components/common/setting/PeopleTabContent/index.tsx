'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { PEOPLE_TAB_KEYS } from '@/constants';
import { useDisclosure } from '@/hooks';
import { cn } from '@/lib/utils';
import { useGetPublicLinkInvite } from '@/services/v1/user-invite/generatePublicLink';
import { isDeepEqualReact } from '@/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { message } from 'antd';
import { memo, useState } from 'react';
import FormInviteUser from './FormInviteUser';
import MembersTable from './MembersTable';
import UsersInvite from './UsersInvite';

const labelMapPeopleTab = {
  [PEOPLE_TAB_KEYS.MEMBERS]: 'Members',
  [PEOPLE_TAB_KEYS.INVITATIONS]: 'Invitations',
  [PEOPLE_TAB_KEYS.REQUEST_ACCESS]: 'Request Access',
};

const PeopleTabContent = () => {
  const {
    data: publicInvite,
    isLoading: isLoadingGetPublicInvite,
    isFetching: isFetchingGetPublicInvite,
    refetch: refetchGetPublicInvite,
  } = useGetPublicLinkInvite({
    params: {},
    enabled: false,
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [tabActive, setTabActive] = useState<string>(PEOPLE_TAB_KEYS.MEMBERS);
  const {
    isOpen: isOpenInvite,
    open: openInvite,
    onChange: onChangeInvite,
  } = useDisclosure();

  const isLoadingCopy = isLoadingGetPublicInvite || isFetchingGetPublicInvite;

  return (
    <>
      <Dialog open={isOpenInvite} onOpenChange={onChangeInvite}>
        <DialogContent
          className='max-w-[460px] overflow-hidden px-4'
          showCloseButton={false}
        >
          <FormInviteUser />
        </DialogContent>
      </Dialog>

      <div className='px-3 overflow-auto '>
        {contextHolder}

        <div className='w-full flex text-left mb-4'>
          <h2 className='text-base font-medium font-sfpro'>People</h2>
        </div>
        <div className='w-full flex justify-between items-center mb-2'>
          <div className='flex flex-col'>
            <span className='text-sm font-sfpro'>
              Invite People to Team Workspace
            </span>
            <span className='text-sm text-muted-foreground text-wrap'>
              Copy the link and send it to others to join team workspace.
            </span>
          </div>
          <Button
            variant='secondary'
            size='sm'
            loading={isLoadingCopy}
            onClick={async () => {
              if (publicInvite?.url) {
                if (navigator.clipboard) {
                  await navigator.clipboard.writeText(publicInvite?.url);
                  messageApi.success('Invite link copied to clipboard');
                }
                return;
              }

              refetchGetPublicInvite().then(async (res) => {
                if (res?.data?.url) {
                  if (navigator.clipboard) {
                    await navigator.clipboard.writeText(res?.data?.url);
                    messageApi.success('Invite link copied to clipboard');
                  }
                }
              });
            }}
          >
            Copy Invite Link
          </Button>
        </div>
        <div className='w-full h-6 mb-4 border-b border-b-gray-200'></div>
        <Tabs
          className='w-full h-full'
          onValueChange={setTabActive}
          value={tabActive}
        >
          <div className='w-full flex justify-between items-center'>
            <TabsList className='w-full mb-2 flex gap-3'>
              {Object.entries(labelMapPeopleTab).map(([key, label]) => (
                <TabsTrigger key={key} value={key} asChild>
                  <Button
                    variant={'ghost'}
                    size='sm'
                    className={cn('rounded-t-md font-sfpro', {
                      'bg-white font-medium text-black': tabActive === key,
                      'text-in-active': tabActive !== key,
                    })}
                  >
                    {label}
                  </Button>
                </TabsTrigger>
              ))}
            </TabsList>
            <Button
              variant='default'
              size='sm'
              onClick={openInvite}
              className='px-2 text-sm'
            >
              Invite People
            </Button>
          </div>

          <TabsContent value={PEOPLE_TAB_KEYS.MEMBERS} className='px-3'>
            <MembersTable />
          </TabsContent>
          <TabsContent value={PEOPLE_TAB_KEYS.INVITATIONS} className='px-3'>
            <UsersInvite />
          </TabsContent>
          <TabsContent value={PEOPLE_TAB_KEYS.REQUEST_ACCESS} className='px-3'>
            request access
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

PeopleTabContent.displayName = 'PeopleTabContent';

export default memo(PeopleTabContent, isDeepEqualReact);
