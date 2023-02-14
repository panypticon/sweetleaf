import { useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import capitalize from 'lodash/capitalize';
import { Link } from 'react-router-dom';

import PackageSelector from '../../components/packageselector/packageselector';
import Table from '../../components/table/table';

import type { Product } from '../../types';

import { StyledProduct } from './product.styled';

const stringifyAttribute = (key: string, value: any) => {
    switch (key) {
        case 'origin':
            return capitalize(value);
        case 'flavored':
            return value ? 'yes' : 'no';
        case 'taste':
            return value.join(', ');
        default:
            return value;
    }
};

const tableColumns = [
    { key: 'name', title: 'name', dataIndex: 'name' },
    { key: 'value', title: 'value', dataIndex: 'value' }
];

const ProductPage = (): JSX.Element => {
    const { type, category, name, image, description, id, inventory, attributes } = useLoaderData() as Product;

    const tableData = useMemo(
        () =>
            Object.entries(attributes).map(([key, value], i) => ({
                key: String(i + 1),
                name: capitalize(key),
                value: stringifyAttribute(key, value)
            })),
        [attributes]
    );
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
                        <div className="Product__stats">
                            <Table
                                columns={tableColumns}
                                dataSource={tableData}
                                pagination={false}
                                showHeader={false}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </StyledProduct>
    );
};

export default ProductPage;
