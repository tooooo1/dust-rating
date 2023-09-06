import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { INIT_STALE_TIME } from '@/utils/constants';
import App from './App';
import '@/styles/globalStyle.css';
import '@/styles/reset.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: INIT_STALE_TIME,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
