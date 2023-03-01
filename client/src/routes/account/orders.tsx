import { useLoaderData } from 'react-router-dom';

import useAuthProtection from '../../hooks/useAuthProtection';

import type { Order } from '../../types';

import { StyledOrders } from './orders.styled';

const OrderItem = ({ data }: { data: Order }): JSX.Element => {
    console.log(data);
    return (
        <li>
            <span>{new Intl.DateTimeFormat('en-us', { dateStyle: 'medium' }).format(new Date(data.createdAt))}</span>
        </li>
    );
};

const Orders = (): JSX.Element => {
    useAuthProtection();

    const orders = useLoaderData() as [Order];

    console.log(orders);

    return (
        <StyledOrders className="Orders">
            <h1>Your Orders</h1>
            {orders.length > 0 && (
                <ul>
                    {orders.map(order => (
                        <OrderItem key={order.id} data={order} />
                    ))}
                </ul>
            )}
        </StyledOrders>
    );
};

export default Orders;
