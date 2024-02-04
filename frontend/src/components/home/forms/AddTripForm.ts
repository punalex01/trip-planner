import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DateRange } from 'react-day-picker';

export const AddTripForm = () => {
  const formSchema = z.object({
    name: z.string().min(2).max(50),
    dates: z.optional(
      z.object({
        from: z.optional(z.date().min(new Date('1900-01-01'))),
        to: z.optional(z.date().min(new Date('1900-01-01'))),
      })
    ),
    description: z.string().min(1).max(250),
  });

  const modalForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      dates: {
        to: new Date(2022, 0, 20),
        from: new Date(2022, 0, 20),
      },
      description: '',
    },
  });

  const setDate = (dates: DateRange | undefined) => {
    modalForm.setValue('dates', dates);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {}

  function onError() {}

  return { modalForm, setDate, onSubmit, onError };
};
