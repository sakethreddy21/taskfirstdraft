import { Toaster } from '@/components/ui/sonner';
import Providers from '@/store/redux-provider';
import './globals.css';


import QueryProvider from './QueryProvider';

const name = 'draft';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
       
      </head>
      <body >
        
          <Providers>
            <QueryProvider>{children}</QueryProvider>
          </Providers>
      
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
