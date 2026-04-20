'use client';

import React, { useState } from 'react';
import {
  HelpHeader,
  QuickActions,
  GettingStarted,
  PopularArticles,
  TopicBrowser,
  ContactSupportModal,
  LiveChatWidget,
} from './_components';
import { mockArticles, mockCategories, gettingStartedArticles } from './mock-data';

const HelpPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8 pb-12">
      <HelpHeader onContactClick={() => setIsModalOpen(true)} />
      <QuickActions />
      <div className="px-8 space-y-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <GettingStarted />
          </div>
          <div>
            <PopularArticles />
          </div>
        </div>
        <TopicBrowser />
      </div>
      <LiveChatWidget />
      <ContactSupportModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
};

export default HelpPage;