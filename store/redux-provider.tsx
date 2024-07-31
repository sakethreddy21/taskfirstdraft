'use client';

import store, { persistor } from '@/store/store';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      
        {children}
     
    </Provider>
  );
}
