import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { mockPaymentsOwed } from 'src/mocks/payments';
import { IPaymentOwed } from 'src/interfaces/Payment';
import { mockUsers } from 'src/mocks/users';

export const RepayForm = () => {
  const formSchema = z.object({
    receiver: z.string(),
    total: z.number().gt(0),
    itemsRepaid: z.array(z.string()),
  });

  const modalForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receiver: '',
      total: 0,
      itemsRepaid: [],
    },
  });

  const paymentsOwed = mockPaymentsOwed;
  const possibleLenders = mockUsers;

  const calculateTotal = (isAdd: boolean, selectedOwed: IPaymentOwed) => {
    const currTotal = modalForm.getValues('total');
    const newAddend = isAdd ? selectedOwed.total : -selectedOwed.total;
    modalForm.setValue('total', currTotal + newAddend, { shouldDirty: true });
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function onError() {
    console.log();
  }

  return { modalForm, onSubmit, onError, paymentsOwed, possibleLenders, calculateTotal };
};
