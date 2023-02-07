import type { Product } from '../productlist/productlist';

import StyledProductCard from './productcard.styled';

const ProductCard = ({ data: { name, image } }: { data: Product }): JSX.Element => {
    const { NODE_ENV, REACT_APP_SERVER } = process.env;

    return (
        <StyledProductCard className="ProductCard">
            <div className="ProductCard__header">
                <h4>{name}</h4>
            </div>
            <div className="ProductCard__body">
                <img src={`${NODE_ENV === 'development' ? REACT_APP_SERVER : ''}/${image}`} alt={name} />
            </div>
        </StyledProductCard>
    );
};

export default ProductCard;
