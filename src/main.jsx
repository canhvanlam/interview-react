import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//import './index.css'
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './redux/store';
import axios from 'axios';
import {setupAxios} from './utils/utils';
import {ToastContainer} from 'react-toastify';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchInterval: false,
      refetchOnReconnect: false,
      retry: false,
      cacheTime: 0,
    },
  },
});
setupAxios(axios, store, import.meta.env.VITE_APP_API_URL);
ReactDOM.createRoot(document.getElementById('app')).render(
  <BrowserRouter>
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ToastContainer autoClose={2000} position="top-right" pauseOnFocusLoss={false} />
      <App />
    </Provider>
  </QueryClientProvider>
  </BrowserRouter>
)
