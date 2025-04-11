import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/common/ErrorBoundary';

// Lazy load pages for better performance
import { lazy, Suspense } from 'react';
const Home = lazy(() => import('./pages/Home'));
const DestinationList = lazy(() => import('./pages/DestinationList'));
const DestinationDetail = lazy(() => import('./pages/DestinationDetail'));
const MyJournals = lazy(() => import('./pages/MyJournals'));

import Loading from './components/common/Loading';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'destinations',
        element: (
          <Suspense fallback={<Loading />}>
            <DestinationList />
          </Suspense>
        ),
      },
      {
        path: 'destinations/:id',
        element: (
          <Suspense fallback={<Loading />}>
            <DestinationDetail />
          </Suspense>
        ),
      },
      {
        path: 'my-journals',
        element: (
          <Suspense fallback={<Loading />}>
            <MyJournals />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;