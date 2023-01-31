import React from 'react';
import ReactDOM from 'react-dom/client';
import { App, ConfigProvider } from 'antd';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

import reportWebVitals from './reportWebVitals';
import Root from './root';
import Home from './routes/home/home';
import Teas from './routes/teas';
import Tea from './routes/tea';
import { colors } from './root.styled';
import { store } from './store/store';
import { ModalProvider } from './context/modalcontext';

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
                    colorPrimary: colors.oolong.standard,
                    colorPrimaryHover: colors.oolong['lighter-2'],
                    colorText: colors.contrast.dark,
                    colorTextBase: colors.contrast.dark,
                    colorTextPlaceholder: colors.contrast['shade-3'],
                    colorError: colors.herbal.standard,
                    colorErrorBorderHover: colors.herbal.standard,
                    controlHeight: 36,
                    fontFamily:
                        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
                    fontSize: 16
                }
            }}
        >
            <ReduxProvider store={store}>
                <ModalProvider>
                    <App>
                        <RouterProvider router={router} />
                    </App>
                </ModalProvider>
            </ReduxProvider>
        </ConfigProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
