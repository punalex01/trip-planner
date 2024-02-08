import { Dispatch, FC, SetStateAction } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from 'shadcn/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'shadcn/components/ui/card';
import { Input } from 'shadcn/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from 'shadcn/components/ui/form';
import { CalendarIcon } from 'lucide-react';
import MoneyInput from '../../shadcn/components/ui/MoneyInput';
import { Popover, PopoverContent, PopoverTrigger } from 'shadcn/components/ui/popover';
import { format } from 'date-fns';
import { Calendar } from 'shadcn/components/ui/calendar';
import { cn } from 'shadcn/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'shadcn/components/ui/select';
import { Checkbox } from 'shadcn/components/ui/checkbox';

import { AddPaymentForm } from './forms/AddPaymentForm';
import { mockUsers } from 'src/mocks/users';

interface AddPaymentModalProps {
  isAddPaymentModalOpen: boolean;
  setAddPaymentModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const AddPaymentModal: FC<AddPaymentModalProps> = ({ isAddPaymentModalOpen, setAddPaymentModalOpen }) => {
  const { modalForm, onSubmit, onError, splitEvenly } = AddPaymentForm();

  return (
    <Dialog.Root open={isAddPaymentModalOpen} onOpenChange={setAddPaymentModalOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-black/50 fixed inset-0' />
        <Dialog.Content className=''>
          <Card className='w-[700px] max-h-[400px] fixed inset-0 items-center mx-auto my-auto flex flex-col'>
            <CardHeader className='h-16 w-full'>
              <CardTitle>Add Payment</CardTitle>
            </CardHeader>
            <Form {...modalForm}>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  modalForm.handleSubmit(onSubmit, onError)();
                }}
                className='grow w-full flex flex-col justify-end'
              >
                <CardContent className='grow'>
                  <div className='flex h-full w-full flex-row'>
                    <div className='grid items-center gap-4 w-1/2 pr-4'>
                      <FormField
                        control={modalForm.control}
                        name='name'
                        render={({ field }) => (
                          <FormItem>
                            <div className='flex flex-col space-y-1.5'>
                              <FormLabel>Name</FormLabel>
                              <Input placeholder='Name of the payment' {...field} />
                            </div>
                          </FormItem>
                        )}
                      />
                      <div className='w-full flex flex-row space-x-2'>
                        <FormField
                          control={modalForm.control}
                          name='date'
                          render={({ field }) => (
                            <FormItem className='flex flex-col w-1/2'>
                              <FormLabel>Payment Date</FormLabel>
                              <Popover modal={true}>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={'outline'}
                                      className={cn(
                                        'w-full px-2 text-left font-normal flex justify-between',
                                        !field.value && 'text-muted-foreground'
                                      )}
                                    >
                                      {field.value ? format(field.value, 'MM / dd / yyyy') : <span>Pick a date</span>}
                                      <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className='w-auto p-0' align='start' avoidCollisions={false}>
                                  <Calendar
                                    mode='single'
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                            </FormItem>
                          )}
                        />
                        <MoneyInput form={modalForm} label='Total' name='total' placeholder='$0.00' />
                      </div>
                      <FormField
                        control={modalForm.control}
                        name='lender'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lendee</FormLabel>
                            <Select
                              onValueChange={(value) => field.onChange(mockUsers.find((user) => user.uuid === value))}
                              defaultValue={field.value.name}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder='Lendee' />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent avoidCollisions={false}>
                                {mockUsers.map((user, index) => {
                                  return (
                                    <SelectItem key={index} value={user.uuid}>
                                      {user.name}
                                    </SelectItem>
                                  );
                                })}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className='w-1/2 border-l border-bg'>
                      <FormField
                        control={modalForm.control}
                        name='lendeeAmounts'
                        render={() => (
                          <FormItem>
                            <div className='mb-2 px-3'>
                              <FormLabel>Lendees</FormLabel>
                            </div>
                            <div className='space-y-2'>
                              {mockUsers.map((user, index) => (
                                <FormField
                                  key={index}
                                  control={modalForm.control}
                                  name='lendeeAmounts'
                                  render={({ field }) => {
                                    return (
                                      <div className='flex flex-col w-full h-12 px-3'>
                                        <FormItem
                                          key={user.uuid}
                                          className='flex flex-row items-center space-y- justify-between'
                                        >
                                          <div className=' space-x-3'>
                                            <FormControl>
                                              <Checkbox
                                                checked={field.value?.some((lendee) => lendee.user.uuid === user.uuid)}
                                                onCheckedChange={(checked) => {
                                                  return checked
                                                    ? field.onChange([
                                                        ...field.value,
                                                        {
                                                          user: mockUsers.find((e) => e.uuid === user.uuid),
                                                          total: 0,
                                                          isReturned: false,
                                                        },
                                                      ])
                                                    : field.onChange(
                                                        field.value?.filter((value) => value.user.uuid !== user.uuid)
                                                      );
                                                }}
                                              />
                                            </FormControl>
                                            <FormLabel className='font-normal'>{user.name}</FormLabel>
                                          </div>

                                          <MoneyInput
                                            form={modalForm}
                                            name={`lendeeAmounts.${field.value.findIndex((lendeeAmount) => lendeeAmount.user.uuid === user.uuid)}.amount`}
                                            placeholder='$0.00'
                                            disabled={!field.value?.some((lendee) => lendee.user.uuid === user.uuid)}
                                            className='w-32 justify-self-end'
                                          />
                                        </FormItem>
                                      </div>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className='flex'>
                  <div className='w-1/2'>
                    <Button variant='outline' onClick={() => setAddPaymentModalOpen(false)}>
                      Cancel
                    </Button>
                  </div>

                  <div className='flex w-1/2 flex-row justify-between'>
                    <Button variant='outline' onClick={() => splitEvenly()}>
                      Split Evenly
                    </Button>
                    <Button type='submit'>Create</Button>
                  </div>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
