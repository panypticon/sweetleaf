import { CompassFilled, StarFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { colors } from '../../root.styled';
import Button from '../button/button';
import Tag from '../tag/tag';

import type { Product } from '../../types';

import StyledProductCard from './productcard.styled';

const badgeDetails = {
    new: { label: 'New', color: colors.steamed.standard },
    hot: { label: 'Hot', color: colors.herbal.standard },
    fave: { label: 'Fave', color: colors.fermented.standard }
};

const ProductCard = ({
    data: { id, type, name, image, new: isNew, category, attributes, ratings, inventory, recentPurchases }
}: {
    data: Product;
}): JSX.Element => {
    const navigate = useNavigate();

    const { NODE_ENV, REACT_APP_SERVER } = process.env;

    // Add match check once implemented
    const badgeType = ratings.average >= 4.5 ? 'fave' : recentPurchases >= 25 ? 'hot' : isNew ? 'new' : null;

    return (
        <StyledProductCard className="ProductCard" onClick={() => navigate(`/${type}/id/${id}`)}>
            <div className="ProductCard__header">
                <div className="ProductCard__header-heading">
                    <h4>{name}</h4>
                    {badgeType && (
                        <Tag className="ProductCard__badge" color={badgeDetails[badgeType].color}>
                            {badgeDetails[badgeType].label}
                        </Tag>
                    )}
                </div>
                <div className="ProductCard__header-attributes">
                    <span className="ProductCard__header-attributes-attribute ProductCard__header-category">
                        <span
                            className={`ProductCard__header-category-color ProductCard__header-category-color__${category}`}
                        ></span>
                        {category}
                    </span>
                    <span className="ProductCard__header-attributes-attribute ProductCard__header-rating">
                        <StarFilled style={{ color: colors.oolong.standard }} />
                        {ratings.average || '–'} ({ratings.count})
                    </span>
                    <span className="ProductCard__header-attributes-attribute ProductCard__header-taste">
                        <CompassFilled style={{ color: colors.contrast['shade-5'] }} />
                        {attributes?.taste && attributes?.taste.join(', ')}
                    </span>
                </div>
            </div>
            <div className="ProductCard__body">
                <img src={`${NODE_ENV === 'development' ? REACT_APP_SERVER : ''}/${image}`} alt={name} />
                <div className="ProductCard__overlay">
                    <Button type="primary" wide>
                        Details
                    </Button>
                    <ul className="ProductCard__packagesizes">
                        {inventory.map(({ size, price }, i) => (
                            <li key={i}>
                                <span>{size}</span>
                                <span>{price.toFixed(2)} €</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </StyledProductCard>
    );
};

export default ProductCard;
