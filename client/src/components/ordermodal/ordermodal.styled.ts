import styled from 'styled-components';

import Modal from '../modal/modal';
import { colors, defaults } from '../../root.styled';

const StyledOrderModal = styled(Modal)`
    h5 {
        color: ${colors.contrast.dark};
        margin-bottom: ${defaults.layoutPadding};
    }

    ul {
        list-style: none;
        display: table;
        width: 100%;
        border-bottom: 0.1rem solid ${colors.contrast['shade-6']};
        padding-bottom: calc(${defaults.layoutPadding} / 2);
        margin-bottom: calc(${defaults.layoutPadding} / 2);
    }

    .OrderModal {
        &__total {
            display: flex;
            justify-content: space-between;
            font-weight: 600;
            margin-bottom: ${defaults.layoutPadding};
        }

        &__shippingaddress {
            margin-bottom: ${defaults.layoutPadding};
        }

        &__footer {
            > span {
                margin-right: ${defaults.layoutPadding};
                font-weight: 600;
            }

            .anticon {
                margin-right: 0.8rem;
                color: ${colors.herbal.standard};
            }
        }

        &--loading,
        &--error {
            min-height: 20rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .OrderItem {
        display: table-row;

        h6 {
            color: ${colors.fermented.standard};
            font-weight: 600;
        }

        > * {
            display: table-cell;
        }

        &__price,
        &__amount-size {
            text-align: right;
        }
    }
`;

export default StyledOrderModal;
