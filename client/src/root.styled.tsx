import { createGlobalStyle } from 'styled-components';
import { rgba } from 'polished';

export const colors = {
    contrast: {
        dark: '#080f0f',
        'shade-1': '#505453',
        'shade-2': '#696d6c',
        'shade-3': '#848886',
        'shade-4': '#a0a3a1',
        'shade-5': '#bcbfbd',
        'shade-6': '#dadcda',
        light: '#f8faf8'
    },
    fermented: {
        'darker-1': '#764a4e',
        'darker-2': '#613d40',
        'darker-3': '#4c3033',
        'darker-4': '#382325',
        standard: '#8b575c',
        'lighter-1': '#9c7074',
        'lighter-2': '#ae898d',
        'lighter-3': '#bfa3a5',
        'lighter-4': '#d1bcbe'
    },
    oolong: {
        'darker-1': '#d5a024',
        'darker-2': '#af841d',
        'darker-3': '#8a6717',
        'darker-4': '#644b11',
        standard: '#fabc2a',
        'lighter-1': '#fbc64a',
        'lighter-2': '#fcd06a',
        'lighter-3': '#fcda8a',
        'lighter-4': '#fde4aa'
    },
    steamed: {
        'darker-1': '#487b6c',
        'darker-2': '#3b6659',
        'darker-3': '#2f5046',
        'darker-4': '#223a33',
        standard: '#55917f',
        'lighter-1': '#6fa292',
        'lighter-2': '#88b2a5',
        'lighter-3': '#a2c3b9',
        'lighter-4': '#bbd3cc'
    },
    herbal: {
        'darker-1': '#b80e4c',
        'darker-2': '#970c3e',
        'darker-3': '#770931',
        'darker-4': '#560724',
        standard: '#d81159',
        'lighter-1': '#de3572',
        'lighter-2': '#e4588b',
        'lighter-3': '#ea7ca4',
        'lighter-4': '#efa0bd'
    }
};

export const defaults = { layoutMaxWidth: '144rem', layoutPadding: '2.4rem', radiusDefault: '0.8rem' };

export const breakpoints = {
    xs: '30em', // '480px'
    sm: '36em', // '576px'
    md: '48em', // '768px'
    lg: '62em', // '992px'
    xl: '75em', // '1200px'
    xxl: '100em' // '1600px'
};

const GlobalStyle = createGlobalStyle`
    h1, h2, h3, h4, h5, h6 {
        font-weight: 900;
        color: ${colors.steamed.standard}
    }

    h1 {
        font-size: 4rem;
        line-height: 1.2;
        margin-bottom: ${defaults.layoutPadding}
    }

    h2 {
        font-size: 3.2rem;
    }

    h3 {
        font-size: 2.8rem;
    }

    h5 {
        font-size: 1.8rem;
    }

    .modal-lock {
        overflow: hidden;
    }

    .ant-layout {
        min-height: 100vh;
        position: relative;

        &-content {
            margin: 6rem auto 0 auto;
            max-width: ${defaults.layoutMaxWidth};
            width: 100%;
        }
    }

    .ant-modal-root {
        position: fixed;
        top: 6rem;

        .ant-modal-mask {
            background-color: ${rgba(colors.contrast.light, 0.4)};
            backdrop-filter: blur(2.5rem);
        }
    }

    .ant-form {
        .ant-form-item {
            &-label {
                padding-left: 0.8rem;

                > label {
                    font-size: 1.4rem;
                    font-weight: 600;
                    color: ${colors.contrast['shade-3']};
                }
            }

            &-explain,
            &-extra {
                font-size: 1.4rem;
                padding: 0.8rem 0 2.4rem 0.8rem;
            }

            &-has-error {
                
                input {
                    caret-color: ${colors.herbal.standard};
                }
            }

            &-control {
                > div[style]:not(:last-child) {
                    .ant-form-item-explain {
                        padding-bottom: 0;
                    }
                }
            }
        }
    }

    .ant-input {
        &,
        &-affix-wrapper {
            border-color: ${colors.contrast['shade-6']};
            padding-left: 1.2rem;
            caret-color: ${colors.steamed.standard};

            &&:hover {
                border-color: ${colors.steamed['lighter-3']};
            }

            &:focus {
                &,
                &:hover {
                    border-color: ${colors.steamed.standard};
                }
            }

            &-affix-wrapper-focused {
                &,
                &&:hover {
                    border-color: ${colors.steamed.standard};
                }
            }
        }

        &::-webkit-search-cancel-button,
        input::-webkit-search-cancel-button {
            -webkit-appearance: none;
            display: none;
        }
    }

    .ant-message {
        top: auto !important;
        bottom: ${defaults.layoutPadding};
    }
`;

export default GlobalStyle;
