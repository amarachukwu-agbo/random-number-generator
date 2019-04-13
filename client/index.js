import React from 'react';
import { render } from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCog,
  faChevronRight,
  faChevronLeft,
  faCaretDown,
} from '@fortawesome/free-solid-svg-icons';

import Generator from './views/Generator';

library.add(faCog, faChevronLeft, faChevronRight, faCaretDown);

// eslint-disable-next-line react/jsx-filename-extension
const App = () => <Generator />;
render(<App />, document.getElementById('app'));
