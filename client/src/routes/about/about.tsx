import StyledAbout from './about.styled';

const About = (): JSX.Element => (
    <StyledAbout className="About">
        <section className="About__section">
            <h1>About This Site</h1>
            <p>
                <b>Ceci n'est pas un tea store.</b> Don't enter your real data, and no, we don't want your money either.
            </p>
            <p>
                Instead, this is a rather large demo prototype written as a full-stack MERN monorepo application. Code
                can be&nbsp;
                <a href="https://github.com/panypticon/sweetleaf" target="_blank" rel="noreferrer">
                    found here
                </a>
                .
            </p>
            <ul>
                <li>
                    The backend is a Node/Express/Mongoose API server that also serves the static frontend files. It
                    does local and Google auth via Passport, and sends emails through SendGrid.
                </li>
                <li>
                    The frontend is a React SPA that uses Redux Toolkit for state management, React Router, customized
                    Ant Design components, and Styled Components for styling.
                </li>
            </ul>
        </section>
    </StyledAbout>
);

export default About;
