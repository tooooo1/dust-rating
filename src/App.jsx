import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import Logo from './components/Logo/index.jsx';
import Choice from './pages/Choice.jsx';
import Result from './pages/Result.jsx';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    outline: none;
    box-sizing: border-box;
  }
`;

const App = () => (
  <BrowserRouter>
    <GlobalStyle />
    <Logo />
    <Routes>
      <Route path="/" element={<Choice />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  </BrowserRouter>
);

export default App;
