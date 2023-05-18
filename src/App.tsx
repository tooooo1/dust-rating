import { Center, ChakraProvider } from '@chakra-ui/react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import AlertBox from '@/components/common/AlertBox';
import Logo from '@/components/Logo';
import {
  ChoicePage,
  RankingPage,
  DustForecastPage,
  DustMapPage,
} from '@/pages';
import { ROUTE } from '@/utils/constants';
import theme from './styles/theme';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTE.HOME} element={<Logo />}>
      <Route index element={<ChoicePage />} />
      <Route path={ROUTE.RANKING} element={<RankingPage />} />
      <Route
        path={ROUTE.DUST_FORECAST}
        element={
          <ErrorBoundary
            fallback={
              <Center height="100%">
                <AlertBox title="예보 정보를 불러오지 못했어요." />
              </Center>
            }
          >
            <DustForecastPage />
          </ErrorBoundary>
        }
      />
      <Route path={ROUTE.DUST_MAP} element={<DustMapPage />} />
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
