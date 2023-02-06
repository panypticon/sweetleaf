import { useParams } from 'react-router-dom';

const Tea = (): JSX.Element => {
    const { id } = useParams();

    return <article className="Tea">Tea {id}</article>;
};

export default Tea;
