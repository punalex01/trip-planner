import { Dispatch, FC, SetStateAction } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from 'shadcn/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'shadcn/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from 'shadcn/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'shadcn/components/ui/select';

import { RepayForm } from './forms/RepayForm';
import { Checkbox } from 'shadcn/components/ui/checkbox';
import { currencyFormatter } from 'src/global/functions';

interface RepayModalProps {
  isRepayModalOpen: boolean;
  setRepayModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const RepayModal: FC<RepayModalProps> = ({ isRepayModalOpen, setRepayModalOpen }) => {
  const { modalForm, onSubmit, onError, paymentsOwed, possibleLenders, calculateTotal } = RepayForm();
  const repaymentTotal = modalForm.watch('total');

  return (
    <Dialog.Root open={isRepayModalOpen} onOpenChange={setRepayModalOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-black/50 fixed inset-0' />
        <Dialog.Content className=''>
          <Card className='w-[350px] max-h-[500px] fixed inset-0 items-center mx-auto my-auto flex flex-col'>
            <CardHeader className='h-16 w-full'>
              <CardTitle>Log Repayment</CardTitle>
            </CardHeader>
            <Form {...modalForm}>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  modalForm.handleSubmit(onSubmit, onError)();
                }}
                className='grow w-full flex flex-col justify-end'
              >
                <CardContent className='grow pb-3'>
                  <div className='flex h-full w-full flex-col space-y-3'>
                    <FormField
                      control={modalForm.control}
                      name='receiver'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lender</FormLabel>
                          <Select
                            onValueChange={(value) =>
                              field.onChange(possibleLenders.find((user) => user.uuid === value)?.uuid)
                            }
                            // Default value should be user submitting form
                            // defaultValue={modalForm.watch('lender.name')}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='-' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent avoidCollisions={false}>
                              {possibleLenders.map((user, index) => {
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
                    <FormField
                      control={modalForm.control}
                      name='itemsRepaid'
                      render={() => (
                        <FormItem className='flex flex-col grow'>
                          <div>
                            <FormLabel>Select items to pay back</FormLabel>
                          </div>
                          <div className='h-[210px] border rounded-md overflow-auto'>
                            <div className=' p-2  space-y-2'>
                              {paymentsOwed.map((owed, index) => (
                                <FormField
                                  key={index}
                                  control={modalForm.control}
                                  name='itemsRepaid'
                                  render={({ field }) => {
                                    return (
                                      <div className='flex flex-col w-full h-8'>
                                        <FormItem
                                          key={owed.paymentUUID}
                                          className='flex flex-row items-center justify-between'
                                        >
                                          <div className=' space-x-3'>
                                            <FormControl>
                                              <Checkbox
                                                checked={field.value?.some((uuid) => uuid === owed.paymentUUID)}
                                                onCheckedChange={(checked) => {
                                                  if (checked) {
                                                    calculateTotal(true, owed);
                                                    field.onChange([...field.value, owed.paymentUUID]);
                                                  } else {
                                                    calculateTotal(false, owed);
                                                    field.onChange(
                                                      field.value?.filter((uuid) => uuid !== owed.paymentUUID)
                                                    );
                                                  }
                                                }}
                                              />
                                            </FormControl>
                                            <FormLabel className='font-normal'>{owed.name}</FormLabel>
                                          </div>
                                          <FormLabel className='font-normal'>
                                            {currencyFormatter.format(owed.total)}
                                          </FormLabel>
                                        </FormItem>
                                      </div>
                                    );
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </FormItem>
                      )}
                    />
                    <div className='flex justify-between'>
                      <label className='font-bold'>Total:</label>
                      <span className='font-bold'>{currencyFormatter.format(repaymentTotal)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className='flex justify-between '>
                  <Button
                    variant='outline'
                    onClick={() => {
                      modalForm.reset();
                      setRepayModalOpen(false);
                    }}
                  >
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
