import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getQueryClient } from '@/providers/query.provider';
import { useCreateInvite } from '@/services/v1/user-invite/create';
import { GET_USERS_INVITE_API_URL } from '@/services/v1/user-invite/get';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRoundPlus } from 'lucide-react';
import { useRef } from 'react';
import z from 'zod';
import { FormText } from '../../form';
import BaseForm, { BaseGFormRef } from '../../form/BaseForm';

export default function FormInviteUser() {
  const { mutate, isPending } = useCreateInvite({});
  const queryClient = getQueryClient();

  const formRef = useRef<BaseGFormRef<any>>(null);

  return (
    <>
      <DialogHeader className='items-center gap-1'>
        <UserRoundPlus className='text-muted-foreground' />
        <DialogTitle className='font-medium text-lg font-sfpro'>
          Invite Members
        </DialogTitle>
      </DialogHeader>
      <BaseForm
        ref={formRef}
        onSubmit={(data: any) => {
          mutate(
            { ...data },
            {
              onSuccess: async () => {
                await queryClient.invalidateQueries({
                  queryKey: [GET_USERS_INVITE_API_URL],
                });
                formRef.current?.reset();
              },
            }
          );
        }}
        resolver={zodResolver(
          z.object({
            email: z
              .array(z.email({ error: 'Invalid email' }))
              .min(1, 'At least one email is required'),
          })
        )}
        defaultValues={{
          email: [],
        }}
      >
        <FormText
          name='email'
          rootClassName='w-full'
          size='small'
          fieldProps={{
            placeholder: 'Input name or emails',
            mode: 'multiple',
            className: 'w-full has-[:focus-visible]:ring-none',
          }}
        />
        <Button
          type='submit'
          variant={'secondary'}
          className='w-full h-7 mt-6'
          loading={isPending}
        >
          Send Invites
        </Button>
      </BaseForm>
    </>
  );
}
