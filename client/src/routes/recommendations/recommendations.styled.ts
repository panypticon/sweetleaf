import styled from 'styled-components';

import { defaults } from '../../root.styled';

export const StyledRecommendations = styled.article`
    .Recommendations {
        &__section {
            padding: 0 ${defaults.layoutPadding};
            margin: calc(${defaults.layoutPadding} * 3) 0;

            &:first-of-type {
                margin: ${defaults.layoutPadding} 0;
            }
        }

        &__retake {
            margin-top: ${defaults.layoutPadding};
            display: flex;
            gap: calc(${defaults.layoutPadding} / 2);
            align-items: center;
        }
    }
`;

export default StyledRecommendations;
