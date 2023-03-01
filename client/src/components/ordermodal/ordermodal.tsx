import { useRequest } from 'ahooks';

import { getJSONData } from '../../api/fetch';

import StyledOrderModel from './ordermodal.styled';

const OrderModal = ({ id }: { id: string }): JSX.Element => {
    const { data, error, loading } = useRequest(() => getJSONData(`/api/v1/orders/${id}`));

    console.log({ data, error, loading });

    return <StyledOrderModel title="Order">OrderModal</StyledOrderModel>;
};

export default OrderModal;
