import { FC, useState } from 'react';
import { TripButton } from './TripButton';
import { AddTripModal } from './modal/AddTripModal';
import { useTrips } from '../layout/Layout';
import { useAppContext } from 'src/context/AppContext';

export const Home: FC = () => {
  const [isTripModalOpen, setTripModalOpen] = useState(false);
  const [, { setCurrentTrip }] = useAppContext();
  const [trips, setTrips] = useTrips();

  return (
    <>
      <div className='flex flex-col h-full w-full'>
        <div className='h-16 w-full px-3 flex items-center border-b-2 border-gray-600 py-3'>
          <div className='text-3xl h-10'>Pick a trip to start</div>
        </div>
        <div className={`relative w-full h-full overflow-auto`}>
          <div className='absolute top-0 bot-0 left-0 right-0 flex flex-row flex-wrap pb-3'>
            <TripButton
              name={'+ New Trip'}
              color='bg-eggplant/50'
              hoverColor='hover:bg-eggplant'
              onClick={setTripModalOpen}
            />
            <AddTripModal isTripModalOpen={isTripModalOpen} setTripModalOpen={setTripModalOpen} setTrips={setTrips} />
            {trips.map((value, key) => (
              <TripButton
                key={key}
                name={value.name}
                startDate={value.startDate}
                color='bg-violet'
                hoverColor='hover:bg-violet/50'
                onClick={() => {
                  const currTrip = trips.find((trip) => trip.uuid === value.uuid);
                  if (currTrip) {
                    setCurrentTrip(currTrip);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
