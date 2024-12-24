'use client';
import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/clientApi/instance/queryClient';
import { ArticlesList } from '@/app/admin/components/ArticlesList';

const AdminPanel = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-8">
        <ArticlesList />
      </div>
    </QueryClientProvider>
  );
};

export default AdminPanel;
