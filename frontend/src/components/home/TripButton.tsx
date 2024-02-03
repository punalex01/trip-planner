import { FC, Dispatch, SetStateAction } from 'react';
import { format } from 'date-fns';
import { cn } from 'shadcn/lib/utils';

interface TripButtonProps {
  name: string;
  startDate?: Date;
  color: string;
  hoverColor: string;
  onClick?: Dispatch<SetStateAction<boolean>>;
}

export const TripButton: FC<TripButtonProps> = ({ name, startDate, color, hoverColor, onClick }) => {
  const displayDate = startDate ? (
    <div className='text-sm text-white mt-2'>{`${format(startDate, "MMM ''yy")}`}</div>
  ) : null;
  console.log(hoverColor);
  return (
    <>
      <button
        className={cn(
          `flex flex-col max-h-64 min-h-64 min-w-64 max-w-64 rounded-xl items-center justify-center mx-3 mt-3 hover:cursor-pointer`,
          `${color}`,
          `${hoverColor}`
        )}
        onClick={() => onClick && onClick(true)}
      >
        <div className='text-xl text-white'>{name}</div>
        {displayDate}
      </button>
    </>
  );
};
