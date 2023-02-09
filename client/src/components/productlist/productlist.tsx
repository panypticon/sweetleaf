import { useEffect } from 'react';
import { useRequest } from 'ahooks';

import ProductCard from '../productcard/productcard';
import { getJSONData } from '../../api/fetch';
import Spin from '../spin/spin';
import Button from '../button/button';

import type { Product } from '../../types';

import StyledProductList from './productlist.styled';

const ProductList = ({ route }: { route: string }): JSX.Element => {
    const { data, loading, error, run } = useRequest(() => getJSONData(route), {
        pollingInterval: 1800000,
        cacheKey: 'allstars',
        staleTime: 300000,
        throttleWait: 10000,
        manual: true
    });

    useEffect(() => {
        run();
    }, [run]);

    return (
        <StyledProductList className="ProductList" length={data?.length || 0}>
            {loading ? (
                <div className="ProductList--loading">
                    <Spin />
                </div>
            ) : data ? (
                <ul className="ProductList--data">
                    {data.map((product: Product) => (
                        <ProductCard key={product.id} data={product} />
                    ))}
                </ul>
            ) : error ? (
                <div className="ProductList--error">
                    <div>
                        <h3>Oops, something went wrong :/</h3>
                        <Button onClick={() => run()}>Retry loading data</Button>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </StyledProductList>
    );
};

export default ProductList;
