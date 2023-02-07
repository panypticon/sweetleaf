import { useEffect } from 'react';
import { useRequest } from 'ahooks';

import ProductCard from '../productcard/productcard';
import { getJSONData } from '../../api/fetch';

import StyledProductList from './productlist.styled';

export interface PackageSize {
    size: string;
    price: number;
    amount: number;
}

export interface Product {
    id: string;
    name: string;
    type: string;
    category: string;
    attributes: {
        origin?: string;
        taste: string[];
        flavored: boolean;
    };
    inventory: PackageSize[];
    image?: string;
    new: boolean;
    recentPurchases: number;
    ratings: {
        count: number;
        average: number;
    };
}

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
                <>LOADING</>
            ) : data ? (
                <ul className="ProductList__data">
                    {data.map((product: Product) => (
                        <ProductCard key={product.id} data={product} />
                    ))}
                </ul>
            ) : error ? (
                <li>
                    Something went wrong. <button onClick={() => run()}>Retry</button>
                </li>
            ) : (
                <></>
            )}
        </StyledProductList>
    );
};

export default ProductList;
