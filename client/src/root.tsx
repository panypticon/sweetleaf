import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import Header from './components/header';
import Footer from './components/footer';

import GlobalStyle from './root.styled';

const Root = (): JSX.Element => (
    <>
        <GlobalStyle />
        <Layout className="Root">
            <Header />
            <Layout.Content>
                <Outlet />
            </Layout.Content>
            <Footer />
        </Layout>
    </>
);

export default Root;
