import { Dispatch, FC, SetStateAction } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from 'shadcn/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'shadcn/components/ui/card';
import { Input } from 'shadcn/components/ui/input';
import { Textarea } from 'shadcn/components/ui/textarea';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { cn } from 'shadcn/lib/utils';
import { Calendar } from 'shadcn/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from 'shadcn/components/ui/popoverDialog';
import { Form, FormField, FormItem, FormLabel } from 'shadcn/components/ui/form';
import { AddTripForm } from './forms/AddTripForm';

interface AddTripModalProps {
  isTripModalOpen: boolean;
  setTripModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const AddTripModal: FC<AddTripModalProps> = ({ isTripModalOpen, setTripModalOpen }) => {
  const { modalForm, setDate, onSubmit, onError } = AddTripForm();
  const { dates } = modalForm.watch();

  return (
    <Dialog.Root open={isTripModalOpen} onOpenChange={setTripModalOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-black/50 fixed inset-0' />
        <Dialog.Content className=''>
          <Card className='w-[350px] max-h-[425px] fixed inset-0 items-center mx-auto my-auto'>
            <CardHeader>
              <CardTitle>Create Trip</CardTitle>
            </CardHeader>
            <Form {...modalForm}>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  modalForm.setError('dates', { type: 'required' });
                  modalForm.handleSubmit(onSubmit, onError)();
                }}
              >
                <CardContent>
                  <div className='grid w-full items-center gap-4'>
                    <FormField
                      control={modalForm.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <div className='flex flex-col space-y-1.5'>
                            <FormLabel>Name</FormLabel>
                            <Input placeholder='Name of your trip' {...field} />
                          </div>
                        </FormItem>
                      )}
                    />
                    <div className='flex flex-col space-y-1.5'>
                      <FormField
                        control={modalForm.control}
                        name='dates'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Dates</FormLabel>
                            <div className={cn('grid gap-2')}>
                              <Popover modal={true}>
                                <PopoverTrigger asChild>
                                  <Button
                                    id='dates'
                                    variant={'outline'}
                                    className={cn(
                                      'w-[300px] justify-start text-left font-normal',
                                      !dates && 'text-muted-foreground'
                                    )}
                                  >
                                    <CalendarIcon className='mr-2 h-4 w-4' />
                                    {dates?.from ? (
                                      dates.to ? (
                                        <>
                                          {format(dates.from, 'LLL dd, y')} - {format(dates.to, 'LLL dd, y')}
                                        </>
                                      ) : (
                                        format(dates.from, 'LLL dd, y')
                                      )
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className='w-auto p-0' align='start'>
                                  <Calendar
                                    initialFocus
                                    mode='range'
                                    defaultMonth={dates?.from}
                                    selected={field.value as DateRange}
                                    onSelect={setDate}
                                    numberOfMonths={2}
                                  />
                                </PopoverContent>
                              </Popover>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={modalForm.control}
                      name='description'
                      render={({ field }) => (
                        <FormItem>
                          <div className='flex flex-col space-y-1.5'>
                            <FormLabel htmlFor='description'>Description</FormLabel>
                            <Textarea className='resize-none' {...field} />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter className='flex justify-between'>
                  <Button variant='outline' onClick={() => setTripModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type='submit'>Create</Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
