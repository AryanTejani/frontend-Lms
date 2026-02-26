'use client';

import { useState } from 'react';
import { SearchBar, Button } from '@/components/ui';
import { TabsBar } from '../client/components/TabsBar';
import { ForYouTab, ExploreTab, MyCollectionsTab } from '../client/components';
import { useVideos } from '../client/hooks/useVideos';

const tabs = [
  { label: 'For You', value: 'for-you' },
  { label: 'Explore', value: 'explore' },
  { label: 'My Collections', value: 'my-collections' },
];

export function VideosView() {
  const [activeTab, setActiveTab] = useState('for-you');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useVideos(page, 20);
  const videos = data?.videos ?? [];
  const totalPages = data ? Math.ceil(data.total / data.limit) : 0;

  function handleSearchChange(value: string) {
    setSearchQuery(value);
    setPage(1);
  }

  return (
    <div className="flex flex-col gap-(--space-2xl) sm:gap-(--space-4xl) px-(--space-base) sm:px-(--space-lg) py-(--space-lg) sm:py-(--space-2xl)">
      {/* Header */}
      <div className="flex flex-col gap-(--space-lg) sm:gap-(--space-2xl)">
        <div className="flex flex-col gap-(--space-base)">
          <h4 className="h4 h4-bold text-(--color-text-primary)">Videos</h4>
          <span className="label-1 label-1-medium text-(--color-text-tertiary)">
            Explore our video library to elevate your trading skills
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-(--space-sm)">
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            onClear={() => handleSearchChange('')}
            placeholder="Search courses, masterclasses, and reports..."
            className="w-full sm:max-w-[506px]"
          />
          {activeTab !== 'for-you' && (
            <div className="flex items-center gap-(--space-xs)">
              <Button variant="stroke" className="h-12 w-[104px] rounded-full">
                Filters
              </Button>
              <Button variant="stroke" className="h-12 w-[104px] rounded-full">
                Sort
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <TabsBar tabs={tabs} selectedTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      {activeTab === 'for-you' && <ForYouTab videos={videos} isLoading={isLoading} />}
      {activeTab === 'explore' && <ExploreTab videos={videos} isLoading={isLoading} />}
      {activeTab === 'my-collections' && <MyCollectionsTab />}

      {/* Pagination */}
      {!isLoading && totalPages > 1 && activeTab !== 'my-collections' && (
        <div className="flex items-center justify-center gap-(--space-sm)">
          <Button
            variant="stroke"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-full"
          >
            Previous
          </Button>
          <span className="label-1 label-1-medium text-(--color-text-tertiary)">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="stroke"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-full"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
