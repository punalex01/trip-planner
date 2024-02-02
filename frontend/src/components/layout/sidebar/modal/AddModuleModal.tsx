import { Dispatch, FC, SetStateAction } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from 'shadcn/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'shadcn/components/ui/card';
import { Input } from 'shadcn/components/ui/input';
import { Form, FormField, FormItem, FormLabel } from 'shadcn/components/ui/form';
import { RadioGroup, RadioGroupItem } from 'shadcn/components/ui/radio-group';
import { CircleDollarSign, ListTodo, CalendarDays } from 'lucide-react';
import { Label } from 'shadcn/components/ui/label';

import { AddModuleForm } from '../forms/AddModuleForm';
import { CHECKLIST_MODULE, FINANCIAL_MODULE, ITINERARY_MODULE } from 'src/global/constants';

interface AddModuleModalProps {
  isModuleModalOpen: boolean;
  setModuleModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const AddModuleModal: FC<AddModuleModalProps> = ({ isModuleModalOpen, setModuleModalOpen }) => {
  const { modalForm, onSubmit, onError } = AddModuleForm();

  return (
    <Dialog.Root open={isModuleModalOpen} onOpenChange={setModuleModalOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-black/50 fixed inset-0' />
        <Dialog.Content className=''>
          <Card className='w-[350px] max-h-[350px] fixed inset-0 items-center mx-auto my-auto'>
            <CardHeader>
              <CardTitle>Create module</CardTitle>
            </CardHeader>
            <Form {...modalForm}>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
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
                            <Input placeholder='Name of your module' {...field} />
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={modalForm.control}
                      name='moduleType'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Module</FormLabel>
                          <RadioGroup
                            defaultValue={CHECKLIST_MODULE}
                            className='grid grid-cols-3 gap-4'
                            onValueChange={field.onChange}
                          >
                            <div>
                              <RadioGroupItem
                                value={CHECKLIST_MODULE}
                                id={CHECKLIST_MODULE}
                                className='peer sr-only'
                                aria-label={CHECKLIST_MODULE}
                              />
                              <Label
                                htmlFor={CHECKLIST_MODULE}
                                className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
                              >
                                <ListTodo className='mb-3 h-6 w-6' />
                                Checklist
                              </Label>
                            </div>

                            <div>
                              <RadioGroupItem
                                value={FINANCIAL_MODULE}
                                id={FINANCIAL_MODULE}
                                className='peer sr-only'
                                aria-label={FINANCIAL_MODULE}
                              />
                              <Label
                                htmlFor={FINANCIAL_MODULE}
                                className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
                              >
                                <CircleDollarSign className='mb-3 h-6 w-6' />
                                Financials
                              </Label>
                            </div>

                            <div>
                              <RadioGroupItem
                                value={ITINERARY_MODULE}
                                id={ITINERARY_MODULE}
                                className='peer sr-only'
                                aria-label={ITINERARY_MODULE}
                              />
                              <Label
                                htmlFor={ITINERARY_MODULE}
                                className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
                              >
                                <CalendarDays className='mb-3 h-6 w-6' />
                                Itinerary
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter className='flex justify-between'>
                  <Button variant='outline' onClick={() => setModuleModalOpen(false)}>
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
