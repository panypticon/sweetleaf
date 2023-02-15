import { useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import capitalize from 'lodash/capitalize';
import { Link } from 'react-router-dom';

import PackageSelector from '../../components/packageselector/packageselector';
import Table from '../../components/table/table';
import { useAppDispatch } from '../../store/hooks';
import { addToCart } from '../../store/slices/appState';
import RatingList from '../../components/ratinglist/ratinglist';

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
    const item = useLoaderData() as Product;

    const { id, type, category, name, image, description, inventory, attributes, ratings } = item;

    const tableData = useMemo(
        () =>
            Object.entries(attributes).map(([key, value], i) => ({
                key: String(i + 1),
                name: capitalize(key),
                value: stringifyAttribute(key, value)
            })),
        [attributes]
    );

    const dispatch = useAppDispatch();

    const handleAddToCart = (amount: number, packageSize: string) =>
        dispatch(
            addToCart({
                item,
                amount,
                packageSize
            })
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
                        <PackageSelector inventory={inventory} onAddToCart={handleAddToCart} />
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
            <section className="Product__section">
                <h2>Reviews</h2>
                <RatingList stats={ratings} route={`/api/v1/products/${id}/ratings`} />
            </section>
        </StyledProduct>
    );
};

export default ProductPage;