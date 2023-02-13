import { useLoaderData } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import capitalize from 'lodash/capitalize';
import { Link } from 'react-router-dom';

import type { Product } from '../../types';

import { StyledProduct } from './product.styled';

const ProductPage = (): JSX.Element => {
    const data = useLoaderData() as Product;
    console.log(data);

    return (
        <StyledProduct className="Product">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to={`/${data.type}`}>{capitalize(data.type)}</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to={`/${data.type}/${data.category}`}>{capitalize(data.category)}</Link>
                </Breadcrumb.Item>
            </Breadcrumb>
            Product {data.type} {data.id}
        </StyledProduct>
    );
};

export default ProductPage;
