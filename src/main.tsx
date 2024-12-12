import router from '@/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import Toast from './components/ui/toast';

import Cookies from 'js-cookie';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; // Firebase 설정을 import
import useAuthStore from './store/auth/authstore';
import { useEffect } from 'react';

const queryClient = new QueryClient();
const isDevEnvironment = import.meta.env.DEV;
const rootElement = document.getElementById('root');

const Main = () => {
  const { setIsLogin, setUser } = useAuthStore();

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsLogin(true);
          setUser({
            uid: user.uid,
            email: user.email ?? '',
            displayName: user.displayName ?? '',
          });
        } else {
          console.log('user not found');
        }
      });
    }
  }, [setIsLogin, setUser]);

  return <></>;
};

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <QueryClientProvider client={queryClient}>
      {isDevEnvironment && <ReactQueryDevtools />}
      <RouterProvider router={router} />
      <Toast />
      <Main />
    </QueryClientProvider>
  );
} else {
  console.error('Failed to find the root element.');
}
