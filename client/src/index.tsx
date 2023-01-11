import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import Root from './root';
import Home from './routes/home';
import Teas from './routes/teas';
import Tea from './routes/tea';
import { colors } from './root.styled';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/tea', element: <Teas /> },
            { path: '/tea/:id', element: <Tea /> }
        ]
    }
]);

root.render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                token: {
                    borderRadius: 8,
                    colorBgBase: colors.contrast.light,
                    colorBgLayout: colors.contrast.light,
                    colorPrimary: '#fabc2a',
                    colorPrimaryHover: '#fbc64a',
                    colorText: colors.contrast.dark,
                    colorTextBase: colors.contrast.dark,
                    controlHeight: 36,
                    fontFamily:
                        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
                    fontSize: 16
                }
            }}
        >
            <RouterProvider router={router} />
        </ConfigProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
