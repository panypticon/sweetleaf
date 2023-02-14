import { useLoaderData } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import capitalize from 'lodash/capitalize';
import { Link } from 'react-router-dom';

import PackageSelector from '../../components/packageselector/packageselector';

import type { Product } from '../../types';

import { StyledProduct } from './product.styled';

const ProductPage = (): JSX.Element => {
    const { type, category, name, image, description, id, inventory } = useLoaderData() as Product;

    console.log(inventory);

    return (
        <StyledProduct className="Product">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to={`/${type}`}>{capitalize(type)}</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to={`/${type}/${category}`}>{capitalize(category)}</Link>
                </Breadcrumb.Item>
            </Breadcrumb>
            <section className="Product__section">
                <h1>{name}</h1>
                <div className="Product__main">
                    <img src={image} alt="name" />
                    <div className="Product__data">
                        <div>{description}</div>
                        <PackageSelector id={id} inventory={inventory} />
                    </div>
                </div>
            </section>
        </StyledProduct>
    );
};

export default ProductPage;
