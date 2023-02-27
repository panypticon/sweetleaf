// import { useAppSelector } from '../../store/hooks';
// import { selectGlobalData } from '../../store/slices/globalData';
import useAuthProtection from '../../hooks/useAuthProtection';

import { StyledOrders } from './orders.styled';

const Orders = (): JSX.Element => {
    useAuthProtection();

    // const { user } = useAppSelector(selectGlobalData);

    return <StyledOrders className="Orders">Orders</StyledOrders>;
};

export default Orders;
