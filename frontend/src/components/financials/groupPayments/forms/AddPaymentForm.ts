import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

export const AddPaymentForm = () => {
  const formSchema = z.object({
    name: z.string().min(1).max(50),
    date: z.date(),
    lender: z.object({
      name: z.string(),
      email: z.string(),
      uuid: z.string(),
    }),
    total: z.number().gt(0),
    lendeeAmounts: z.array(
      z.object({
        user: z.object({
          name: z.string(),
          email: z.string(),
          uuid: z.string(),
        }),
        amount: z.number().gt(0),
        isReturned: z.boolean(),
      })
    ),
  });

  const modalForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      date: new Date(),
      lender: {
        name: '',
        email: '',
        uuid: '',
      },
      total: 0,
      lendeeAmounts: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function onError() {
    console.log();
  }

  const lenderAmounts = modalForm.watch('lendeeAmounts');
  useEffect(() => console.log(lenderAmounts), [lenderAmounts]);

  return { modalForm, onSubmit, onError };
};
