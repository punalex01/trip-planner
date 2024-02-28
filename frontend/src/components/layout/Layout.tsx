import { FC, useEffect, useState } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'shadcn/components/ui/resizable';
import { PageHeader } from './PageHeader';
import { Sidebar } from './sidebar/Sidebar';
import { cn } from 'shadcn/lib/utils';
import { Outlet, useOutletContext } from 'react-router-dom';
import { get_trips } from 'src/api/trips/requests';
import { TripSummary } from 'src/interfaces/TripSummary';

export const Layout: FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [trips, setTrips] = useState<TripSummary[]>([]);

  async function getTrips() {
    const response = await get_trips();
    if (response.ok) {
      const response_json = await response.json();
      setTrips(response_json['trips']);
    }
  }

  useEffect(() => {
    getTrips();
  }, []);

  return (
    <>
      <div className='h-full w-full flex flex-col overflow-hidden'>
        <PageHeader />
        <div className='grow bg-apricot border border-gray-600'>
          <ResizablePanelGroup direction='horizontal' className='h-full'>
            <ResizablePanel
              defaultSize={15}
              minSize={10}
              maxSize={15}
              collapsible={true}
              collapsedSize={5}
              onCollapse={() => setIsCollapsed(true)}
              onExpand={() => setIsCollapsed(false)}
              className={cn('h-full flex flex-col', isCollapsed && 'min-w-10 transition-all duration-300 ease-in-out')}
            >
              <Sidebar isCollapsed={isCollapsed} trips={trips} />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={80} className='h-full'>
              <Outlet context={[trips, setTrips] satisfies [TripSummary[], (trips: TripSummary[]) => void]} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </>
  );
};

export function useTrips() {
  return useOutletContext<[TripSummary[], (trips: TripSummary[]) => void]>();
}
