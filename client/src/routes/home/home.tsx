import Button from '../../components/button/button';
import { StyledHome } from './home.styled';

const Home = (): JSX.Element => (
    <StyledHome className="Home">
        <section className="Home__section hero">
            <div className="hero__box">
                <h1>
                    Perfect Tea
                    <br /> Begins with You
                </h1>
                <p>Answer 12 questions to discover your taste</p>
                <Button type="primary">Get started</Button>
            </div>
        </section>
        <section className="Home__section all-stars">
            <h2>All-Stars</h2>
        </section>
        <section className="Home__section true-colors">
            <h2>True Colors</h2>
        </section>
        <section className="Home__section mybox">
            <h2>MyBox is Your Box</h2>
        </section>
    </StyledHome>
);

export default Home;
