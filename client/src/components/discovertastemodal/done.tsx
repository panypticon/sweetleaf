import { useState, useEffect } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectGlobalData, updateUser } from '../../store/slices/globalData';

import Button from '../button/button';

import type { QuizFormItemData } from './discovertastemodal';

const Done = ({ data }: { data: QuizFormItemData }) => {
    const [error, setError] = useState(false);

    const dispatch = useAppDispatch();

    const { user } = useAppSelector(selectGlobalData);

    const navigate = useNavigate();

    const id = user?.id || '';

    useEffect(() => {
        dispatch(updateUser({ id, preferences: data })).then(
            result => result.type.includes('rejected') && setError(true)
        );
    }, [data, dispatch, id]);

    return (
        <div className="DiscoverTasteModal__Done">
            {!error ? (
                <>
                    <h4>Done!</h4>
                    <CheckCircleOutlined />
                    <p>Feels like we know you better already. Have a look at what you might enjoy the most.</p>
                    <Button type="primary" onClick={() => navigate(`/account/${id}/recommendations`)}>
                        Show recommendations
                    </Button>
                </>
            ) : (
                <>
                    <h4>Oops!</h4>
                    <p>We couldn't save your preferences. Please try again later.</p>
                </>
            )}
        </div>
    );
};

export default Done;
