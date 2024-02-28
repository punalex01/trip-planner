import { useState, FC } from 'react';
import { Button } from 'shadcn/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from 'shadcn/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from 'shadcn/components/ui/popover';
import { Check, ChevronsUpDown, ListTodo } from 'lucide-react';
import { cn } from 'shadcn/lib/utils';
import { ScrollArea } from 'shadcn/components/ui/scroll-area';

import { useAppContext } from 'src/context/AppContext';
import { FinancialsSidebarButtons } from './FinancialsSidebarButtons';
import { NavLink } from 'react-router-dom';
import { TripSummary } from 'src/interfaces/TripSummary';

interface SidebarProps {
  isCollapsed: boolean;
  trips: TripSummary[];
}

export const Sidebar: FC<SidebarProps> = ({ isCollapsed, trips }) => {
  const [open, setOpen] = useState(false);
  const [{ currentTripModule }, { setCurrentTrip }] = useAppContext();
  const currTrip = currentTripModule.trip;

  const displaySearchBar = () => {
    if (!isCollapsed) {
      return (
        <div className='w-full flex justify-end'>
          <div className='w-full grow flex justify-start line-clamp-1'>
            {currentTripModule.trip ? currentTripModule.trip.name : 'Select trip...'}
          </div>
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </div>
      );
    }

    if (!currTrip) {
      return <ChevronsUpDown className='h-4 w-4 shrink-0 opacity-50' />;
    }

    return <div className='font-bold'>{currTrip.name[0].toUpperCase()}</div>;
  };

  // TODO: hardcode isntead of dynamically rendering buttons
  const displayModules = () => {
    if (isCollapsed) {
      return (
        <div className='h-full w-full flex flex-col space-y-2'>
          <FinancialsSidebarButtons isSidebarCollapsed={isCollapsed} />
          <div className='border border-eggplant/20 rounded-xl'>
            <NavLink
              to='/checklists'
              className={({ isActive }) =>
                `flex grow h-10 w-full px-2 space-x-2 rounded-lg border border-eggplant/20 items-center hover:cursor-pointer overflow-clip line-clamp-1 ${isActive ? ' bg-eggplant/20' : ' hover:bg-eggplant/20'}`
              }
            >
              <ListTodo className='shrink-0' />
            </NavLink>
          </div>
        </div>
      );
    }

    return (
      <div className='h-full w-full flex flex-col space-y-2'>
        <FinancialsSidebarButtons isSidebarCollapsed={isCollapsed} />
        <NavLink
          to='/checklists'
          className={({ isActive }) =>
            `flex grow h-10 w-full px-2 space-x-2 rounded-lg border border-eggplant/20 items-center hover:cursor-pointer overflow-clip line-clamp-1 ${isActive ? ' bg-eggplant/20' : ' hover:bg-eggplant/20'}`
          }
        >
          <ListTodo className='shrink-0' />
          <h2 className='line-clamp-1'>Checklists</h2>
        </NavLink>
      </div>
    );
  };

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
                {trips.map((trip) => (
                  <CommandItem
                    key={trip.uuid}
                    value={trip.name}
                    onSelect={() => {
                      const currTrip = trips.find((mockTrip) => mockTrip.uuid === trip.uuid);
                      if (currTrip !== undefined) setCurrentTrip(currTrip);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        currTrip && currTrip.name === trip.name.toLowerCase() ? 'opacity-100' : 'opacity-0'
                      )}
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
        <ScrollArea className='w-full p-3'>{displayModules()}</ScrollArea>
      </div>
    </>
  );
};
