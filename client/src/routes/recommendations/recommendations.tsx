import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';

import useAuthProtection from '../../hooks/useAuthProtection';
import Button from '../../components/button/button';
import DiscoverTasteModal from '../../components/discovertastemodal/discovertastemodal';
import { modalContext } from '../../context/modalcontext';
import ProductGrid from '../../components/productgrid/productgrid';

import type { ModalContext, Product } from '../../types';

import StyledRecommendations from './recommendations.styled';

const Recommendations = () => {
    useAuthProtection();

    const { setModal } = useContext(modalContext) as ModalContext;

    const data = useLoaderData() as Product[];

    return (
        <StyledRecommendations className="Recommendations">
            <section className="Recommendations__section Recommendations__section--overview">
                <h1>Tea Just for You</h1>
                <p>
                    Product recommendations are based on the <b>answers you gave in the Leaflet tea quiz.</b>
                </p>
                <p className="Recommendations__retake">
                    You have evolved as a human being?
                    <Button type="primary" onClick={() => setModal(<DiscoverTasteModal />)}>
                        Retake the quiz
                    </Button>
                </p>
            </section>
            <section className="Recommendations__section">
                <ProductGrid data={data} />
            </section>
        </StyledRecommendations>
    );
};

export default Recommendations;
