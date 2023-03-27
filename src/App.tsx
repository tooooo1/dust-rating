import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Logo from '@/components/Logo';
import { ChoicePage, ResultPage } from '@/pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Logo />}>
      <Route index element={<ChoicePage />} />
      <Route path="/result" element={<ResultPage />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
