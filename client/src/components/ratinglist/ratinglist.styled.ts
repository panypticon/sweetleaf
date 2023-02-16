import { defaults, colors, breakpoints } from '../../root.styled';

import styled from 'styled-components';

const StyledRatingList = styled.section`
    .RatingList {
        &--data {
            display: grid;
            gap: calc(${defaults.layoutPadding} * 2);
            grid-template-columns: 1fr 1.61803398875fr;

            @media (max-width: ${breakpoints.md}) {
                grid-template-columns: 1fr;
            }

            &-stats {
                border: 0.2rem solid ${colors.steamed['lighter-4']};
                padding: ${defaults.layoutPadding};
                align-self: start;

                .ant-rate-star {
                    color: ${colors.steamed.standard};
                }

                h4 {
                    color: ${colors.contrast.dark};
                    margin-bottom: calc(${defaults.layoutPadding} / 2);
                }

                > span {
                    display: flex;
                    gap: ${defaults.layoutPadding};
                    align-items: center;
                    flex-wrap: wrap;
                }
            }

            &-list {
                list-style: none;
                display: flex;
                flex-direction: column;
                gap: ${defaults.layoutPadding};
            }
        }

        &--loading,
        &--error {
            padding: ${defaults.layoutPadding};
            min-height: 50vh;
            display: flex;
        }

        &--loading {
            .Spin {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        &--error {
            align-items: center;
            justify-content: center;

            > div {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: ${defaults.layoutPadding};
            }

            h3 {
                color: ${colors.contrast.dark};
            }
        }
    }
`;

export default StyledRatingList;
