import { FC } from 'react';
import { Button } from 'shadcn/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'shadcn/components/ui/card';
import { Form, FormField, FormItem, FormLabel } from 'shadcn/components/ui/form';
import { Input } from 'shadcn/components/ui/input';
import { LoginForm } from './forms/LoginForm';
import { Link } from 'react-router-dom';

export const Login: FC = () => {
  const { loginForm, onSubmit, onError } = LoginForm();
  return (
    <>
      <div className='w-full h-full bg-eggplant'>
        <Card className='w-[400px] max-h-[340px] fixed inset-0 items-center mx-auto my-auto flex flex-col'>
          <CardHeader className='h-16 w-full'>
            <CardTitle>Log In</CardTitle>
          </CardHeader>
          <Form {...loginForm}>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                loginForm.handleSubmit(onSubmit, onError)();
              }}
              className='grow w-full flex flex-col justify-end'
            >
              <CardContent className='grow'>
                <div className='flex h-full w-full flex-row'>
                  <div className='w-full'>
                    <FormField
                      control={loginForm.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem>
                          <div className='flex flex-col space-y-3'>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder='Email' {...field} />
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name='password'
                      render={({ field }) => (
                        <FormItem>
                          <div className='flex flex-col space-y-3'>
                            <FormLabel>Password</FormLabel>
                            <Input placeholder='Password' {...field} type='password' />
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className='flex w-full flex-col space-y-3'>
                <Button type='submit' className='w-full bg-eggplant text-white'>
                  Sign In
                </Button>
                <p>
                  Don&apos;t have an account?{' '}
                  <Link to='/signup' className='underline hover:text-eggplant/20'>
                    Sign up!
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
};
