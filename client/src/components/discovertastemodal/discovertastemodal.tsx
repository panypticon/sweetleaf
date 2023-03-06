import { useState } from 'react';

import Button from '../button/button';

import StyledDiscoverTasteModal from './discovertastemodal.styled';
import leafletLeaves from '../../assets/leaflet-leaves.svg';

const quizData = {
    1: {
        question: 'Do you prefer food and drinks plain or flavored?',
        whyweask:
            "There's Coke, and then there's Cherry Coke. There's frozen yogurt, and then there are fifteen toppings. Tea is the same – it can be consumed barebones or with additional flavors.",
        answers: {
            type: 'one',
            data: [
                { label: 'Plain', value: 'plain' },
                { label: 'Flavored', value: 'flavored' }
            ]
        }
    },
    2: {
        question: 'What types of flavor do you like most?',
        whyweask:
            'Tea comes in many forms, and even the one made from tea leaves has very distinct flavors depending on the way it was produced.',
        answers: {
            type: 'many',
            data: [
                { label: 'Citrus', value: 'citrus' },
                { label: 'Floral', value: 'floral' },
                { label: 'Herbal', value: 'herbal' },
                { label: 'Earthy', value: 'earthy' },
                { label: 'Vegetal', value: 'vegetal' }
            ]
        }
    },
    3: {
        question: 'Do you like the buzz of caffeine?',
        whyweask: "Most teas have it, some don't. Some people enjoy it, while some don't.",
        answers: {
            type: 'one',
            data: [
                { label: 'Yes', value: 'caffeine' },
                { label: 'No', value: 'no-caffeine' }
            ]
        }
    },
    4: {
        question: 'What types of tea do you prefer?',
        whyweask: 'You might already have a certain taste for',
        answers: { type: '', data: [{ label: '', value: '' }] }
    },
    5: {
        question: '',
        whyweask: '',
        answers: { type: '', data: [{ label: '', value: '' }] }
    }
};

const Start = () => (
    <div className="DiscoverTasteModal__Start">
        <img src={leafletLeaves} alt="Leaflet" />
        <h4>New to Tea? Feeling Adventurous?</h4>
        <div>
            <p>Answer this short quiz to discover your preferences in the world of tea.</p>
            <p>
                <strong>Once you finish Leaflet can make recommendations tailored to your individual taste.</strong>
            </p>
        </div>
        <Button type="primary">Start quiz</Button>
    </div>
);

const DiscoverTasteModal = () => {
    const [progress, setProgress] = useState(0);

    return (
        <StyledDiscoverTasteModal className="DiscoverTasteModal" title="Discover Your Taste" footer={null}>
            {!progress ? <Start /> : <></>}
        </StyledDiscoverTasteModal>
    );
};

export default DiscoverTasteModal;
