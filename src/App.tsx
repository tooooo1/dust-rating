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
  CityRankingPage,
  SidoRankingPage,
  DustForcastPage,
  DustMapPage,
} from '@/pages';
import { ROUTE } from '@/utils/constants';
import AsyncBoundary from './components/common/AsyncBoundary';
import theme from './styles/theme';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTE.HOME} element={<Logo />}>
      <Route index element={<ChoicePage />} />
      <Route path={ROUTE.SIDO_RANKING} element={<SidoRankingPage />} />
      <Route path={ROUTE.CITY_RANKING} element={<CityRankingPage />} />
      <Route
        path={ROUTE.DUST_FORCAST}
        element={
          <AsyncBoundary title="해당 지역의 예보 정보를 불러오지 못했어요.">
            <DustForcastPage />
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
