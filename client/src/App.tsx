import React from "react";

import Router from "./components/Router";
import Providers from "./components/Providers/Index";

const App = () => {
  return (
  	<Providers>
      <Router />
    </Providers>
  );
};

export default App;
