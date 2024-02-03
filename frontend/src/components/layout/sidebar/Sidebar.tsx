import { useState, FC } from 'react';
import { Button } from 'shadcn/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from 'shadcn/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from 'shadcn/components/ui/popover';
import { Check, ChevronsUpDown, CircleDollarSign, ListTodo } from 'lucide-react';
import { cn } from 'shadcn/lib/utils';
import { ScrollArea } from 'shadcn/components/ui/scroll-area';

import { mockTrips } from 'src/mocks/trips';
import { mockJapanModules } from 'src/mocks/pages';
import { CHECKLIST_MODULE, FINANCIAL_MODULE } from 'src/global/constants';
import { AddModuleModal } from './modal/AddModuleModal';

interface SidebarProps {
  isCollapsed: boolean;
}

export const Sidebar: FC<SidebarProps> = ({ isCollapsed }) => {
  const [open, setOpen] = useState(false);
  const [currTrip, setTrip] = useState('');
  const [currModule, setModule] = useState('Group Packing List');
  const [isModuleModalOpen, setModuleModalOpen] = useState(false);

  const displaySearchBar = () => {
    if (!isCollapsed) {
      return (
        <div className='w-full flex justify-end'>
          <div className='w-full grow flex justify-start line-clamp-1'>
            {currTrip ? mockTrips.find((trip) => trip.name.toLowerCase() === currTrip)?.name : 'Select trip...'}
          </div>
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </div>
      );
    }

    if (!currTrip) {
      return <ChevronsUpDown className='h-4 w-4 shrink-0 opacity-50' />;
    }

    return <div className='font-bold'>{currTrip[0].toUpperCase()}</div>;
  };

  const displayModules = mockJapanModules.map((module, index) => {
    const bg = currModule === module.name ? ' bg-eggplant/20' : ' hover:bg-eggplant/20';

    let moduleIcon;
    switch (module.pageType) {
      case FINANCIAL_MODULE:
        moduleIcon = <CircleDollarSign />;
        break;
      case CHECKLIST_MODULE:
        moduleIcon = <ListTodo />;
        break;
      default:
        break;
    }

    if (isCollapsed) {
      return (
        <div
          key={index}
          onClick={() => setModule(module.name)}
          className={'h-10 w-full rounded-lg flex justify-center items-center hover:cursor-pointer' + bg}
        >
          {moduleIcon}
        </div>
      );
    }

    return (
      <div
        key={index}
        onClick={() => setModule(module.name)}
        className={
          'flex grow h-10 w-full px-2 space-x-2 rounded-lg items-center hover:cursor-pointer overflow-clip line-clamp-1' +
          bg
        }
      >
        {moduleIcon}
        <h2 className='line-clamp-1'>{module.name}</h2>
      </div>
    );
  });

  return (
    <>
      <div className='h-16 w-full px-3 py-3 border-b-2 border-gray-600'>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant='outline' role='combobox' aria-expanded={open} className={'flex w-full text-clip'}>
              {displaySearchBar()}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-full p-0'>
            <Command>
              <CommandInput placeholder='Search trip...' />
              <CommandEmpty>No trip found.</CommandEmpty>
              <CommandGroup>
                {mockTrips.map((trip) => (
                  <CommandItem
                    key={trip.id}
                    value={trip.name}
                    onSelect={(currentValue) => {
                      setTrip(currentValue === currTrip ? '' : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn('mr-2 h-4 w-4', currTrip === trip.name.toLowerCase() ? 'opacity-100' : 'opacity-0')}
                    />
                    {trip.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className='flex grow flex-col w-full'>
        <ScrollArea className='w-full p-3'>
          <div className='h-full w-full flex flex-col space-y-2'>{displayModules}</div>
        </ScrollArea>
        <div className='w-full h-16 mt-auto p-3'>
          <div
            onClick={() => setModuleModalOpen(true)}
            className='flex h-10 bg-eggplant/50 justify-center items-center rounded-lg hover:cursor-pointer hover:bg-eggplant'
          >
            <button className='text-white'>{isCollapsed ? '+' : '+ New Module'}</button>
          </div>
        </div>
        <AddModuleModal isModuleModalOpen={isModuleModalOpen} setModuleModalOpen={setModuleModalOpen} />
      </div>
    </>
  );
};
