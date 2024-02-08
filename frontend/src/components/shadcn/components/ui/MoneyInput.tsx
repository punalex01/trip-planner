/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer } from 'react';
import { FormControl, FormField, FormItem, FormLabel } from 'shadcn/components/ui/form'; // Shadcn UI import
import { Input } from 'shadcn/components/ui/input'; // Shandcn UI Input
import { UseFormReturn } from 'react-hook-form';
import { currencyFormatter } from 'src/global/functions';

type TextInputProps = {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  placeholder: string;
  className?: string;
  disabled?: boolean;
};

export default function MoneyInput(props: TextInputProps) {
  const initialValue = props.form.getValues()[props.name]
    ? currencyFormatter.format(props.form.getValues()[props.name])
    : '';

  const [value, setValue] = useReducer((_: any, next: string) => {
    const digits = next.replace(/\D/g, '');
    return currencyFormatter.format(Number(digits) / 100);
  }, initialValue);

  function handleChange(realChangeFn: (value: number) => any, formattedValue: string) {
    const digits = formattedValue.replace(/\D/g, '');
    const realValue = Number(digits) / 100;
    realChangeFn(realValue);
  }

  const formValue = props.form.watch(props.name);

  return (
    <FormField
      control={props.form.control}
      name={props.name}
      render={({ field }) => {
        field.value = value;
        const _change = field.onChange;

        return (
          <FormItem>
            <div className='flex flex-col space-y-1.5'>
              {props.label ? <FormLabel>{props.label}</FormLabel> : null}
              <FormControl>
                <Input
                  placeholder={props.placeholder}
                  type='text'
                  {...field}
                  disabled={props.disabled ? true : false}
                  onChange={(ev) => {
                    setValue(ev.target.value);
                    handleChange(_change, ev.target.value);
                  }}
                  value={props.disabled ? '$0.00' : currencyFormatter.format(formValue)}
                  className={props.className}
                />
              </FormControl>
            </div>

            {/* <FormMessage /> */}
          </FormItem>
        );
      }}
    />
  );
}
