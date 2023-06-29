import { ChakraProvider } from '@chakra-ui/react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import { AsyncBoundary, ErrorFallback } from '@/components/common';
import Logo from '@/components/Logo';
import {
  ChoicePage,
  CityRankingPage,
  SidoRankingPage,
  DustForecastPage,
  DustMapPage,
} from '@/pages';
import { ROUTE } from '@/utils/constants';
import SortContextProvider from './store/sort';
import theme from './styles/theme';
import { fallbackSize } from './types/error';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTE.HOME} element={<Logo />}>
      <Route index element={<ChoicePage />} />
      <Route
        path={ROUTE.RANKING}
        element={
          <SortContextProvider>
            <SidoRankingPage />
          </SortContextProvider>
        }
      />
      <Route
        path={`${ROUTE.RANKING}/:place`}
        element={
          <SortContextProvider>
            <CityRankingPage />
          </SortContextProvider>
        }
      />
      <Route
        path={ROUTE.DUST_FORECAST}
        element={
          <AsyncBoundary
            rejectFallback={
              <ErrorFallback errorMessage="해당 지역의 예보 정보를 불러오지 못했어요." />
            }
          >
            <DustForecastPage />
          </AsyncBoundary>
        }
      />
      <Route
        path={ROUTE.DUST_MAP}
        element={
          <AsyncBoundary
            rejectFallback={
              <ErrorFallback
                size={fallbackSize.FULL}
                errorMessage="지도를 불러오지 못했어요."
              />
            }
          >
            <DustMapPage />
          </AsyncBoundary>
        }
      />
      <Route path="*" element={<Navigate replace to={ROUTE.HOME} />} />
    </Route>
  )
);

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};

export default App;
