import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CHECKLIST_MODULE, FINANCIAL_MODULE, ITINERARY_MODULE } from 'src/global/constants';

export const AddModuleForm = () => {
  const formSchema = z.object({
    name: z.string().min(2).max(50),
    moduleType: z.enum([CHECKLIST_MODULE, FINANCIAL_MODULE, ITINERARY_MODULE]),
  });

  const modalForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      moduleType: CHECKLIST_MODULE,
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
