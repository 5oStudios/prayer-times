'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '../../lib/store';

const ReduxProviders = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

export default ReduxProviders;
