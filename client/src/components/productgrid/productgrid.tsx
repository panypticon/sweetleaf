import ProductCard from '../productcard/productcard';

import type { Product } from '../../types';

import StyledProductGrid from './productgrid.styled';

const ProductGrid = ({ data }: { data: Product[] }): JSX.Element => (
    <StyledProductGrid>
        {data.map(product => (
            <ProductCard data={product} key={product.id} />
        ))}
    </StyledProductGrid>
);

export default ProductGrid;
