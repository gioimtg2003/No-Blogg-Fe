'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { SETTING_ROUTE_KEYS } from '@/constants';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { Settings } from 'lucide-react';
import { useState } from 'react';
import PeopleTabContent from './PeopleTabContent';
import RoleTabContent from './RoleTabContent';

export default function SettingComponent() {
  const [tabActive, setTabActive] = useState<string>(SETTING_ROUTE_KEYS.ROLES);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuButton
          asChild
          className='cursor-pointer '
          tooltip={'Manager your account and settings'}
        >
          <div className='flex items-center gap-2'>
            <Settings color='#86837e' className='!size-[22px]' />
            <span>Settings</span>
          </div>
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent
        className='max-h-[715px] max-w-[calc(100vw-100px)] sm:max-w-[calc(100vw-100px)] h-[calc(-100px+100vh)] w-[1150px] overflow-hidden p-0'
        title=''
      >
        <DialogTitle hidden />
        <Tabs
          className='w-full h-full'
          onValueChange={setTabActive}
          value={tabActive}
        >
          <SidebarProvider>
            <Sidebar className='h-full min-w-[240px]'>
              <SidebarContent>
                <TabsList>
                  <SidebarGroup>
                    <SidebarGroupLabel className='text-gray-600'>
                      Permission
                    </SidebarGroupLabel>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          className={cn(
                            'font-normal text-[#2c2c2b] font-sfpro cursor-pointer',
                            tabActive === SETTING_ROUTE_KEYS.ROLES &&
                              'font-medium bg-[#e9e9e9]'
                          )}
                        >
                          <TabsTrigger value={SETTING_ROUTE_KEYS.ROLES} asChild>
                            <div className='flex items-center gap-2 focus-visible:outline-none w-full '>
                              <Settings
                                color='#86837e'
                                className='!size-[20px]'
                              />
                              <span>Roles</span>
                            </div>
                          </TabsTrigger>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          className={cn(
                            'font-normal text-[#2c2c2b] font-sfpro cursor-pointer',
                            tabActive === SETTING_ROUTE_KEYS.PEOPLE &&
                              'font-medium bg-[#e9e9e9]'
                          )}
                        >
                          <TabsTrigger
                            value={SETTING_ROUTE_KEYS.PEOPLE}
                            asChild
                          >
                            <div className='flex items-center gap-2 focus-visible:outline-none  w-full '>
                              <Settings
                                color='#86837e'
                                className='!size-[20px]'
                              />
                              <span>People</span>
                            </div>
                          </TabsTrigger>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroup>
                </TabsList>
              </SidebarContent>
            </Sidebar>

            <TabsContent
              value={SETTING_ROUTE_KEYS.ROLES}
              className='pl-4 mr-8 pb-5 pt-8 h-full w-full overflow-auto '
            >
              <RoleTabContent />
            </TabsContent>
            <TabsContent
              value={SETTING_ROUTE_KEYS.PEOPLE}
              className='pl-4 mr-8 pb-5 pt-8 h-full w-full overflow-auto '
            >
              <PeopleTabContent />
            </TabsContent>
          </SidebarProvider>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
