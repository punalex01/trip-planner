import { useState, FC } from 'react';
import { Button } from 'shadcn/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from 'shadcn/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from 'shadcn/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from 'shadcn/lib/utils';
import { mockTrips } from 'src/mocks/trips';

export const Sidebar: FC = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  return (
    <>
      <div className='h-16 w-full px-3 py-3 border-b-2 border-gray-600'>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant='outline' role='combobox' aria-expanded={open} className='w-[200px] justify-between'>
              {value ? mockTrips.find((trip) => trip.name.toLowerCase() === value)?.name : 'Select trip...'}
              <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[200px] p-0'>
            <Command>
              <CommandInput placeholder='Search trip...' />
              <CommandEmpty>No trip found.</CommandEmpty>
              <CommandGroup>
                {mockTrips.map((trip) => (
                  <CommandItem
                    key={trip.id}
                    value={trip.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn('mr-2 h-4 w-4', value === trip.name.toLowerCase() ? 'opacity-100' : 'opacity-0')}
                    />
                    {trip.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};
