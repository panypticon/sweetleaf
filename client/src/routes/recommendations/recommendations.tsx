import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';

import useAuthProtection from '../../hooks/useAuthProtection';
import Button from '../../components/button/button';
import DiscoverTasteModal from '../../components/discovertastemodal/discovertastemodal';
import { modalContext } from '../../context/modalcontext';

import type { ModalContext } from '../../types';

import StyledRecommendations from './recommendations.styled';

const Recommendations = () => {
    useAuthProtection();

    const { setModal } = useContext(modalContext) as ModalContext;

    const data = useLoaderData();

    console.log(data);

    return (
        <StyledRecommendations className="Recommendations">
            <section className="Recommendations__section Recommendations__section--overview">
                <h1>Your Recommendations</h1>
                <p>
                    These product recommendations are based on the <b>answers you gave in the Leaflet tea quiz.</b>
                </p>
                <p className="Recommendations__retake">
                    You have evolved as a human being?
                    <Button type="primary" onClick={() => setModal(<DiscoverTasteModal />)}>
                        Retake the quiz
                    </Button>
                </p>
            </section>
            <section className="Recommendations__section">RECS</section>
        </StyledRecommendations>
    );
};

export default Recommendations;