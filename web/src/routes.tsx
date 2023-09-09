import {BrowserRouter, Route, Routes} from "react-router-dom";

import CreatePoint from "./pages/CreatePoint";
import Home from "./pages/Home";

const Router = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/create-point" Component={CreatePoint} />
    </Routes>
    </BrowserRouter>
  );
};

export default Router;