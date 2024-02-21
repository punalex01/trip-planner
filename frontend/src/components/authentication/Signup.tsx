import { FC } from 'react';
import { Button } from 'shadcn/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from 'shadcn/components/ui/card';
import { Form, FormField, FormItem, FormLabel } from 'shadcn/components/ui/form';
import { Input } from 'shadcn/components/ui/input';
import { SignupForm } from './forms/SignupForm';

export const Signup: FC = () => {
  const { signupForm, onSubmit, onError } = SignupForm();
  return (
    <>
      <div className='w-full h-full bg-eggplant'>
        <Card className='w-[400px] max-h-[400px] fixed inset-0 items-center mx-auto my-auto flex flex-col'>
          <CardHeader className='h-16 w-full'>
            <CardTitle>Log In</CardTitle>
          </CardHeader>
          <Form {...signupForm}>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                signupForm.handleSubmit(onSubmit, onError)();
              }}
              className='grow w-full flex flex-col justify-end'
            >
              <CardContent className='grow'>
                <div className='flex h-full w-full flex-row'>
                  <div className='w-full space-y-3'>
                    <FormField
                      control={signupForm.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <div className='flex flex-col space-y-2'>
                            <FormLabel>Name</FormLabel>
                            <Input placeholder='John Doe' {...field} />
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem>
                          <div className='flex flex-col space-y-2'>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder='johndoe@gmail.com' {...field} />
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signupForm.control}
                      name='password'
                      render={({ field }) => (
                        <FormItem>
                          <div className='flex flex-col space-y-2'>
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
                  Sign Up
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
};
