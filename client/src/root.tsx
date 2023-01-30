import { useContext, useEffect } from 'react';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import { modalContext } from './context/modalcontext';

import GlobalStyle from './root.styled';

const Root = (): JSX.Element => {
    const modalData = useContext(modalContext);
    const setModal = modalData?.setModal;

    const location = useLocation();

    useEffect(() => {
        setModal && setModal(null);
    }, [location, setModal]);

    return (
        <>
            <GlobalStyle />
            <Layout className="Root" hasSider={false}>
                <Header />
                <Layout.Content>
                    <Outlet />
                </Layout.Content>
                <Footer />
            </Layout>
            {modalData?.modal && modalData.modal}
        </>
    );
};

export default Root;
