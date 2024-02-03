import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from 'shadcn/components/ui/avatar';
import { HomeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PageHeader: FC = () => {
  return (
    <>
      <div className='h-24 w-full bg-eggplant'>
        <div className='h-full p-6 flex justify-end items-center space-x-3'>
          <div className='h-full p-2 flex hover:cursor-pointer hover:bg-wheat/20 rounded-md text-white items-center'>
            <Link to={`home`}>
              <HomeIcon />
            </Link>
          </div>
          <div className='w-12 h-12 rounded-full overflow-hidden hover:cursor-pointer'>
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </>
  );
};
