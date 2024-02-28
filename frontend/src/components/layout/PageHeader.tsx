import { FC } from 'react';
import { HomeIcon, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'shadcn/components/ui/dropdown-menu';
import { post_logout } from 'src/api/auth/requests';
import { useAuthContext } from 'src/context/auth/AuthContext';

export const PageHeader: FC = () => {
  const authContext = useAuthContext();

  const logout = async () => {
    await post_logout();
    authContext.setToken('');
  };

  return (
    <>
      <div className='h-24 w-full bg-eggplant'>
        <div className='h-full p-6 flex justify-end items-center space-x-3'>
          <div className='h-full p-2 flex hover:cursor-pointer hover:bg-wheat/20 rounded-md text-white items-center'>
            <Link to={`home`}>
              <HomeIcon />
            </Link>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className='h-full p-2 flex hover:cursor-pointer hover:bg-wheat/20 rounded-md text-white items-center'>
              <Settings color='white' />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' onCloseAutoFocus={(e) => e.preventDefault()}>
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => logout()}>Log Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};
