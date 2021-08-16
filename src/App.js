import React from 'react';
import { useSelector } from 'react-redux';

import createRouter from '~/routes';

const App = () => {
  // Take the value to identify if the user is logged
  const signed = useSelector((state) => state.auth.signed);

  // Create the Routes component using the infromation
  // This way the user see's only the signed or unsigned routes
  const Routes = createRouter(signed);

  return <Routes />;
};
export default App;
