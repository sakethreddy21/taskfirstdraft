'use client';

import store from '@/app/store/store';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';


export default function Providers({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      
        {children}
     
    </Provider>
  );
}
