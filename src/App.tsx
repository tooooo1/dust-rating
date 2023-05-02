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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTE.HOME} element={<Logo />}>
      <Route index element={<ChoicePage />} />
      <Route path={ROUTE.RANKING} element={<RankingPage />} />
      <Route path={ROUTE.DUST_FORECAST} element={<DustForecastPage />} />
      <Route path={ROUTE.DUST_MAP} element={<DustMapPage />} />
      <Route path="*" element={<Navigate replace to={ROUTE.HOME} />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
