import { TripSummary } from 'src/interfaces/TripSummary';

export const mockTrips: TripSummary[] = [
  {
    name: 'Japan',
    startDate: new Date(2024, 3, 15),
    endDate: new Date(2024, 3, 23),
    description: 'Japan trip!!!',
    uuid: '61f7d257-911a-406a-a814-43f176460a16',
    id: 0,
  },
  {
    name: 'Portugal',
    startDate: new Date(2024, 1, 9),
    endDate: new Date(2024, 1, 18),
    description: 'Bacalhau!!!',
    uuid: '4cb53319-9eee-4344-8202-0b688fe4869f',
    id: 1,
  },
];
