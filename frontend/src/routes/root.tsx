import { FC } from 'react';
import { Outlet } from 'react-router-dom';

export const Root: FC = () => {
  return (
    <>
      <div>
        <h1>Root Page</h1>
        <Outlet />
      </div>
    </>
  );
};
