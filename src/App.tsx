import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Logo from '@/components/Logo';
import {
  ChoicePage,
  RankingPage,
  DustForecastPage,
  DustMapPage,
  ErrorPage,
} from '@/pages';
import { ROUTE } from '@/utils/constants';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTE.HOME} element={<Logo />} errorElement={<ErrorPage />}>
      <Route index element={<ChoicePage />} />
      <Route path={ROUTE.RANKING} element={<RankingPage />} />
      <Route path={ROUTE.DUST_FORECAST} element={<DustForecastPage />} />
      <Route path={ROUTE.DUST_MAP} element={<DustMapPage />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
