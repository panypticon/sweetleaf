import { useLoaderData, useLocation } from 'react-router-dom';
import startCase from 'lodash/startCase';

import ProductGrid from '../../components/productgrid/productgrid';

import type { Product } from '../../types';

import StyledProducts from './products.styled';

const Products = () => {
    const data = useLoaderData() as Product[];
    const { pathname } = useLocation();
    const heading = pathname
        .slice(1)
        .split('/')
        .map(word => startCase(word))
        .join(' / ');

    return (
        <StyledProducts className="Products">
            <section className="Products__section">
                <h1>{heading}</h1>
            </section>
            <section className="Products__section">
                <ProductGrid data={data} />
            </section>
        </StyledProducts>
    );
};

export default Products;
