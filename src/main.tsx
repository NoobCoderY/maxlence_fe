import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './store/store.ts';
import { ThemeProvider } from './modules/core/contexts/theme-provider.tsx';
import { Toaster } from '@/shadcn/components/ui/toaster';
import { Toaster as SoonerToaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
      >
        <ThemeProvider
          defaultTheme='light'
          storageKey='vite-ui-theme'
        >
          <App />
          <Toaster />
          <SoonerToaster />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
