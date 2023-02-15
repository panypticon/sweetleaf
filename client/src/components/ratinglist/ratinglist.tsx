import { useEffect } from 'react';
import { useRequest } from 'ahooks';

import { getJSONData } from '../../api/fetch';
import Spin from '../spin/spin';
import Button from '../button/button';
import Rate from '../rate/rate';
import Rating from '../rating/rating';

import type { Rating as RatingType } from '../../types';

import StyledRatingList from './ratinglist.styled';

const RatingList = ({ stats, route }: { stats: { count: number; average: number }; route: string }): JSX.Element => {
    const { data, loading, error, runAsync } = useRequest(() => getJSONData(route), {
        pollingInterval: 1800000,
        cacheKey: route,
        staleTime: 300000,
        throttleWait: 10000,
        manual: true
    });

    // Load requests, if required
    useEffect(() => {
        stats.count > 0 && runAsync();
    }, [runAsync, stats.count]);

    return (
        <StyledRatingList className="RatingList">
            {loading ? (
                <div className="RatingList--loading">
                    <Spin />
                </div>
            ) : data ? (
                <div className="RatingList--data">
                    <div className="RatingList--data-stats">
                        <h4>Average Rating</h4>
                        <span>
                            <Rate disabled allowHalf defaultValue={stats.average} />
                            <span>
                                <strong>{stats.average}</strong> ({stats.count} {`review${stats.count > 1 ? 's' : ''}`})
                            </span>
                        </span>
                    </div>
                    <ul className="RatingList--data-list">
                        {data.map((rating: RatingType) => (
                            <Rating key={rating.id} data={rating} />
                        ))}
                    </ul>
                </div>
            ) : error ? (
                <div className="RatingList--error">
                    <div>
                        <h3>Oops, something went wrong :/</h3>
                        <Button onClick={() => runAsync()}>Retry loading data</Button>
                    </div>
                </div>
            ) : (
                <p>No reviews yet</p>
            )}
        </StyledRatingList>
    );
};

export default RatingList;
