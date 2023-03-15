import styled from 'styled-components';
import { rgba } from 'polished';

import { defaults, colors, breakpoints } from '../../root.styled';

export const StyledHome = styled.article`
    .Home {
        &__section {
            padding: calc(${defaults.layoutPadding} * 2) ${defaults.layoutPadding};

            &--true-colors {
                background-color: ${colors.steamed.standard};
                color: ${colors.contrast.light};
                padding-bottom: calc(${defaults.layoutPadding} * 3);

                h2 {
                    color: inherit;
                    margin-bottom: ${defaults.layoutPadding};
                }

                ul {
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    gap: calc(${defaults.layoutPadding} * 2);
                    margin: 0 ${defaults.layoutPadding};
                    align-items: center;

                    @media (max-width: ${breakpoints.lg}) {
                        grid-template-columns: repeat(3, 1fr);
                    }

                    @media (max-width: ${breakpoints.sm}) {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
            }
        }
    }

    .hero {
        background: center / cover no-repeat url('/assets/hero.jpg');
        min-height: 75vh;
        display: flex;
        align-items: flex-end;
        justify-content: right;
        font-size: 1.8rem;
        animation: reveal 0.25s ease-out 0.2s both;

        &--recs {
            background-image: url('/assets/hero_recs.jpg');
        }

        &__box {
            background-color: ${rgba(colors.contrast.light, 0.8)};
            backdrop-filter: blur(5rem);
            box-shadow: 0 0 1.2rem ${rgba(colors.contrast.dark, 0.05)};
            padding: calc(${defaults.layoutPadding} * 2);
            flex: 0 0 calc(38.196601125% - ${defaults.layoutPadding});

            @media (max-width: ${breakpoints.lg}) {
                flex-basis: 50%;
            }

            @media (max-width: ${breakpoints.md}) {
                flex-basis: 61.803398875%;

                .ant-btn {
                    width: 100%;
                }
            }

            @media (max-width: ${breakpoints.sm}) {
                flex-basis: 100%;
            }
        }
        p {
            margin-bottom: ${defaults.layoutPadding};
        }
    }
`;
