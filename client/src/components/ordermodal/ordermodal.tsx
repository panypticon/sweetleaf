import { useState } from 'react';
import { useRequest } from 'ahooks';
import { ExclamationOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { getJSONData } from '../../api/fetch';
import Button from '../button/button';
import Spin from '../spin/spin';

import type { OrderItem as OrderItemType } from '../../types';

import StyledOrderModal from './ordermodal.styled';

const OrderItem = ({
    data: {
        amount,
        size,
        product: { name },
        price
    }
}: {
    data: OrderItemType;
}) => (
    <li className="OrderItem">
        <h6>{name}</h6>
        <span className="OrderItem__amount-size">
            {amount} x {size}
        </span>
        <span className="OrderItem__price">{`${price.toFixed(2)} €`}</span>
    </li>
);

const OrderModal = ({ id }: { id: string }): JSX.Element => {
    const { loading, error, data } = useRequest(() => getJSONData(`/api/v1/orders/${id}`));

    const [isDeleteError, setIsDeleteError] = useState(false);

    const navigate = useNavigate();

    const handleConfirm = async () => {
        const confirmed = window.confirm('Are you sure you want to cancel this order?');
        if (confirmed) {
            try {
                const res = await fetch(`/api/v1/orders/${id}`, { method: 'DELETE' });
                if (res.ok) navigate(window.location.pathname);
                else throw new Error();
            } catch (err) {
                setIsDeleteError(true);
            }
        }
    };

    return (
        <StyledOrderModal
            className="OrderModal"
            title={
                data
                    ? new Intl.DateTimeFormat('en-us', { dateStyle: 'medium' }).format(new Date(data.createdAt))
                    : 'Order'
            }
            footer={
                data ? (
                    <div className="OrderModal__footer">
                        {isDeleteError && (
                            <span>
                                <ExclamationOutlined />
                                Couldn't cancel order – try again later
                            </span>
                        )}
                        <Button onClick={handleConfirm}>Cancel order</Button>
                    </div>
                ) : null
            }
        >
            {loading ? (
                <div className="OrderModal--loading">
                    <Spin />
                </div>
            ) : data ? (
                <>
                    <h5>#{data.id}</h5>
                    <ul>
                        {data.items.map((item: OrderItemType, i: number) => (
                            <OrderItem key={i} data={item} />
                        ))}
                    </ul>
                    <div className="OrderModal__total">
                        <span>Total</span>
                        <span>{`${data.totalPrice.toFixed(2)} €`}</span>
                    </div>
                    <div className="OrderModal__shippingaddress">
                        {`Ship to: ${data.shippingAddress.firstName} ${data.shippingAddress.lastName}, ${data.shippingAddress.street}, ${data.shippingAddress.city} ${data.shippingAddress.zip}`}
                    </div>
                </>
            ) : (
                error && (
                    <div className="OrderModal--error">
                        <strong>:/&nbsp;</strong>Couldn't load order – please try again later
                    </div>
                )
            )}
        </StyledOrderModal>
    );
};

export default OrderModal;
