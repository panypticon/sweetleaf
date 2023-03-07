import type { Dispatch, SetStateAction } from 'react';

import Button from '../button/button';

import leafletLeaves from '../../assets/leaflet-leaves.svg';

const Start = ({ onProgress }: { onProgress: Dispatch<SetStateAction<number>> }) => (
    <div className="DiscoverTasteModal__Start">
        <img src={leafletLeaves} alt="Leaflet" />
        <h4>New to Tea? Feeling Adventurous?</h4>
        <div>
            <p>Answer this short quiz to discover your preferences in the world of tea.</p>
            <p>
                <strong>Once you finish Leaflet can make recommendations tailored to your individual taste.</strong>
            </p>
        </div>
        <Button type="primary" onClick={() => onProgress(1)}>
            Start quiz
        </Button>
    </div>
);

export default Start;
