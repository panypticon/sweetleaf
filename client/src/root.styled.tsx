import { createGlobalStyle } from 'styled-components';

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
    }
};

export const defaults = { layoutMaxWidth: '144rem', layoutPadding: '2.4rem' };

const GlobalStyle = createGlobalStyle`
    .ant-layout {
        min-height: 100vh;
        position: relative;

        &-content {
            margin-top: 6rem;
        }
    }
`;

export default GlobalStyle;
