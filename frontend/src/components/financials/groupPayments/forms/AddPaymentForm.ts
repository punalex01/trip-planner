import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
        amount: z.number(),
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
      lendeeAmounts: [
        {
          user: {
            name: '',
            email: '',
            uuid: '',
          },
          amount: 1,
          isReturned: false,
        },
      ],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function onError() {
    console.log();
  }

  return { modalForm, onSubmit, onError };
};
