import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { Choice, Result } from "./pages"
import reset from "styled-reset";

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
      {/* <Logo /> */}
      <Routes>
        <Route path="/" element={<Choice />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
);

export default App;
