import styled from 'styled-components';

import { defaults, colors, breakpoints } from '../../root.styled';

export const StyledAccount = styled.article`
    padding: 0 ${defaults.layoutPadding};
    margin: ${defaults.layoutPadding} 0;

    h1 {
        margin-bottom: calc(${defaults.layoutPadding} * 2);
    }

    h2 {
        color: ${colors.contrast.dark};
        margin-bottom: ${defaults.layoutPadding};
    }

    form {
        max-width: calc(61.80339887% - (${defaults.layoutPadding} / 2));

        @media (max-width: ${breakpoints.lg}) {
            width: 100%;
            max-width: unset;
        }
    }

    .Account {
        &__form-column {
            display: flex;
            gap: ${defaults.layoutPadding};

            > * {
                flex: 1;
            }
        }

        &__status {
            display: flex;
            gap: ${defaults.layoutPadding};
            align-items: center;

            .anticon {
                margin-right: 0.8rem;
            }

            .success {
                .anticon {
                    color: ${colors.steamed.standard};
                }
            }

            .error {
                .anticon {
                    color: ${colors.herbal.standard};
                }
            }
        }

        &__section {
            &:not(:last-of-type) {
                margin-bottom: calc(${defaults.layoutPadding} * 2);
            }

            &--password {
                form div.ant-form-item:not(:first-child) {
                    margin-bottom: 0;
                }
            }
        }
    }
`;
