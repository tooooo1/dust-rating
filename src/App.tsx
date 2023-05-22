import { ChakraProvider } from '@chakra-ui/react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import Logo from '@/components/Logo';
import {
  ChoicePage,
  RankingPage,
  DustForecastPage,
  DustMapPage,
} from '@/pages';
import { ROUTE } from '@/utils/constants';
import AsyncBoundary from './components/common/AsyncBoundary';
import theme from './styles/theme';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTE.HOME} element={<Logo />}>
      <Route index element={<ChoicePage />} />
      <Route path={ROUTE.RANKING} element={<RankingPage />} />
      <Route
        path={ROUTE.DUST_FORECAST}
        element={
          <AsyncBoundary title="해당 지역의 예보 정보를 불러오지 못했어요.">
            <DustForecastPage />
          </AsyncBoundary>
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
