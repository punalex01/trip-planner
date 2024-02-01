import { FC, useState } from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'shadcn/components/ui/resizable';
import { PageHeader } from './PageHeader';
import { Sidebar } from './Sidebar';
import { cn } from 'shadcn/lib/utils';

export const Layout: FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <div className='h-full w-full flex flex-col px-12 py-6 bg-jade'>
        <PageHeader />
        <div className='grow bg-wheat border rounded-lg border-gray-600'>
          {/* Content header Component */}
          <ResizablePanelGroup direction='horizontal' className='h-full'>
            <ResizablePanel
              defaultSize={15}
              minSize={10}
              maxSize={20}
              collapsible={true}
              collapsedSize={5}
              onCollapse={() => setIsCollapsed(true)}
              onExpand={() => setIsCollapsed(false)}
              className={cn(isCollapsed && 'min-w-10 transition-all duration-300 ease-in-out')}
            >
              <Sidebar isCollapsed={isCollapsed} />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={80}>Two</ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </>
  );
};
