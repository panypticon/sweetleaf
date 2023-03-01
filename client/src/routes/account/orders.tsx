import { useLoaderData } from 'react-router-dom';

import useAuthProtection from '../../hooks/useAuthProtection';

import { StyledOrders } from './orders.styled';

const Orders = (): JSX.Element => {
    useAuthProtection();

    const orders = useLoaderData();
    console.log(orders);

    return <StyledOrders className="Orders">Orders</StyledOrders>;
};

export default Orders;
