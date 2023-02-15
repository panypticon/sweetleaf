import styled from 'styled-components';

import { defaults, colors } from '../../root.styled';

const StyledRating = styled.li`
    display: flex;
    flex-direction: column;
    gap: calc(${defaults.layoutPadding} / 2);
    border-bottom: 0.1rem solid ${colors.contrast['shade-6']};
    padding-bottom: ${defaults.layoutPadding};

    .Rating {
        &__rating {
            display: flex;
            gap: ${defaults.layoutPadding};
            align-items: center;
        }

        &__meta {
            font-weight: 600;
            font-size: 1.4rem;
            display: flex;
            gap: ${defaults.layoutPadding};
            align-items: center;
        }
    }
`;

export default StyledRating;
