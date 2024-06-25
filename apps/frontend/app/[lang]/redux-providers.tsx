'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persister } from '../../lib/store';

const ReduxProviders = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>
    <PersistGate loading={null} persister={persister}>
      {children}
    </PersistGate>
  </Provider>
);

export default ReduxProviders;
