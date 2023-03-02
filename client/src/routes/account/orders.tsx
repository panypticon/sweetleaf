import { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import Button from '../../components/button/button';

import useAuthProtection from '../../hooks/useAuthProtection';
import OrderModal from '../../components/ordermodal/ordermodal';
import { modalContext } from '../../context/modalcontext';

import type { Order, ModalContext } from '../../types';

import { StyledOrders } from './orders.styled';

const OrderItem = ({ data: { createdAt, id, items, totalPrice } }: { data: Order }): JSX.Element => {
    const { setModal } = useContext(modalContext) as ModalContext;

    return (
        <li className="OrderItem" onClick={() => setModal(<OrderModal id={id} />)}>
            <span>
                <strong>{new Intl.DateTimeFormat('en-us', { dateStyle: 'medium' }).format(new Date(createdAt))}</strong>
            </span>
            <span className="OrderItem__description">
                {items.length} item{items.length > 1 && 's'} ({items.at(0)?.product.name}
                {items.length > 1 && ' and others'})
            </span>
            <Button type="primary">Details</Button>
            <span>{`${totalPrice.toFixed(2)} €`}</span>
        </li>
    );
};

const Orders = (): JSX.Element => {
    useAuthProtection();

    const orders = useLoaderData() as [Order];

    return (
        <StyledOrders className="Orders">
            <h1>Your Orders</h1>
            {orders.length > 0 ? (
                <ul className="Orders__list">
                    {orders.map(order => (
                        <OrderItem key={order.id} data={order} />
                    ))}
                </ul>
            ) : (
                <p>
                    <strong>No orders yet</strong>
                </p>
            )}
        </StyledOrders>
    );
};

export default Orders;
