import { createGlobalStyle } from 'styled-components';

export const colors = {
    contrast: {
        dark: '#080f0f',
        light: '#f8faf8',
        'shade-1': '#505453',
        'shade-2': '#696d6c',
        'shade-3': '#848886',
        'shade-4': '#a0a3a1',
        'shade-5': '#bcbfbd',
        'shade-6': '#dadcda'
    }
};

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
