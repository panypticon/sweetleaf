import useAuthProtection from '../../hooks/useAuthProtection';
import Button from '../../components/button/button';

import StyledRecommendations from './recommendations.styled';

const Recommendations = () => {
    useAuthProtection();

    return (
        <StyledRecommendations className="Recommendations">
            <section className="Recommendations__section Recommendations__section--overview">
                <h1>Your Recommendations</h1>
                <p>
                    These product recommendations are based on the answers you gave in the <b>Leaflet tea quiz.</b>
                </p>
                <p className="Recommendations__retake">
                    You have evolved as a human being? <Button type="primary">Retake the quiz</Button>
                </p>
            </section>
            <section className="Recommendations__section">RECS</section>
        </StyledRecommendations>
    );
};

export default Recommendations;
