import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { post_register } from 'src/api/auth/auth';
import { useAuthContext } from 'src/context/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export const RegisterForm = () => {
  const auth = useAuthContext();
  const navigate = useNavigate();

  const formSchema = z.object({
    email: z.string().min(1).max(16),
    password: z.string().min(1),
    name: z.string().min(1).max(16),
  });

  const registerForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await post_register(values);

    const responseBody = await response.json();
    if (response.ok) {
      auth.setToken(responseBody['token']);
      navigate('/home');
    } else {
      registerForm.setError('root', {
        type: 'register',
        message: responseBody['msg'],
      });
    }
  }

  return { registerForm, onSubmit };
};
