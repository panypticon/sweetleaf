import Rate from '../rate/rate';

import type { Rating as RatingType } from '../../types';

import StyledRating from './rating.styled';

const Rating = ({ data: { comment, createdAt, rating, user } }: { data: RatingType }) => (
    <StyledRating className="Rating">
        <div className="Rating__rating">
            <Rate disabled allowHalf defaultValue={rating} />
            <strong>{rating}</strong>
        </div>
        <p className="Rating__meta">
            <span>{new Intl.DateTimeFormat('en-us', { dateStyle: 'medium' }).format(new Date(createdAt))}</span>
            <span>
                {user.address.firstName} {user.address.lastName.at(0)?.toUpperCase()}.
            </span>
        </p>
        <p>{comment || '–'}</p>
    </StyledRating>
);

export default Rating;
