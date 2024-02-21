import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export const SignupForm = () => {
  const formSchema = z.object({
    email: z.string().min(1).max(16),
    password: z.string().min(1),
    name: z.string().min(1).max(16),
    // password: z.string().min(8).max(16),
  });

  const signupForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function onError() {
    console.log();
  }

  return { signupForm, onSubmit, onError };
};
