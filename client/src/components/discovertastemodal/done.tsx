import { useEffect } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';

import Button from '../button/button';

import type { QuizFormItemData } from './discovertastemodal';

const Done = ({ data }: { data: QuizFormItemData }) => {
    useEffect(() => {
        // PUT quizdata on user route
        // Update local user state with quizdata
    }, [data]);

    return (
        <div className="DiscoverTasteModal__Done">
            <h4>Done!</h4>
            <CheckCircleOutlined />
            <p>Feels like we know you better already. Have a look at what you might enjoy the most.</p>
            <Button type="primary">Show recommendations</Button>
        </div>
    );
};

export default Done;
