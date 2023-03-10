import { useContext, useEffect } from 'react';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import { useRequest } from 'ahooks';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import { modalContext } from './context/modalcontext';
import { getJSONData } from './api/fetch';
import { useAppDispatch } from './store/hooks';
import { setUser } from './store/slices/globalData';
import { setSearchTerm, setMobileSearchState } from './store/slices/appState';

import GlobalStyle from './root.styled';

const Root = (): JSX.Element => {
    const modalData = useContext(modalContext);
    const setModal = modalData?.setModal;

    const location = useLocation();

    const dispatch = useAppDispatch();

    useEffect(() => {
        setModal && setModal(null);
        dispatch(setSearchTerm(''));
        dispatch(setMobileSearchState(false));
    }, [location, setModal, dispatch]);

    // Get user data on mount, if logged in
    const { data, error, runAsync } = useRequest(url => getJSONData(url), { manual: true });

    useEffect(() => {
        const id = document.cookie
            .split('; ')
            .filter(cookie => cookie.startsWith('login='))
            .map(cookie => cookie.slice(6))[0];
        id && runAsync(`/api/v1/users/${id}`);
    }, [runAsync]);

    useEffect(() => {
        if (error) document.cookie = 'login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        else if (data) dispatch(setUser(data));
    }, [error, data, dispatch]);

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
