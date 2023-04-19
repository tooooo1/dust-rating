import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Logo from '@/components/Logo';
import { ChoicePage, RankingPage, LocalDetailPage, DustMapPage } from '@/pages';
import { ROUTE } from '@/utils/constants';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={ROUTE.HOME} element={<Logo />}>
      <Route index element={<ChoicePage />} />
      <Route path={ROUTE.RANKING} element={<RankingPage />} />
      <Route path={ROUTE.LOCAL_DETAIL} element={<LocalDetailPage />} />
      <Route path={ROUTE.DUST_MAP} element={<DustMapPage />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
