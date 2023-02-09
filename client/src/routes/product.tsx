import { useParams } from 'react-router-dom';
import { useRequest } from 'ahooks';

import { getJSONData } from '../api/fetch';

const Product = (): JSX.Element => {
    const { type, id } = useParams();
    const { loading, data, error } = useRequest(() => getJSONData(`/api/v1/products/${id}`));

    console.log({ loading, data, error });

    return (
        <article className="Product">
            Product {type} {id}
        </article>
    );
};

export default Product;
