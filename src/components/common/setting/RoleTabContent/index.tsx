import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useDisclosure } from '@/hooks';
import { isDeepEqualReact } from '@/utils';
import { Plus } from 'lucide-react';
import { memo } from 'react';
import FormActionRole from './FormActionRole';
import TableRole from './TableRole';

const RoleTabContent = () => {
  const { isOpen, open, onChange } = useDisclosure();

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent className='p-0 overflow-hidden'>
          <FormActionRole open={isOpen} onChange={onChange} />
        </DialogContent>
      </Dialog>
      <div className='w-full flex justify-between items-center mb-4'>
        <h2 className='text-base font-medium font-sfpro'>Roles Management</h2>
        <Button
          variant='default'
          size='sm'
          childrenClassName='flex items-center gap-2'
          onClick={open}
        >
          <Plus /> <span>Add Role</span>
        </Button>
      </div>
      <TableRole />
    </>
  );
};

RoleTabContent.displayName = 'RoleTabContent';
export default memo(RoleTabContent, isDeepEqualReact);
