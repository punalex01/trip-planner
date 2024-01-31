import { FC } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'shadcn/components/ui/resizable';
import { PageHeader } from './PageHeader';
import { Sidebar } from './Sidebar';

export const Layout: FC = () => {
  return (
    <>
      <div className='h-full w-full flex flex-col px-12 py-6 bg-jade'>
        <PageHeader />
        <div className='grow bg-wheat border rounded-lg border-gray-600'>
          {/* Content header Component */}
          <ResizablePanelGroup direction='horizontal' className='h-full'>
            <ResizablePanel defaultSize={25} minSize={10} className='border-r-2 border-gray-600'>
              {/* Sidebar Component */}
              <Sidebar />
              <div className='p-6 h-full text-white'>One</div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>Two</ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </>
  );
};
