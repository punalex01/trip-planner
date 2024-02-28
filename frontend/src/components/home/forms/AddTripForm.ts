import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { DateRange } from 'react-day-picker';
import { post_trips } from 'src/api/trips/requests';
import { TripSummary } from 'src/interfaces/TripSummary';

export const AddTripForm = (
  setTrips: (trips: TripSummary[]) => void,
  setTripModalOpen: (isModalOpen: boolean) => void
) => {
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
        to: new Date(),
        from: new Date(),
      },
      description: '',
    },
  });

  const setDate = (dates: DateRange | undefined) => {
    modalForm.setValue('dates', dates);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.dates === undefined || values.dates.from === undefined || values.dates.to === undefined) {
      // TODO: Show error msg (dates are not entered)
      return;
    }

    const payload = {
      name: values.name,
      startDate: values.dates.from,
      endDate: values.dates.to,
      description: values.description,
    };

    const response = await post_trips(payload);
    const response_json = await response.json();
    if (response.ok) {
      setTrips(response_json['trips']);
      modalForm.reset();
      setTripModalOpen(false);
    } else {
      modalForm.setError('root', { type: 'trips', message: response_json['msg'] });
    }
  }

  function onError() {}

  return { modalForm, setDate, onSubmit, onError };
};
