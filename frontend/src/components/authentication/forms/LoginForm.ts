import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from 'src/context/auth/AuthContext';
import { fetch_login } from 'src/api/auth/auth';

export const LoginForm = () => {
  const auth = useAuthContext();
  const navigate = useNavigate();

  const formSchema = z.object({
    email: z.string().min(1).max(20),
    password: z.string().min(1),
    // password: z.string().min(8).max(16),
  });

  const loginForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch_login(values);

    const responseBody = await response.json();
    if (response.ok) {
      auth.setToken(responseBody['token']);
      navigate('/home');
    } else {
      loginForm.setError('root', {
        type: 'login',
        message: responseBody['msg'],
      });
      console.log(responseBody['msg']);
    }
  }

  return { loginForm, onSubmit };
};
