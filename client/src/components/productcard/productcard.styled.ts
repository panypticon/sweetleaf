import { rgba } from 'polished';

import { colors, defaults } from '../../root.styled';

import styled from 'styled-components';

const StyledProductCard = styled.li`
    list-style: none;
    background-color: ${colors.contrast.light};
    box-shadow: 0 0 1.2rem ${rgba(colors.contrast.dark, 0.1)};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    position: relative;

    &:hover {
        box-shadow: 0 0 2.4rem ${rgba(colors.contrast.dark, 0.2)};
        transition: box-shadow 0.15s ease-in;

        .ProductCard__overlay {
            display: flex;
            flex-direction: column;
            gap: 2.4rem;
        }
    }

    img {
        width: 100%;
        mix-blend-mode: multiply;
    }

    .ProductCard {
        &__header {
            padding: ${defaults.layoutPadding};

            &-attributes {
                font-size: 1.4rem;
                color: ${colors.contrast['shade-3']};
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                align-items: center;
                gap: 0.4rem 1.2rem;

                &-attribute {
                    display: flex;
                    gap: 0.4rem;
                    align-items: center;
                }
            }

            &-category {
                &-color {
                    display: inline-block;
                    width: 1.4rem;
                    height: 1.4rem;
                    box-shadow: 0 0 0.4rem ${rgba(colors.contrast.dark, 0.2)};
                    border-radius: 50%;
                    transform: translateY(0.1rem);

                    &__green {
                        background-color: ${colors.steamed.standard};
                    }

                    &__white {
                        background-color: ${colors.contrast.light};
                    }

                    &__black {
                        background-color: ${colors.fermented.standard};
                    }

                    &__oolong {
                        background-color: ${colors.oolong.standard};
                    }

                    &__herbal {
                        background-color: ${colors.herbal.standard};
                    }
                }
            }

            &-taste {
                flex-basis: 100%;
            }

            h4 {
                color: ${colors.contrast.dark};
                line-height: 1.3;
                margin-bottom: calc(${defaults.layoutPadding} / 2);
            }
        }

        &__badge {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            font-size: 1.2rem;
            font-weight: 600;
            position: absolute;
            top: 0;
            right: 0;
        }

        &__overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            display: none;
            padding: ${defaults.layoutPadding};
            background-color: ${rgba(colors.contrast.light, 0.6)};
            backdrop-filter: blur(2.5rem);
            min-height: 40%;

            ul {
                list-style: none;

                li {
                    display: flex;
                    justify-content: space-between;
                    font-weight: 600;
                }
            }
        }
    }
`;

export default StyledProductCard;
