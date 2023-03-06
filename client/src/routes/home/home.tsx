import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { message } from 'antd';

import Button from '../../components/button/button';
import ProductList from '../../components/productlist/productlist';
import { modalContext } from '../../context/modalcontext';
import DiscoverTasteModal from '../../components/discovertastemodal/discovertastemodal';

import type { ModalContext } from '../../types';

import { StyledHome } from './home.styled';

const Home = (): JSX.Element => {
    const location = useLocation();

    const [messageAPI, contextHolder] = message.useMessage();

    const { setModal } = useContext(modalContext) as ModalContext;

    useEffect(() => {
        location.pathname === '/verified' && messageAPI.info('Email address verified, you can now log in', 0);
    }, [location.pathname, messageAPI]);

    return (
        <StyledHome className="Home">
            {contextHolder}
            <section className="Home__section hero">
                <div className="hero__box">
                    <h1>
                        Perfect Tea
                        <br /> Begins with You
                    </h1>
                    <p>Answer 12 questions to discover your taste</p>
                    <Button type="primary" onClick={() => setModal(<DiscoverTasteModal />)}>
                        Get started
                    </Button>
                </div>
            </section>
            <section className="Home__section all-stars">
                <h2>All-Stars</h2>
                <ProductList route="/api/v1/products/allstars" />
            </section>
            <section className="Home__section true-colors">
                <h2>True Colors</h2>
            </section>
        </StyledHome>
    );
};

export default Home;
