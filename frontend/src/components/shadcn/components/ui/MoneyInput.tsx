import { useReducer } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from 'shadcn/components/ui/form'; // Shadcn UI import
import { Input } from 'shadcn/components/ui/input'; // Shandcn UI Input
import { UseFormReturn } from 'react-hook-form';
import { currencyFormatter } from 'src/global/functions';

type TextInputProps = {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
  className?: string;
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
              <FormLabel>{props.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={props.placeholder}
                  type='text'
                  {...field}
                  onChange={(ev) => {
                    setValue(ev.target.value);
                    handleChange(_change, ev.target.value);
                  }}
                  value={value}
                  className={props.className}
                />
              </FormControl>
            </div>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
