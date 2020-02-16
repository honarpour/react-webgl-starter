import React from 'react';

import GlobalStyles from './GlobalStyles';
import { supportsWebGL } from './utils';
import Scene from './Scene';
import NoSupport from './NoSupport';

const App = () => (
  <>
    <GlobalStyles />
    {supportsWebGL() ? <Scene /> : <NoSupport />}
  </>
);

export default App;
