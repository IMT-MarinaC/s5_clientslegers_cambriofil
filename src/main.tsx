import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import App from './App';
import './styles/global.css';

//10min
const DELAY = 1000 * 60 * 10;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { staleTime: DELAY, retry: 1, refetchOnWindowFocus: false },
    },
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter basename={import.meta.env.BASE_URL}>
                <App />
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>,
);